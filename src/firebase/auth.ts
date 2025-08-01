import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

export interface UserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'citizen' | 'municipality';
  organization?: string;
  phone?: string;
  createdAt: Date;
}

// Sign up with email and password
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  userData: Omit<UserData, 'uid' | 'createdAt'>
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Update user profile
  await updateProfile(userCredential.user, {
    displayName: `${userData.firstName} ${userData.lastName}`
  });

  // Save additional user data to Firestore
  const userDoc = {
    ...userData,
    uid: userCredential.user.uid,
    createdAt: new Date()
  };

  // Remove undefined fields
  Object.keys(userDoc).forEach(
    (key) => (userDoc as Record<string, unknown>)[key] === undefined && delete (userDoc as Record<string, unknown>)[key]
  );

  await setDoc(doc(db, 'users', userCredential.user.uid), userDoc);

  return userCredential;
};

// Sign in with email and password
export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  await signOut(auth);
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

// Get user data from Firestore
export const getUserData = async (uid: string): Promise<UserData | null> => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return userDoc.data() as UserData;
  }
  return null;
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
}; 