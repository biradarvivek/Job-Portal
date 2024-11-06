import React from "react";
import LatestjobCards from "./LatestjobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, rotateY: 90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        exit={{ opacity: 0, rotateY: -90 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="max-w-7xl mx-auto my-20"
      >
        <h1 className="text-4xl font-bold">
          <span className="text-blue-600">Latest & Top</span> Job Openings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 mx-4 sm:grid-cols-2 gap-4 my-5">
          {allJobs?.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => <LatestjobCards key={job._id} job={job} />)
          )}
        </div>
      </motion.div>
    </>
  );
};

export default LatestJobs;
