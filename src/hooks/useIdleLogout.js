// src/hooks/useIdleLogout.js
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';

const IDLE_TIMEOUT_MINUTES = 30; // set your timeout

export function useIdleLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const idleMs = IDLE_TIMEOUT_MINUTES * 60 * 1000;
    let idleTimeout;

    const resetIdleTimeout = () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(async () => {
        try {
          await signOut(auth); // Firebase logout
        } catch (e) {
          console.error('Auto logout failed', e);
        }
        navigate('/'); // redirect to welcome page
      }, idleMs);
    };

    // Events that count as “activity”
    const events = ['click', 'mousemove', 'keydown', 'touchstart'];
    events.forEach((evt) =>
      window.addEventListener(evt, resetIdleTimeout, true)
    );

    // init on mount
    resetIdleTimeout();

    return () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      events.forEach((evt) =>
        window.removeEventListener(evt, resetIdleTimeout, true)
      );
    };
  }, [navigate]);
}
