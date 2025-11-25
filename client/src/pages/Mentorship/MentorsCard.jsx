import React from "react";

const MentorsCard = () => {
  return (
    <>
      <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        {/* Adjusted image height */}
        <img
          src="./images/mentorCardImage.png"
          alt=""
          className="object-cover object-center w-full rounded-t-3xl h-70 dark:bg-gray-500"
        />
        {/* Further reduced padding and spacing in the card */}
        <div className="flex flex-col justify-between p-2 space-y-2">
          <div className="space-y-1">
            <h2 className="text-lg font-medium tracking-wide">Gabriella Han</h2>
            <p className="dark:text-gray-800 text-xs">Innovation Specialist</p>
          </div>
          <button
            type="button"
            className="flex items-center justify-center w-full p-1.5 font-medium tracking-wide rounded-md bg-violet-600 text-gray-50 hover:bg-violet-800"
          >
            CONNECT
          </button>
        </div>
      </div>
    </>
  );
};

export default MentorsCard;
