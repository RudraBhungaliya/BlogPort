import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

if (!process.env.MONGO_URI) {
  console.error(
    "DEBUG: MONGO_URI is undefined. Listing env keys:",
    Object.keys(process.env).slice(0, 50)
  );
} else {
  console.log(
    "DEBUG: MONGO_URI loaded (length):",
    process.env.MONGO_URI.length
  );
}

if (!process.env.GOOGLE_CLIENT_ID) {
  console.warn(
    "DEBUG: GOOGLE_CLIENT_ID is undefined. Google sign-in will fail if not set."
  );
} else {
  console.log(
    "DEBUG: GOOGLE_CLIENT_ID loaded (length):",
    process.env.GOOGLE_CLIENT_ID.length
  );
}

const vercelRegex = /\.vercel\.app$/;

const allowedOrigins = [
  "http://localhost:5173",
  "https://blogport.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const isAllowedString = allowedOrigins.includes(origin);
      const isVercelUrl = vercelRegex.test(origin);

      if (isAllowedString || isVercelUrl) {
        callback(null, true);
      } else {
        console.warn("CORS blocked request from:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Error:", err));

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
