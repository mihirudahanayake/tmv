# Email & WhatsApp Messaging Setup Guide

## Current Architecture

Your app now has a complete messaging system:

```
Frontend (AssignWork.jsx / TaskDetails.jsx)
    ↓
Write to Firestore collections:
├── 'mail' (for email)
└── 'whatsapp' (for WhatsApp)
    ↓
Cloud Functions (tmv-notify/index.js)
    ↓
Send via:
├── Gmail (via Nodemailer)
└── Twilio WhatsApp API
```

## Step 1: Configure Gmail (Email)

### 1a. Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication

### 1b. Create App Password
1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Google will generate a 16-character password

### 1c. Set Environment Variables
In Firebase Console → Functions → Runtime Environment Variables:

```
GMAIL_USER = your-email@gmail.com
GMAIL_PASS = xxxxxxxxxxxxxx  (16-char app password)
```

Or in `.env.local`:
```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

## Step 2: Configure WhatsApp (Twilio)

### 2a. Create Twilio Account
1. Go to [Twilio Console](https://www.twilio.com/console)
2. Create a free account
3. Get your Account SID and Auth Token

### 2b. Set Up WhatsApp Sandbox
1. In Twilio Console: Messaging → WhatsApp → Sandbox Settings
2. You'll get a sandbox number (e.g., +1234567890)
3. Save this number for `WHATSAPP_PHONE_NUMBER`

### 2c. Test WhatsApp Number
1. Message the sandbox number from your phone with code: `join <KEYWORD>`
2. Twilio will activate WhatsApp for your number

### 2d. Set Environment Variables
In Firebase Console → Functions → Runtime Environment Variables:

```
TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN = xxxxxxxxxxxxxxxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER = +1234567890  (your Twilio sandbox number)
```

## Step 3: Deploy Functions

```bash
cd "c:\Users\mihiru\Desktop\test react app\tmv"
firebase deploy --only functions:tmv-notify
```

## Step 4: Test the System

### Test Email:
```javascript
// In Firestore Console, manually create:
{
  "to": ["test@gmail.com"],
  "message": {
    "subject": "Test Email",
    "text": "This is a test",
    "html": "<p>This is a <b>test</b></p>"
  }
}
```

### Test WhatsApp:
```javascript
// In Firestore Console, manually create:
{
  "to": ["+923334567890"],  // Your real phone number
  "message": "Hello from WhatsApp API!"
}
```

## Message Formats

### Email Message Object
```javascript
{
  "to": ["user1@email.com", "user2@email.com"],
  "message": {
    "subject": "Task Assigned",
    "text": "Plain text version",
    "html": "<h1>HTML Version</h1>"
  }
}
```

### WhatsApp Message (Plain Text)
```javascript
{
  "to": ["+923334567890", "+923445678901"],
  "message": "Hello!\n\nYou have been assigned to a work:\n\nTitle: Task 1\n..."
}
```

## Your Frontend Code (Already Implemented)

### AssignWork.jsx
```javascript
// When user submits task assignment:
const messageContent = [
  `Hello!`,
  `You have been assigned to a work:`,
  `Title: ${task.title}`,
  // ... more details
];

// Send Email
if (emails.length > 0) {
  await addDoc(collection(db, 'mail'), {
    to: emails,
    message: {
      subject: `Task Assigned: ${task.title}`,
      text: messageContent.join('\n'),
      html: messageContent.join('<br>')
    }
  });
}

// Send WhatsApp
if (phones.length > 0) {
  const whatsappMessage = messageContent.join('\n');
  await addDoc(collection(db, 'whatsapp'), {
    to: phones,
    message: whatsappMessage
  });
}
```

### TaskDetails.jsx
Same pattern when editing/saving tasks.

## Troubleshooting

### Email Not Sending
- ✓ Check Gmail user and app password in environment variables
- ✓ Verify 2FA is enabled on Gmail account
- ✓ Check Cloud Function logs: `firebase functions:log --only tmv-notify`
- ✓ Ensure `to` array contains valid email addresses

### WhatsApp Not Sending
- ✓ Verify Twilio credentials in environment variables
- ✓ Check phone numbers are in international format (+country code)
- ✓ Ensure Twilio WhatsApp is activated for your account
- ✓ Check Cloud Function logs for Twilio errors
- ✓ Verify phone number opted into WhatsApp sandbox

### Monitor Logs
```bash
firebase functions:log --only tmv-notify
```

This shows real-time errors and status updates.

## Database Fields Required

### users collection
Each user document must have:
```javascript
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+923334567890",  // OR "phone" field
  "photoURL": "...",
  // ... other fields
}
```

Phone number format: `+[country code][area code][number]`

Example:
- Pakistan: `+923334567890`
- USA: `+12125551234`
- UK: `+441632960001`

## Email vs WhatsApp Comparison

| Feature | Email | WhatsApp |
|---------|-------|----------|
| Cost | Free (Gmail) | $0.05-0.10 per message (Twilio) |
| Setup | 5 minutes | 15 minutes |
| Delivery | Usually instant | Usually instant |
| Character Limit | Unlimited | 1600 chars per message |
| Formatting | HTML supported | Plain text only |
| Attachments | Yes (with nodemailer) | Yes (future enhancement) |
| Sandbox | None | Yes (required for testing) |

## Next Steps (Optional Enhancements)

1. **WhatsApp Media**: Send PNG images directly via WhatsApp
   ```javascript
   // Instead of just text message, send image URL
   await transporter.sendImage(phone, imageUrl);
   ```

2. **Message Templates**: Create reusable templates
   ```javascript
   const taskTemplate = (task) => ({
     subject: `Task: ${task.title}`,
     text: `Your task has been assigned...`,
     html: `<h1>${task.title}</h1>...`
   });
   ```

3. **User Preferences**: Store in database which channels user prefers
   ```javascript
   // In user doc
   {
     "notificationPreferences": {
       "email": true,
       "whatsapp": true,
       "push": true
     }
   }
   ```

4. **Delivery Status Tracking**: Update UI with delivery status
   ```javascript
   // After sending, read from Firestore
   const docSnap = await getDoc(doc(db, 'mail', docId));
   console.log(docSnap.data().status); // 'sent' or 'failed'
   ```

## Support

For issues:
1. Check Cloud Function logs
2. Verify environment variables are set
3. Test with manual Firestore document creation
4. Check email/WhatsApp provider dashboards
