import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AdminRoute = ({ children }) => {
  const [status, setStatus] = useState('checking'); // checking | allowed | denied

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus('denied');
        return;
      }

      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        const data = snap.exists() ? snap.data() : {};
        if (data.userType === 'admin') {
          setStatus('allowed');
        } else {
          setStatus('denied');
        }
      } catch {
        setStatus('denied');
      }
    });

    return () => unsub();
  }, []);

  if (status === 'checking') {
    return null; // or a small loading spinner
  }

  if (status === 'denied') {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
