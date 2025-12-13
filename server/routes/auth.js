import express from "express";
import User from "../models/User.js";   
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import auth from "../middleware/auth.js";

const router = express.Router();

// Google client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google OAuth (frontend sends credential)
router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ msg: "Missing Google credential" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: "GOOGLE_OAUTH_USER",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ user, token });

  } catch (err) {
    console.error("GOOGLE LOGIN ERROR:", err);
    return res.status(500).json({ msg: "Google authentication failed" });
  }
});

  // Get current logged-in user
  router.get("/me", auth, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) return res.status(404).json({ msg: "User not found" });
      return res.json(user);
    } catch (err) {
      console.error("/me error:", err);
      return res.status(500).json({ msg: "Server error" });
    }
  });

  export default router;
