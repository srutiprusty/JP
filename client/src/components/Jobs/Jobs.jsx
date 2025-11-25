import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Job from "./../job/Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import JobHeader from "./../JobHeader/JobHeader";

const Jobs = () => {
  const { allJobs = [], searchedQuery } = useSelector((store) => store.job); // Add default empty array
  const [filterJobs, setFilterJobs] = useState([]); // Initialize with empty array
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.description
            ?.toLowerCase()
            .includes(searchedQuery.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filterJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Pagination function to go to next page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <JobHeader />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {currentJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-2"
                >
                  Previous
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={indexOfLastJob >= filterJobs.length}
                  className="px-4 py-2 mx-2"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
