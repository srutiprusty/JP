import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const { token } = useParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        //console.log("Verifying token:", token);
        const response = await axios.get(
          `${USER_API_END_POINT}/verify/${token}`
        );
        if (response.data.success) {
          setVerificationStatus("success");
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        // console.error("Verification error:", error.response || error); // Debug log
        setError(error.response?.data?.message || "Verification failed");
        setVerificationStatus("error");
        //  console.log(error);
      }
    };
    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {verificationStatus === "verifying" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Verifying your email...</h2>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">
              Email Verified Successfully!
            </h2>
            <p className="mt-2">Redirecting to login page...</p>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">
              Verification Failed
            </h2>
            <p className="mt-2">The verification link is ...</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
