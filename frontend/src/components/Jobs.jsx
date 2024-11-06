import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./job";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import { motion } from "framer-motion";

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filterJobs = allJobs.filter((job) => {
        return (
          job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filterJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <>
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto mt-5">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-1/4">
              <FilterCard />
            </div>
            {filterJobs.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 md:grid-cols-3 mx-2 sm:grid-cols-2 gap-4 my-5">
                  {filterJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                      }}
                      key={job?._id}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Jobs;
