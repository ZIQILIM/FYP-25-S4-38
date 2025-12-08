// src/App.js
import React from "react";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";

function App() { 
  return( 
   <BrowserRouter>
    <Routes>
      <Route
        exact
        path="/"
        element={<LoginPage />}
      />
      <Route
        path="/HomePage"
        element={<HomePage />}
      />
      <Route
        path="*"
        element={<Navigate to="/" />}
       />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
