// app/firebase/firestore.js
import { db } from './config';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove 
} from 'firebase/firestore';

// Get user data
export const getUserData = async (userId) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Save user preferences
export const saveUserPreferences = async (userId, preferences) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, { preferences });
};

// Add liked product
export const addLikedProduct = async (userId, product) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    likedProducts: arrayUnion(product)
  });
};

// Remove liked product
export const removeLikedProduct = async (userId, product) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    likedProducts: arrayRemove(product)
  });
};

// Save detailed preferences
export const saveDetailedPreferences = async (userId, detailedPreferences) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    detailedPreferences
  });
};