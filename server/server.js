import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅Connected to MongoDB");
    })
    .catch((err) => {
        console.error("❌Error connecting to MongoDB: ", err);
    });

// routes
app.use("/auth", authRoutes);
app.use("blogs", blogRoutes);

// server
const PORT = process.env.port || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


