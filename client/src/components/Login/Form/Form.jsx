import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { setLoading, setUser } from "../../../redux/authSlice";
import "./Form.css";
import { USER_API_END_POINT, COMPANY_API_END_POINT } from "@/utils/constant";

const Form = ({ role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await fetch(`${USER_API_END_POINT}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        if (data.message === "Please verify your email first") {
          toast.error(data.message);
          return;
        }
        throw new Error(data.message);
      }

      dispatch(setUser(data.user));
      toast.success(data.message);

      // Navigate based on role
      if (data.user.role === "student") {
        navigate("/jobseeker");
      } else {
        // Check if user has a company
        try {
          const companyRes = await fetch(`${COMPANY_API_END_POINT}/get`, {
            method: "GET",
            credentials: "include",
          });
          const companyData = await companyRes.json();
          if (companyData.success && companyData.companies.length > 0) {
            navigate(`/admin/companies/${companyData.companies[0]._id}`);
          } else {
            navigate("/admin/companies/create");
          }
        } catch (error) {
          navigate("/admin/companies/create");
        }
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="l-form-wrapper">
      <form className="l-form" onSubmit={handleLogin}>
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="0 0 32 32"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
            </g>
          </svg>
          <input
            type="email"
            className="l-input"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <svg
            height="20"
            viewBox="-64 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
          </svg>
          <input
            type="password"
            className="l-input"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <div>
            <NavLink to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </NavLink>
          </div>
        </div>

        <button type="submit" className="button-submit" disabled={loading}>
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <span>Please wait...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="p">
          Don't have an account?{" "}
          <NavLink to="/register" className="span">
            Sign Up
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Form;
