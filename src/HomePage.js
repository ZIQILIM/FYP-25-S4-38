import React, { useState, useEffect } from "react";
import "./App.css";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { Link, Navigate, useNavigate } from "react-router-dom";

function HomePage(){
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Entering Homepage");
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser || null);
        });
        return () => unsubscribe();
      }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return(
        <div className="page">
      {/* TOP NAVBAR */}
      <header className="nav">
        <div className="nav-left">Website</div>
        <ul className="nav-menu">
          <li>
            Courses
          </li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
        <button className="nav-login-btn">Login / Signup</button>
      </header>

      {/* MAIN CONTENT */}
      <main className="hero">
        {/* LEFT TEXT */}
        <section className="hero-left">
          <h1>Welcome to HomePage</h1>
          <p>
            This is the learning platform where students can log in to access
            personalised content and features.
          </p>

          {user && (
            <p className="logged-in-text">
              You are currently logged in as <strong>{user.email}</strong>.
            </p>
          )}
        </section>

        {/* RIGHT LOGIN BOX */}
        <section className="hero-right">
          {!user ? (
            <div className="login-card">
            </div>
          ) : (
            <div className="login-card">
              <h2 className="login-title">Logged in</h2>
              <p>You are logged in as {user.email}</p>
              <button className="login-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-left">
          <div className="footer-logo">Website</div>
          <p>123 Learning Street, Singapore</p>
        </div>
        <div className="footer-columns">
          <div>
            <h4>About</h4>
            <p>Company</p>
            <p>Team</p>
            <p>Careers</p>
          </div>
          <div>
            <h4>Support</h4>
            <p>Help Center</p>
            <p>Contact</p>
            <p>FAQ</p>
          </div>
          <div>
            <h4>Social</h4>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>LinkedIn</p>
          </div>
        </div>
      </footer>
    </div>
    );
}

export default HomePage;