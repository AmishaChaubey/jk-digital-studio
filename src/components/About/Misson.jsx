import React from "react";
import { motion } from "framer-motion";

const Mission = () => {

  const smooth = {
    type: "spring",
    stiffness: 60,
    damping: 18,
    mass: 1,
  };

  return (
    <section className="bg-gray-100 pb-25 px-4 sm:px-6 md:px-12 lg:px-16 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">

        {/* LEFT SIDE - IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={smooth}
          viewport={{ once: true }}
          className="relative w-full mb-20 lg:mb-0"
        >
          <motion.img
            alt="Photo Studio"
            src="https://images.pexels.com/photos/10352007/pexels-photo-10352007.jpeg"
            className="rounded-lg shadow-lg w-full h-[250px] sm:h-[300px] lg:h-[350px] object-cover"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          />

          {/* CARDS */}
          <div className="flex flex-col gap-4 w-full px-4 sm:px-6 mt-6 lg:absolute lg:-bottom-32 lg:left-3/4 lg:-translate-x-1/2 lg:flex-row lg:gap-6 lg:w-auto lg:px-0 lg:mt-10 xl:mt-24">

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...smooth, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-red-600 text-white rounded-lg shadow-lg p-4 sm:p-5 lg:p-6 w-full lg:w-80"
            >
              <h3 className="text-base sm:text-lg font-serif font-bold mb-2">
                Our Mission
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                At JK Digital Photo Studio, we strive to capture moments that tell
                your story. With creativity and passion, we turn memories into
                timeless treasures.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...smooth, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-red-600 text-white rounded-lg shadow-lg p-4 sm:p-5 lg:p-6 w-full lg:w-80"
            >
              <h3 className="font-serif text-base sm:text-lg font-bold mb-2">
                Our Vision
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                At JK Digital Photo Studio, we envision a world where every story is
                beautifully preserved. With innovation and excellence, we make
                photography an unforgettable experience.
              </p>
            </motion.div>

          </div>
        </motion.div>

        {/* RIGHT SIDE CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ ...smooth, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative px-4 sm:px-6 md:px-2 text-center lg:text-left -mb-15 lg:mb-40 lg:mt-0"
        >
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...smooth, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl mb-2 mt-1"
          >
            Our Core <span className="text-red-600">Values</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ...smooth, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-600 text-sm sm:text-base xl:text-lg text-center xl:text-left leading-relaxed"
          >
            At JK Digital Photo Studio, we capture your precious memories with
            creativity and passion. Our mission and vision reflect our dedication to
            excellence in every frame. We blend artistic vision with modern techniques
            to deliver stunning visuals that truly stand out.
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
};

export default Mission;