import axios from "axios";

// Function to handle candidate recommendations
export const getCandidateRecommendations = async (req, res) => {
  try {
    const { jobId, country, education, gender, age } = req.body;

    console.log("Requesting recommendations for Job ID:", jobId);

    // Call the ML API
    const response = await axios.post(
      "https://internova-api.onrender.com/match_candidates",
      {
        jobId,
        country,
        education,
        gender,
        age,
      }
    );

    console.log("ML API Response:", response.data);

    const recommendations = response.data; // Assuming the response is a list of recommendations

    res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (error) {
    // Enhanced error logging with additional details
    console.error("Error in candidate recommendations:", {
      message: error.message,
      stack: error.stack,
      requestBody: req.body,
      mlApiError: error.response?.data || "No error details from ML API",
    });

    res.status(500).json({
      success: false,
      message: "Error fetching candidate recommendations",
      error: error.message,
      details: error.response?.data || "No further details",
    });
  }
};
/* 
export const getJobRecommendations = async (req, res) => {
  try {
    const { can_id } = req.body;

    console.log("Requesting recommendations for Job ID:", jobId);

    // Call the ML API
    const response = await axios.post(
      "https://internova-api.onrender.com/match_candidates",
      {
        can_id,
      }
    );

    console.log("ML API Response:", response.data);

    const recommendations = response.data; // Assuming the response is a list of recommendations

    res.status(200).json({
      success: true,
      recommendations,
    });
  } catch (error) {
    // Enhanced error logging with additional details
    console.error("Error in candidate recommendations:", {
      message: error.message,
      stack: error.stack,
      requestBody: req.body,
      mlApiError: error.response?.data || "No error details from ML API",
    });

    res.status(500).json({
      success: false,
      message: "Error fetching candidate recommendations",
      error: error.message,
      details: error.response?.data || "No further details",
    });
  }
}; */
