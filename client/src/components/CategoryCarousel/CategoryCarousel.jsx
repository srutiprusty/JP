import React from "react";
import "./CategoryCarousel.css";
import { FaLaptopCode } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { MdDraw } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";

const CategoryCarousel = () => {
  return (
    <>
      <div className="button-grid-contain-jobs">
        <div className="button-grid-jobs">
          <div className="job-button-jobs">
            <MdDraw className="icon-jobs" />
            <span>Graphic Designer</span>
          </div>
          <div className="job-button-jobs">
            <VscGraphLine className="icon-jobs" />
            <span>Data Analyst</span>
          </div>
          <div className="job-button-jobs">
            <FaLaptopCode className="icon-jobs" />
            <span>FullStack Developer</span>
          </div>
          <div className="job-button-jobs col-span-2-jobs">
            <FaLaptopCode className="icon-jobs" />
            <span>Software Developer</span>
          </div>
          <div className="job-button-jobs">
            <FaArrowAltCircleRight className="icon-jobs" />
            <span>Explore</span>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default CategoryCarousel;
