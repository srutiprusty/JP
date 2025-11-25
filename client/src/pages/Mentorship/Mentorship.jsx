import React from "react";
import { useEffect } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import MentorsCard from "./MentorsCard";
import JobHeader from "@/components/JobHeader/JobHeader";
import Footer from "@/components/Footer/Footer";
const Mentorship = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top on page load
  }, []);
  return (
    <>
      <JobHeader />
      <div className="relative w-full">
        {/* Full-width image */}
        <img
          src="./images/mentorshipHome.png"
          alt="Full Width"
          className="w-full h-[300px] md:h-[500px] lg:h-[600px] object-cover"
        />
        {/* Button */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8">
          <button
            className="bg-white text-black text-lg  px-8 py-3
        border-4 border-black rounded-3xl shadow-lg hover:bg-yellow-600"
          >
            FIND A MENTOR
          </button>
        </div>
      </div>
      <div className="relative w-full py-6 flex justify-center items-center">
        {/* Center Image */}
        <img
          src="./images/mentorHeading.png"
          alt="Centered Image"
          className="w-[800px] h-auto object-cover"
        />

        {/* Explore Button */}
        <button className="absolute right-[10%] bg-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 flex items-center">
          <span className="mr-2">Explore</span>
          <FaArrowAltCircleRight className="text-2xl" />
        </button>
      </div>
      <div className="flex gap-6 justify-around">
        <div>
          <MentorsCard />
        </div>
        <div>
          <MentorsCard />
        </div>
        <div>
          <MentorsCard />
        </div>
        <div>
          <MentorsCard />
        </div>
      </div>
      <div className="relative w-full py-6 flex justify-center items-center">
        {/* Center Image */}
        <img
          src="./images/Reviews.png"
          alt="Centered Image"
          className="w-[500px] h-auto object-cover"
        />
      </div>
      <div className="jobpg">
        <Footer />
      </div>
    </>
  );
};

export default Mentorship;
