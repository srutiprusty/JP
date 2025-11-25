/* import React, { useState } from "react";
import axios from "axios";
import Job from "./../../../../../x-backup/frontend/src/pages/JobSeeker/job/Job";

const JobRecommend = () => {
  const [can_id, setCanId] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state 
  // Function to fetch recommendations
  const fetchRecommendations = async () => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset any previous error

      // Request body to be sent in the API call
      const requestBody = {
        can_id,
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
        console.error(
          "API response does not contain matched_candidates array:",
          candidates
        );
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
      {/* Input fields for user details 
      <div>
        <label>Candidate Id :</label>
        <input
          type="text"
          value={can_id}
          onChange={(e) => setCanId(e.target.value)} // Update state on input change
          placeholder="Enter Job ID"
        />
      </div>
     
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}{" "}
       </button>
    
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
    
      
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p> // Message if no recommendations found
      ) : (
        <div>
          <h2>Recommended Jobs:</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>
                <div>Job ID: {rec.jobid}</div>
               
                <div>Job ID: {rec._id}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobRecommend;
 */

import React, { useState } from "react";
import axios from "axios";

const JobRecommend = () => {
  const [can_id, setCanId] = useState(""); // Candidate ID
  const [recommendations, setRecommendations] = useState([]); // Store recommendations
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch recommendations based on the candidate ID
  const fetchRecommendations = async () => {
    try {
      setLoading(true); // Start loading
      setError(null); // Reset any previous errors

      const requestBody = { can_id };

      // Send POST request to the backend API
      const response = await axios.post(
        "http://localhost:4000/api/v1/recommendations/job-recommendations", // Endpoint for job recommendations
        requestBody,
        {
          headers: {
            "Content-Type": "application/json", // Ensure the Content-Type is application/json
          },
        }
      );

      const jobs = response.data?.recommendations?.matched_jobs;

      if (Array.isArray(jobs)) {
        setRecommendations(jobs); // Set recommendations if the response is valid
      } else {
        setRecommendations([]); // If no recommendations found, reset the state
        setError("No job recommendations found.");
      }
      setLoading(false); // Stop loading
    } catch (err) {
      setLoading(false); // Stop loading on error
      setError("Error fetching job recommendations: " + err.message);
    }
  };

  return (
    <div>
      <h1>Job Recommendations for Candidate</h1>
      <div>
        <label>Candidate ID:</label>
        <input
          type="text"
          value={can_id}
          onChange={(e) => setCanId(e.target.value)} // Update state
        />
      </div>

      {/* Button to fetch recommendations */}
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {/* Display error message if any */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Display recommendations if available */}
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p> // Message if no recommendations found
      ) : (
        <div>
          <h2>Recommended Jobs:</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>
                <div>Job Title: {rec.title}</div> {/* Job title */}
                <div>Job ID: {rec.job_id}</div> {/* Job ID */}
                <div>Location: {rec.location}</div> {/* Job location */}
                <div>Salary: {rec.salary} LPA</div> {/* Job salary */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobRecommend;
