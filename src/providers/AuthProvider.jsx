import { useEffect, useState, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isSavingUser = useRef(false);
  const queryClient = useQueryClient();

  // Register user
  const createUser = async (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const signIn = async (email, password) => {
    setLoading(true);
    // Clear all cached data before login
    queryClient.clear();
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const googleSignIn = async () => {
    setLoading(true);
    // Clear all cached data before login
    queryClient.clear();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Logout user
  const logOut = async () => {
    setLoading(true);
    localStorage.removeItem("token");
    // Clear all cached data on logout
    queryClient.clear();
    return signOut(auth);
  };

  // Update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Save user to database (can be called manually)
  const saveUserToDatabase = async (userData) => {
    // Prevent duplicate saves
    if (isSavingUser.current) {
      console.log("User save already in progress, skipping...");
      return;
    }

    isSavingUser.current = true;

    try {
      const response = await api.post("/users/register", userData);

      if (response.data.success) {
        console.log("User saved to database successfully");

        // Invalidate user profile cache to force refresh
        queryClient.invalidateQueries(["userProfile"]);

        // Show welcome message for new users only
        if (response.data.isNewUser) {
          toast.success(`Welcome to ClubSphere, ${userData.name}!`, {
            duration: 4000,
            icon: "🎉",
          });
        }
      }

      return response.data;
    } catch (error) {
      console.error("Error saving user to database:", error);
      // Don't throw error - allow user to continue
      toast.error("Note: User profile may not be fully synced.");
    } finally {
      isSavingUser.current = false;
    }
  };

  // Observer for auth state (handles automatic login syncing)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Get Firebase token
          const token = await currentUser.getIdToken();
          localStorage.setItem("token", token);

          // Only auto-save for Google Sign-in (they have complete profile immediately)
          // For email registration, we'll save manually after profile update
          if (currentUser.displayName) {
            await saveUserToDatabase({
              name: currentUser.displayName,
              email: currentUser.email,
              photoURL:
                currentUser.photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  currentUser.displayName
                )}`,
            });
          }

          setUser(currentUser);
        } catch (error) {
          console.error("Error in auth state change:", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
        localStorage.removeItem("token");
        // Clear cache when user logs out
        queryClient.clear();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [queryClient]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
    saveUserToDatabase,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
