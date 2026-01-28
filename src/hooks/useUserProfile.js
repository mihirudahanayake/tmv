import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { normalizeRole, getManagedDepartments } from '../utils/authz';

export const useUserProfile = () => {
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user || null);

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        const data = snap.exists() ? { id: user.uid, ...snap.data() } : { id: user.uid };
        const role = normalizeRole(data);
        const managedDepartments = getManagedDepartments(data);
        setProfile({ ...data, role, managedDepartments });
      } catch {
        setProfile({ id: user.uid, role: 'member', managedDepartments: [] });
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return { user: authUser, profile, loading };
};
