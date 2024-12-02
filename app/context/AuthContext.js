// app/context/AuthContext.js
'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser({ ...user, preferences: docSnap.data().preferences });
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        likedProducts: [],
        preferences: null,
        createdAt: new Date().toISOString()
      });
      return userCredential;
    } catch (error) {
      console.error('Signup error:', error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error.message);
      throw error;
    }
  };

  const updateUserPreferences = async (preferences) => {
    if (user) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          preferences
        }, { merge: true });
        setUser(prev => ({ ...prev, preferences }));
      } catch (error) {
        console.error('Update preferences error:', error.message);
        throw error;
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      signup, 
      login, 
      logout,
      updateUserPreferences,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);