import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import taskRoute from "./routes/task.routes.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

dotenv.config();

const DB_URI = process.env.MONGODB_URI;

// Database connection
try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.error(error);
}

// Routes
app.use("/task", taskRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.send("Welcome to the Task Management API!");
});

export default app;