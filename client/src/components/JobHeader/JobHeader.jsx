import React, { useState } from "react";
import "./JobHeader.css";
import { NavLink } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "@/redux/authSlice";

const JobHeader = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage the hamburger menu
  const [isOpen, setIsOpen] = useState(false);
  // State to manage the profile picture URL
  /* const [profilePic, setProfilePic] = useState("default-profile-pic.jpg"); // Default profile picture */
  // State to manage the dropdown menu visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu state
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <nav className="jobnavbar">
      <div className="logo">
        <NavLink to="/">
          <img src="../images/logo.png" alt="internova" className="logoimg" />
        </NavLink>
      </div>

      {/* Hamburger Menu */}
      <div className="jobhamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navbar Links */}
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        {user && user.role === "recruiter" ? (
          <>
            <li>
              <NavLink to="/admin/companies">Companies</NavLink>
            </li>
            <li>
              <NavLink to="/admin/jobs">Jobs</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/jobpg">Jobs</NavLink>
            </li>
            <li>
              <NavLink to="/internships">Internships</NavLink>
            </li>
            <li>
              <NavLink to="/mentorship">Mentorship</NavLink>
            </li>
            <li>
              <NavLink to="/resources">Resources</NavLink>
            </li>
          </>
        )}

        {!user ? (
          ""
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <User2 />
            </PopoverTrigger>
            <PopoverContent className="w-50 h-30 my-2">
              <div className="flex">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>

                <div className="flex flex-col my-0 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        {" "}
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </ul>
    </nav>
  );
};

export default JobHeader;
