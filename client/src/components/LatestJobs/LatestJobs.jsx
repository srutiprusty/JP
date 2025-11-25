import React from "react";
import LatestJobCards from "../LatestJobsCards/LatestJobCards";
import { useSelector } from "react-redux";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
import { createSelector } from "@reduxjs/toolkit";

const selectJobs = createSelector(
  (state) => state.job?.allJobs,
  (allJobs) => allJobs || []
);

const LatestJobs = () => {
  const allJobs = useSelector(selectJobs);
  const jobsToDisplay = allJobs.slice(0, 6);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="grid grid-cols-3 gap-4 my-5">
        {jobsToDisplay.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            No Jobs Available
          </div>
        ) : (
          jobsToDisplay.map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
