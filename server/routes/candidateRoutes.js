import express from "express";
const router = express.Router();
import axios from "axios";

router.post("/match", async (req, res) => {
  try {
    const response = await axios.post(
      "https://internova-api.onrender.com/match_candidates",
      req.body
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to match candidates" });
  }
});

export default router;
