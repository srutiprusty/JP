import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { NavLink, useNavigate } from "react-router-dom"; // Updated import
import "./Navbar.css";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Updated to useNavigate

  // Effect to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Navigation handlers
  const handleLoginClick = () => {
    navigate("/login"); // Use navigate to redirect to login page
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <nav className={`navbar ${sticky ? "dark-nav" : ""}`}>
        <div className="navs container">
          {/* Logo Section */}
          <div className="logo">
            <NavLink to="/">
              <img src="./images/logo.png" alt="logo" />
            </NavLink>
          </div>

          {/* Navigation Menu */}
          <ul className="menu">
            <li>
              <Link to="home" smooth={true} offset={0} duration={500}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="about" smooth={true} offset={0} duration={500}>
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="faq" smooth={true} offset={0} duration={500}>
                FAQ
              </Link>
            </li>
          </ul>
          <div className="out-landing">
            <NavLink to="/home">HOME</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </div>
          {/* Authentication Buttons */}
          <div className="auth-buttons">
            <button className="login" onClick={handleLoginClick}>
              LOGIN
            </button>
            <button className="signup" onClick={handleRegisterClick}>
              SIGNUP
            </button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div
            className="hamburger"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            role="button"
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <NavLink to="/home" onClick={closeMobileMenu}>
          HOME
        </NavLink>
        <NavLink to="/about" onClick={closeMobileMenu}>
          ABOUT
        </NavLink>
        <NavLink to="/faq" onClick={closeMobileMenu}>
          FAQ
        </NavLink>
        <button className="login" onClick={handleLoginClick}>
          LOGIN
        </button>
        <button className="signup" onClick={handleRegisterClick}>
          SIGNUP
        </button>
      </div>
    </>
  );
};

export default Navbar;
