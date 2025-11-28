import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../utils/db.js";
import userRoute from "./user.route.js";
import companyRoute from "./company.route.js";
import jobRoute from "./job.route.js";
import applicationRoute from "./application.route.js";
import axios from "axios";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup for frontend (adjust as necessary for production)
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

// Other API routes
app.use("/api/v1/user", userRoute); // Example: "http://localhost:4000/api/v1/user/register"
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Start server
app.listen(PORT, () => {
  connectDB(); // Database connection
  console.log(`Server running at port ${PORT}`);
});
