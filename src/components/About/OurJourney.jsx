import React from "react";
import { motion } from "framer-motion";

const images = [
  "https://images.pexels.com/photos/30167010/pexels-photo-30167010.jpeg",
  "https://images.pexels.com/photos/13031908/pexels-photo-13031908.jpeg",
  "https://images.pexels.com/photos/10213950/pexels-photo-10213950.jpeg",
  "https://images.pexels.com/photos/19593542/pexels-photo-19593542.jpeg",
  "https://images.pexels.com/photos/25337907/pexels-photo-25337907.jpeg",
  "https://images.pexels.com/photos/18015838/pexels-photo-18015838.jpeg",
  "https://images.pexels.com/photos/13779721/pexels-photo-13779721.jpeg",
  "https://images.pexels.com/photos/13779727/pexels-photo-13779727.jpeg",
  "https://images.pexels.com/photos/8497894/pexels-photo-8497894.jpeg",
  "https://images.pexels.com/photos/19593544/pexels-photo-19593544.jpeg"
];

const OurJourney = () => {
  return (
    <section className="w-full md:py-16 lg:py-24 py-10 px-6 md:px-16 overflow-hidden">
      
      {/* ✅ FIXED HERE */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-sm font-serif tracking-widest text-red-600 uppercase mb-2">
            About Us
          </h4>

          <h2 className="md:text-3xl font-serif lg:text-4xl sm:text-2xl font-bold text-red-600 mb-4 md:mb-2">
            Capturing Moments, Creating Experiences
          </h2>

          <p className="text-[#888888] leading-relaxed  mb-4">
            We don’t just design spaces — we craft meaningful experiences that
            reflect personality, purpose, and lifestyle. Every detail is
            thoughtfully curated to create environments that feel both inspiring
            and functional.
            Our journey is driven by passion, creativity, and a commitment to
            excellence. From concept to completion, we transform ideas into
            visually stunning realities that leave a lasting impression.
          </p>

          <button className="bg-red-600 text-[#fafaef] px-6 py-3 rounded-md hover:bg-red-800 transition">
            Explore More
          </button>
        </motion.div>

        {/* RIGHT IMAGES */}
        {/* ✅ FIXED HEIGHT */}
        <div className="relative h-[500px] md:h-full flex items-center justify-center">
          {images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt="design"
              className="absolute w-[360px] md:w-[400px] h-[350px] md:h-[400px] object-cover rounded-2xl shadow-xl border-2 border-red-600"

              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 5,
              }}

              style={{
                transform:
                  index === 0
                    ? "rotate(-8deg) translate(-120px, -80px)"
                    : index === 1
                      ? "rotate(6deg) translate(120px, -60px)"
                      : index === 2
                        ? "rotate(-4deg) translate(-80px, 120px)"
                        : "rotate(8deg) translate(120px, 120px)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurJourney;