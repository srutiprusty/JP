import React, { useState } from "react";
import Navbar from "./../Navbar/Navbar";
import "./Home.css";
import { FaSearch } from "react-icons/fa";
import Faq from "../Faq/Faq";
import About from "../About/About";

const Home = () => {
  // Using state to control the input field
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="home-nav">
        <Navbar />
      </div>
      <div className="home-container" id="home">
        <div className="home">
          <div className="leftSec">
            <h1 className="home-head">Spotting talent, shaping futures</h1>
            <div className="search-bar">
              <input
                placeholder="Search what you want..."
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <FaSearch />
            </div>
            <p className="popular">
              Popular : Full Stack Web Developer, UI/UX Designer, ML
              Engineer,....
            </p>
          </div>
          <div className="head-sec">
            {/* Use the imported image reference */}
            <img
              src="./images/Group 10.png"
              alt="home"
              width={500}
              height={550}
            />
          </div>
        </div>
      </div>
      <About />
      <Faq />
    </>
  );
};

export default Home;
