import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"; // Database connection utility
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import recommendationRoute from "./routes/recommendation.route.js";
import candidateRoutes from "./routes/candidateRoutes.js"; // Import candidate routes

import axios from "axios";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup for frontend (adjust as necessary for production)
const corsOptions = {
  origin: process.env.FRONTEND_URL, //http://localhost:5173" /* "https://internnova-inky.vercel.app/", */, // Frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

// Recommendation API Route (candidate recommendations)
app.post(
  "/api/v1/recommendations/candidate-recommendations",
  async (req, res) => {
    try {
      const { jobId, country, education, gender, age } = req.body;

      // Log the request body for debugging
      console.log("Received request body:", req.body);

      // Validation
      if (!jobId || !country || !education || !gender || !age) {
        return res.status(400).json({
          success: false,
          message:
            "Missing required fields: jobId, country, education, gender, age",
        });
      }

      // Call the third-party ML API for recommendations
      const response = await axios.post(
        "https://internova-api.onrender.com/match_candidates", // External ML API URL
        {
          job_id: jobId,
          Country: country,
          Education: education,
          Gender: gender,
          age: age,
        }
      );

      // Return the response from the ML API
      res.status(200).json({
        success: true,
        recommendations: response.data,
      });
    } catch (error) {
      console.error(
        "Error in candidate recommendations:",
        error.message,
        error.stack
      );

      res.status(500).json({
        success: false,
        message: "Error fetching candidate recommendations",
        error: error.message,
        details: error.response?.data || "No further details",
      });
    }
  }
);

// Other API routes
app.use("/api/v1/user", userRoute); // Example: "http://localhost:4000/api/v1/user/register"
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/recommendations", recommendationRoute); // Uncomment if necessary
app.use("/api/v1/candidates", candidateRoutes);

// Start server
app.listen(PORT, () => {
  connectDB(); // Database connection
  console.log(`Server running at port ${PORT}`);
});
