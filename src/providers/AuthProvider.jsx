import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register user
  const createUser = async (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const signIn = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const googleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Logout user
  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem('token');
    return signOut(auth);
  };

  // Update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Register user in backend
  const registerUserInBackend = async (userData) => {
    try {
      await api.post('/users/register', userData);
    } catch (error) {
      console.error('Error registering user in backend:', error);
    }
  };

  // Observer for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get Firebase token
        const token = await currentUser.getIdToken();
        localStorage.setItem('token', token);

        // Register/update user in backend
        await registerUserInBackend({
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });

        setUser(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;