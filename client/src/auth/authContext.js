import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Helper to handle clean exit after deactivation or logout
  const logoutAndRedirect = async () => {
    try {
      await signOut(auth);
      setUser(null);
      window.location.href = "/LoginPage"; // Hard redirect clears all state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  useEffect(() => {
    // Listen for firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // instead of storing token in stat, because it expires every hour, can try store user object
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logoutAndRedirect }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
