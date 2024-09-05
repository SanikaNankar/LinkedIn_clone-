import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import app from './index';

const auth = getAuth(app);

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};
