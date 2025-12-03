// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    BrowserRouter,
} from "react-router-dom";

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

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
