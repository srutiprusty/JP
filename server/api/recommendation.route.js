import express from "express";
import { getCandidateRecommendations } from "../controllers/recommendation.controller.js";

const router = express.Router();

// Route to handle candidate recommendations
router.post("/candidate-recommendations", getCandidateRecommendations);

export default router;
