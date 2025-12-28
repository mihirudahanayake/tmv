import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, updatePassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../firebase/config';
import Header from '../components/Header';

const storage = getStorage();

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [status, setStatus] = useState('loading');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [passSaving, setPassSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus('no-auth');
        setUserData(null);
        return;
      }

      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const data = {
            id: user.uid,
            ...snap.data(),
            email: user.email || '',
          };
          setUserData(data);
          setOriginalData(data);
        }
        setStatus('ready');
      } catch (e) {
        console.error(e);
        setStatus('error');
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/'); // Redirect to welcome page
  };

  const handleFieldChange = (e) => {
    if (!isEditingProfile) return;
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const startEditProfile = () => {
    setError('');
    setSuccessMsg('');
    setUploadError('');
    setOriginalData(userData);
    setIsEditingProfile(true);
  };

  const cancelEditProfile = () => {
    setError('');
    setSuccessMsg('');
    setUploadError('');
    setUserData(originalData);
    setIsEditingProfile(false);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!userData?.id) return;
    setSaving(true);
    setError('');
    setSuccessMsg('');

    try {
      const userRef = doc(db, 'users', userData.id);
      const { id, userType, createdAt, email, ...editable } = userData;
      await updateDoc(userRef, editable);
      setSuccessMsg('Profile updated successfully.');
      setIsEditingProfile(false);
      setOriginalData(userData);
    } catch (err) {
      console.error(err);
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const startChangePassword = () => {
    setPassError('');
    setPassSuccess('');
    setPasswordForm({ newPassword: '', confirmPassword: '' });
    setIsChangingPassword(true);
  };

  const cancelChangePassword = () => {
    setPassError('');
    setPassSuccess('');
    setPasswordForm({ newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (passwordForm.newPassword.length < 6) {
      setPassError('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPassError('New password and confirm password do not match.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setPassError('You are not logged in.');
      return;
    }

    setPassSaving(true);
    try {
      await updatePassword(user, passwordForm.newPassword);
      setPassSuccess('Password updated successfully.');
      setIsChangingPassword(false);
      setPasswordForm({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      setPassError(err.message || 'Failed to update password.');
    } finally {
      setPassSaving(false);
    }
  };

  // Upload profile image to Firebase Storage and update Firestore
  const handleProfileImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const user = auth.currentUser;
    if (!user) {
      setUploadError('You are not logged in.');
      return;
    }

    setUploadError('');
    setUploadingImage(true);

    try {
      const path = `memberProfileImage/${user.uid}/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, path);

      const snapshot = await uploadBytes(storageRef, file); // upload file [web:62][web:144]
      const downloadURL = await getDownloadURL(snapshot.ref); // get public URL [web:61][web:148]

      // update Firestore user doc
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { photoURL: downloadURL });

      // update local state so avatar changes immediately
      setUserData((prev) => (prev ? { ...prev, photoURL: downloadURL } : prev));
      setSuccessMsg('Profile picture updated.');
    } catch (err) {
      console.error(err);
      setUploadError('Failed to upload profile picture.');
    } finally {
      setUploadingImage(false);
      // reset file input value so same file can be chosen again if needed
      e.target.value = '';
    }
  };

  const userType = userData?.userType === 'admin' ? 'admin' : 'user';

  const inputClass =
    'w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="min-h-screen bg-gray-100">
      <Header userType={userType} />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Profile
          </h1>
          <button
            onClick={handleLogout}
            className="text-xs sm:text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {status === 'loading' && (
          <p className="text-gray-600 text-sm sm:text-base">
            Loading profile...
          </p>
        )}

        {status === 'no-auth' && (
          <p className="text-gray-600 text-sm sm:text-base">
            You are not logged in.
          </p>
        )}

        {status === 'error' && (
          <p className="text-red-600 text-sm sm:text-base">
            Failed to load profile information.
          </p>
        )}

        {status === 'ready' && userData && (
          <>
            {/* Profile picture + basic info */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex items-center gap-4 mb-6">
              <div className="flex-shrink-0">
                {userData.photoURL ? (
                  <img
                    src={userData.photoURL}
                    alt={userData.name || 'Profile'}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #e5e7eb',
                      display: 'block',
                      backgroundColor: '#f3f4f6',
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl font-semibold text-white">
                    {(userData.name || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">
                  {userData.name || 'Unnamed user'}
                </p>
                <p className="text-sm text-gray-600">{userData.email}</p>
                <p className="text-xs text-gray-500 mt-1 capitalize">
                  {userData.userType || 'user'}
                </p>

                {/* Upload button (only visible while editing) */}
                {isEditingProfile && (
                  <div className="mt-3">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Change profile picture
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="text-xs text-stone-500
                        file:mr-3 file:py-1 file:px-3 file:border file:border-gray-300
                        file:text-xs file:font-medium
                        file:bg-stone-50 file:text-stone-700
                        hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
                    />
                    {uploadingImage && (
                      <p className="text-xs text-gray-500 mt-1">
                        Uploading image...
                      </p>
                    )}
                    {uploadError && (
                      <p className="text-xs text-red-600 mt-1">
                        {uploadError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Profile details + Edit toggle */}
            <form
              onSubmit={handleSaveProfile}
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-3 mb-6"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  Profile details
                </h2>
                {!isEditingProfile ? (
                  <button
                    type="button"
                    onClick={startEditProfile}
                    className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditProfile}
                      className="text-sm px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-2 rounded bg-red-100 text-red-700 text-sm">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="p-2 rounded bg-green-100 text-green-700 text-sm">
                  {successMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* existing fields unchanged */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name || ''}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled={!isEditingProfile}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email || ''}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={userData.phoneNo || ''}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled={!isEditingProfile}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Batch
                  </label>
                  <select
                    name="batch"
                    value={userData.batch || '20/21'}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled={!isEditingProfile}
                  >
                    <option value="20/21">20/21</option>
                    <option value="21/22">21/22</option>
                    <option value="22/23">22/23</option>
                    <option value="23/24">23/24</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Study department
                  </label>
                  <select
                    name="studyDepartment"
                    value={userData.studyDepartment || 'ITT'}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled={!isEditingProfile}
                  >
                    <option value="ITT">ITT</option>
                    <option value="EET">EET</option>
                    <option value="MTT">MTT</option>
                    <option value="BPT">BPT</option>
                    <option value="Food">Food</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={userData.gender || 'male'}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled={!isEditingProfile}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Registration number
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={userData.registrationNumber || ''}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled={!isEditingProfile}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Card
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={userData.cardNumber || ''}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled={!isEditingProfile}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Birthday
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={userData.birthday || ''}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled={!isEditingProfile}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Work department
                  </label>
                  <select
                    name="department"
                    value={userData.department || 'videography'}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled={!isEditingProfile}
                  >
                    <option value="videography">Videography</option>
                    <option value="photography">Photography</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    First priority (work)
                  </label>
                  <select
                    name="firstPriority"
                    value={userData.firstPriority || 'videography'}
                    onChange={handleFieldChange}
                    className={inputClass}
                    disabled={!isEditingProfile}
                  >
                    <option value="videography">Videography</option>
                    <option value="photography">Photography</option>
                  </select>
                </div>
              </div>
            </form>

            {/* Change password section (unchanged) */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-3">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  Change password
                </h2>
                {!isChangingPassword ? (
                  <button
                    type="button"
                    onClick={startChangePassword}
                    className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Change
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={cancelChangePassword}
                    className="text-sm px-3 py-1 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {passError && (
                <div className="p-2 rounded bg-red-100 text-red-700 text-sm">
                  {passError}
                </div>
              )}
              {passSuccess && (
                <div className="p-2 rounded bg-green-100 text-green-700 text-sm">
                  {passSuccess}
                </div>
              )}

              {isChangingPassword && (
                <form
                  onSubmit={handlePasswordChange}
                  className="space-y-3 mt-2"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      New password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          newPassword: e.target.value,
                        }))
                      }
                      className={inputClass}
                      minLength={6}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className={inputClass}
                      minLength={6}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={passSaving}
                    className="w-full bg-blue-600 text-white py-2 rounded font-semibold text-sm hover:bg-blue-700 disabled:opacity-50"
                  >
                    {passSaving ? 'Updating...' : 'Update password'}
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
