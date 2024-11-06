import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  // Animation variants for sliding in from the left and right
  const slideLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const slideRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div>
      <Navbar />
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
      >
        <CategoryCarousel />
      </motion.div>

      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
      >
        <LatestJobs />
      </motion.div>

      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
