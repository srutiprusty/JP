import { useEffect } from "react";
import React from "react";
import Navbar from "../Navbar/Navbar";
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <div
        className="mt-30 ml-20 mr-20 flex flex-col lg:flex-row items-start justify-between max-w-screen-xl mx-auto"
        id="about"
      >
        <div className="text-center lg:w-[50%]">
          <img
            src="./images/aboutimage24.png"
            alt="Responsive Image"
            className="w-[130%] sm:w-[120%] md:w-[110%] lg:w-[90%] h-auto mx-auto"
          />

          <div className="mt-8 ml-14 mr-14 max-w-xl text-center">
            <p className="text-lg text-gray-700 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.
              Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris
              massa. Vestibulum lacinia arcu eget nulla. Nulla vitae massa.
            </p>

            <button className="flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-blue-600 mx-auto">
              EXPLORE
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="lg:w-[40%] w-full flex justify-start gap-6 mt-36">
          {/* Image 1 */}
          <div className="w-[calc(25%-0.5rem)]">
            <img
              src="./images/aboutRecomendation.png"
              alt="Card Image 1"
              className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Image 2 */}
          <div className="w-[calc(25%-0.5rem)]">
            <img
              src="./images/aboutPesonalization.png"
              alt="Card Image 2"
              className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Image 3 */}
          <div className="w-[calc(25%-0.5rem)]">
            <img
              src="./images/aboutOnestep.png"
              alt="Card Image 3"
              className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Image 4 */}
          <div className="w-[calc(25%-0.5rem)]">
            <img
              src="/images/aboutMentorship.png"
              alt="Card Image 4"
              className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
