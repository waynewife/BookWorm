import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signupWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithEmail, signupWithEmail, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}