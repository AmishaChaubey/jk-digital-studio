import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const smoothFadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 1,
      },
    },
  };

  return (
    <section className="relative h-[90vh] md:h-[500px] flex items-center justify-center text-center overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="absolute inset-0"
      >
        <img
          src="https://images.pexels.com/photos/34996513/pexels-photo-34996513.jpeg"
          alt="Interior Design"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl px-6 mt-16 md:mt-0"
      >
        {/* HEADING */}
        <motion.h1
          variants={smoothFadeUp}
          className="text-3xl font-serif sm:text-4xl lg:text-5xl font-bold leading-tight text-[#fafaef]"
        >
          Elevate Your Space with{" "}
          <span className="block text-red-600 font-serif">
            JK Studio Designs
          </span>
        </motion.h1>

        {/* DESCRIPTION (hidden on small screens) */}
        <motion.p
          variants={smoothFadeUp}
          className="hidden sm:block mt-6 text-base sm:text-lg md:text-xl text-[#fafaef]/90"
        >
          Transform your interiors with creative wall designs and modern
          aesthetics crafted for premium living.
        </motion.p>
      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 12, 0] }}
        transition={{
          delay: 1,
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-6 text-[#fafaef] text-sm"
      >
      </motion.div>
    </section>
  );
};

export default HeroSection;