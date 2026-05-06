import React from "react";
import { Award, User, Lightbulb, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <Award size={18} />,
    title: "Expertise",
    desc: "Professional photographers with years of experience, dedicated to capturing every moment with precision and creativity.",
  },
  {
    icon: <User size={18} />,
    title: "Personalized Service",
    desc: "Every shoot is carefully tailored to reflect your unique story and style.",
  },
  {
    icon: <Lightbulb size={18} />,
    title: "Creative Vision",
    desc: "We craft cinematic and artistic visuals that stand out beautifully.",
  },
  {
    icon: <TrendingUp size={18} />,
    title: "Premium Results",
    desc: "High-end editing with attention to every detail for stunning output.",
  },
];

const WhyChooseUsAbout = () => {
  return (
    <section className="w-full md:py-24 overflow-hidden">
      
      {/* ✅ UPDATED PADDING HERE */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-8 lg:px-10 xl:px-0 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE GRID */}
        <div className="relative w-full flex justify-center">
          <div className="grid grid-cols-2 gap-4 sm:gap-6">

            <div className="col-span-2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/36836726/pexels-photo-36836726.jpeg"
                className="w-full max-w-[440px] mb-5 h-44 sm:h-52 md:h-56 object-cover rounded-2xl shadow-xl translate-y-4 sm:translate-y-6"
              />
            </div>

            <div className="flex justify-end">
              <img
                src="https://images.pexels.com/photos/13817592/pexels-photo-13817592.jpeg"
                className="w-40 sm:w-48 md:w-52 h-52 sm:h-60 md:h-64 object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div className="flex justify-start">
              <img
                src="https://images.pexels.com/photos/11449843/pexels-photo-11449843.jpeg"
                className="w-40 sm:w-48 md:w-52 h-52 sm:h-60 md:h-64 object-cover rounded-2xl shadow-xl"
              />
            </div>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 sm:mb-6 text-red-600">
            Why choose us
          </h2>

          <p className="text-[#888888] mb-8 sm:mb-10 max-w-md text-sm sm:text-base">
            We capture your moments with creativity, emotion, and premium quality.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 sm:gap-y-10 gap-x-6 sm:gap-x-10">

            {features.map((item, index) => (
              <div key={index} className="relative pr-4 sm:pr-6">

                <div className="flex items-center justify-center rounded-full bg-red-600 text-[#fafaef] h-10 w-10 sm:h-12 sm:w-12 mb-3">
                  {item.icon}
                </div>

                <h4 className="font-serif text-base sm:text-lg font-medium mb-1 text-red-600">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#888888]">
                  {item.desc}
                </p>

                {/* vertical divider */}
                {index % 2 === 0 && (
                  <div className="hidden sm:block absolute top-0 right-0 h-full w-[2px] bg-red-600"></div>
                )}
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsAbout;