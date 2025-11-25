import React, { useState } from "react";
import "./SignUp.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  /* const [file, setFile] = useState(""); */
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await fetch(`${USER_API_END_POINT}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, role }),
      });

      const result = await response.json();

      //clear the value
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("");
      //
      if (response.ok) {
        toast.success(result.message);
        if (role === "student") {
          navigate("/stdlogin");
        } else if (role === "recruiter") {
          navigate("/emplogin");
        } else {
          navigate("/mentorlogin");
        }
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <div className="s-form-wrapper">
        <form className="s-form" onSubmit={handleSignup}>
          <span className="title">Welcome</span>
          <span className="sub mb">Register to get full access now :)</span>

          <input
            type="text"
            className="s-input"
            placeholder="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            className="s-input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="s-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="s-input"
            required
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="recruiter">Employer</option>
            <option value="mentor">Mentor</option>
          </select>
          <span className="sub">
            Already have an account? <NavLink to="/login">Sign in</NavLink>
          </span>
          <button className="s-register" type="submit">
            {loading ? "Sign up" : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
