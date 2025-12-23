# Quick Setup Reference

## 📋 Checklist (Do This First!)

### Step 1: Gmail Setup (5 minutes)
```
1. Go to myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Go to myaccount.google.com/apppasswords
4. Select Mail + Windows Computer
5. Copy the 16-character password
```

### Step 2: Firebase Environment Variables
In [Firebase Console](https://console.firebase.google.com):
1. Go to Project Settings → Functions
2. Add these variables:
   ```
   GMAIL_USER = your-email@gmail.com
   GMAIL_PASS = xxxx-xxxx-xxxx-xxxx
   ```

### Step 3: Twilio Setup (Optional, for WhatsApp)
```
1. Go to twilio.com and create account
2. Save Account SID and Auth Token
3. Go to Messaging → WhatsApp → Sandbox
4. Save sandbox number (e.g., +1234567890)
```

### Step 4: Firebase Environment Variables (Continued)
Add to Firebase:
```
TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN = xxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER = +1234567890
```

### Step 5: Deploy
```bash
cd c:\Users\mihiru\Desktop\test react app\tmv
firebase deploy --only functions:tmv-notify
```

---

## 🧪 Test It

### Manual Email Test
In Firebase Firestore Console, create document:

**Collection:** `mail`
**Data:**
```json
{
  "to": ["your-email@gmail.com"],
  "message": {
    "subject": "Test Email",
    "text": "If you see this, email works!",
    "html": "<h1>Email Works!</h1>"
  }
}
```

**Check:** Look in your inbox in 10 seconds

### Manual WhatsApp Test
In Firebase Firestore Console, create document:

**Collection:** `whatsapp`
**Data:**
```json
{
  "to": ["+923334567890"],
  "message": "Hello! If you see this message, WhatsApp works!"
}
```

**Check:** Look at your phone in 10 seconds

---

## 🎯 How It Works (Summary)

### When Admin Assigns Task:
```
AssignWork.jsx
    ↓
generateAndDownloadTaskImage() → PNG download
    ↓
handleSubmit()
├── Write to 'works' collection
├── Write to 'mail' → Cloud Function → Gmail → User's Email
└── Write to 'whatsapp' → Cloud Function → Twilio → User's WhatsApp
```

### When Admin Edits Task:
```
TaskDetails.jsx (Same as above but only for newly added users)
```

---

## 📱 User Database Requirements

Each user document must have:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+923334567890",
  "photoURL": "...",
  "fcmTokens": ["push_token_1", "push_token_2"]
}
```

**OR** instead of `phoneNumber`, can use:
```json
{
  "phone": "+923334567890"
}
```

---

## 🔍 Monitor & Debug

### View Cloud Function Logs
```bash
firebase functions:log --only tmv-notify
```

### What to Look For
```
✓ "Email sent" → Success
✗ "Email send failed" → Check Gmail credentials
✓ "WhatsApp sent via Twilio" → Success
✗ "WhatsApp API not configured" → Set Twilio env vars
✗ "Phone validation failed" → Check phone number format
```

---

## 🚨 Troubleshooting Quick Fixes

| Problem | Fix |
|---------|-----|
| "Gmail app password incorrect" | Regenerate from myaccount.google.com/apppasswords |
| "Twilio not configured" | Add TWILIO_* env vars to Firebase |
| "Invalid phone format" | Use +[country code][number], e.g., +923334567890 |
| "WhatsApp message not received" | Check Twilio sandbox is active |
| "Email bouncing" | Verify recipient email is correct |

---

## 📊 System Status

| Component | Status | Test |
|-----------|--------|------|
| PNG Generator | ✅ Deployed | Assign work → download PNG |
| Email Sending | ✅ Deployed | Create 'mail' doc → check inbox |
| WhatsApp Sending | ✅ Deployed | Create 'whatsapp' doc → check phone |
| FCM Push | ✅ Working | Already implemented |
| Task Database | ✅ Working | Existing works collection |
| User Database | ⚠️ Check | Ensure email/phone fields exist |

---

## 💡 Message Examples

### Email (Formatted)
```
Subject: Task Assigned: Film Conference

---

Hello!

You have been assigned to a work:

Title: Film Conference
Date: 2025-12-25
Deadline: 2025-12-24
Description: Record the main conference event with multiple camera angles

Assigned Users:
• John Doe - Camera Operator
• Jane Smith - Audio Technician

Status: Pending

Please review and confirm the work by visiting:
https://tmv.fotmv.online/

If you encounter any issues, feel free to contact me.

Best regards,
Mihiru Dahanayake
Acting Videography Department Head
FOT Media, Rajarata University
070 342 6554
```

### WhatsApp (Plain Text)
```
Hello!

You have been assigned to a work:

Title: Film Conference
Date: 2025-12-25
Deadline: 2025-12-24
Description: Record the main conference event

Status: Pending

Kindly review and confirm by visiting: https://tmv.fotmv.online/

Contact: Mihiru - 070 342 6554
```

---

## 🎓 Complete Messaging Flow

```
User in App
│
├─── Assign Work (AssignWork.jsx)
│    └─── Image downloaded: task-123.png
│    └─── Emails sent via Gmail
│    └─── WhatsApp messages sent via Twilio
│    └─── Push notifications sent via FCM
│
├─── Edit Task (TaskDetails.jsx)
│    └─── Image downloaded: task-123.png
│    └─── Only NEW users get notified
│
└─── Users Receive (Multiple Channels)
     ├─── Email in inbox
     ├─── WhatsApp message on phone
     ├─── Push notification on app
     └─── Can accept/reject from app
```

---

## ✅ Final Verification

Run through this checklist:

```
☐ Gmail 2FA enabled
☐ Gmail app password created
☐ GMAIL_USER and GMAIL_PASS in Firebase env vars
☐ Twilio account created (optional)
☐ Twilio env vars set in Firebase (if using WhatsApp)
☐ firebase deploy --only functions:tmv-notify executed
☐ Manual email test passed
☐ Manual WhatsApp test passed (if Twilio enabled)
☐ All user documents have email and/or phone fields
☐ Cloud Function logs checked for errors
☐ Production app tested with real task assignment
```

---

## 📞 Support Resources

- **Gmail Issues**: [Google Account Help](https://support.google.com/accounts)
- **Twilio Issues**: [Twilio Docs](https://www.twilio.com/docs)
- **Firebase Issues**: [Firebase Docs](https://firebase.google.com/docs)
- **Nodemailer Issues**: [Nodemailer Docs](https://nodemailer.com)

---

**You're all set! Start by completing Step 1-2 above.** 🚀
