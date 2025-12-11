import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
// Listen for firebase auth state changes
const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
if (firebaseUser) {
// Optionally fetch ID token here for immediate API calls
const token = await firebaseUser.getIdToken();
setUser({ uid: firebaseUser.uid, email: firebaseUser.email, token });
} else {
setUser(null);
}
setLoading(false);
});


return () => unsubscribe();
}, []);


return (
<AuthContext.Provider value={{ user, setUser, loading }}>
{children}
</AuthContext.Provider>
);
};