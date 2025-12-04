// server/server.js
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// 1. Initialize Firebase Admin
// This allows this server to talk to Firebase with full permissions
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = 5000;

// 2. Middleware
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json()); // Allows the server to parse JSON data

// 3. Security Middleware: verifyToken
// This function runs before your protected routes.
// It checks if the user sending the request is actually logged in.
const verifyToken = async (req, res, next) => {
  // Get the token from the "Authorization" header
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = tokenHeader.split(" ")[1]; // Remove "Bearer " prefix

  try {
    // Ask Firebase: "Is this token valid?"
    const decodedToken = await admin.auth().verifyIdToken(token);

    // If yes, save the user info in the request object so we can use it later
    req.user = decodedToken;
    next(); // Proceed to the actual route
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

// ================= ROUTES ================= //

// Test Route (No login required)
app.get("/api/status", (req, res) => {
  res.json({ status: "Server is running perfectly!" });
});

// Protected Route: Get Student Profile (Requires Login)
app.get("/api/student-profile", verifyToken, async (req, res) => {
  // We know who the user is because of verifyToken
  const uid = req.user.uid;
  const email = req.user.email;

  // TODO: In the future, you will fetch this data from Firestore (db)
  // For now, we return dummy data to prove it works
  res.json({
    message: `Hello ${email}, here is your incentive profile.`,
    studentId: uid,
    gamification: {
      points: 1250,
      level: 5,
      badges: ["Fast Learner", "Homework Hero"],
      streak: 7,
    },
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
