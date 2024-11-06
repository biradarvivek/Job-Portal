import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { query, setQuery } = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="flex flex-col lg:flex-row px-8 lg:px-32 pt-20 lg:pt-32 items-center justify-between gap-5"
      >
        <div className="max-w-full lg:max-w-[700px] text-center lg:text-left">
          <h1 className="leading-normal tracking-wide text-3xl md:text-4xl lg:text-5xl font-bold text-gray-600">
            Find Your <span className="text-blue-600">Dream jobs</span> now,
            where opportunities{" "}
            <span className="text-blue-600">meet ambition!</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-md py-6 lg:py-8">
            Connect with top employers and discover opportunities that align
            with your skills and ambitions. Start your journey towards career
            fulfillment today!
          </p>
        </div>
        <div className="w-full lg:w-auto">
          <img
            width="900px"
            src="https://www.sapphiresolutions.net/images/job_new_portfolio/job_portal_about.svg"
            alt="image"
          />
        </div>
      </motion.div>
      <div className="flex w-full lg:w-[40%] m-auto my-6 lg:my-8 shadow-lg border border-gray-200 pl-3 rounded-full items-center">
        <input
          type="text"
          placeholder="Find your dream job"
          className="w-full outline-none border-none rounded-full bg-white p-3"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          onClick={searchJobHandler}
          className="bg-blue-800 h-12 rounded-r-full "
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default HeroSection;
