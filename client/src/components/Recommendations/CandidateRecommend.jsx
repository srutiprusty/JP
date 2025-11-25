import React, { useState } from "react";
import axios from "axios";

const CandidateRecommend = () => {
  const [jobId, setJobId] = useState(""); // State for Job ID
  const [country, setCountry] = useState(""); // State for Country
  const [education, setEducation] = useState(""); // State for Education
  const [gender, setGender] = useState(""); // State for Gender
  const [age, setAge] = useState(""); // State for Age
  const [recommendations, setRecommendations] = useState([]); // Default to empty array
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch recommendations
  const fetchRecommendations = async () => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset any previous error

      // Request body to be sent in the API call
      const requestBody = {
        jobId,
        country,
        education,
        gender,
        age,
      };

      // Log request data for debugging
      console.log("Requesting recommendations with data:", requestBody);

      // Send POST request to the backend API with content-type as application/json
      const response = await axios.post(
        "http://localhost:4000/api/v1/recommendations/candidate-recommendations", // Change to your backend endpoint
        requestBody, // Send JSON body
        {
          headers: {
            "Content-Type": "application/json", // Set Content-Type to application/json
          },
        }
      );

      // Log the response to debug
      console.log("API Response:", response);

      // Check if the response contains recommendations and it's an object with an array of candidates
      const candidates = response.data?.recommendations?.matched_candidates;

      if (Array.isArray(candidates)) {
        setRecommendations(candidates); // Set recommendations if response is valid
      } else {
        setRecommendations([]); // Set empty array if no valid candidates found
        console.error("API response does not contain matched_candidates array:", candidates);
        setError("No recommendations found.");
      }

      setLoading(false); // Stop loading
    } catch (err) {
      setLoading(false); // Stop loading on error
      setError("Error fetching recommendations: " + err.message); // Display error message
      console.error("Error fetching recommendations:", err); // Log error for debugging
    }
  };

  return (
    <div>
      <h1>Candidate Recommendations</h1>

      {/* Input fields for user details */}
      <div>
        <label>Job ID:</label>
        <input
          type="text"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)} // Update state on input change
          placeholder="Enter Job ID"
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)} // Update state on input change
          placeholder="Enter Country"
        />
      </div>
      <div>
        <label>Education:</label>
        <input
          type="text"
          value={education}
          onChange={(e) => setEducation(e.target.value)} // Update state on input change
          placeholder="Enter Education"
        />
      </div>
      <div>
        <label>Gender:</label>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)} // Update state on input change
          placeholder="Enter Gender"
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)} // Update state on input change
          placeholder="Enter Age"
        />
      </div>

      {/* Button to fetch recommendations */}
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"} {/* Button text based on loading state */}
      </button>

      {/* Display errors */}
      {error && <div style={{ color: "red" }}>{error}</div>} {/* Display error if any */}

      {/* Display recommendations */}
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p> // Message if no recommendations found
      ) : (
        <div>
          <h2>Recommended Candidates:</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>
                <div>Candidate ID: {rec.can_id}</div>
                {/* Add other properties if they are available */}
                <div>Candidate ID: {rec._id}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CandidateRecommend;
