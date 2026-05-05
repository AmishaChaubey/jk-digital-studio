import React from "react";

export default function AboutStats({ isVisible }) {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "5000+", label: "Happy Clients" },
    { number: "15K+", label: "Photos Captured" },
    { number: "50+", label: "Awards Won" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 mt-10 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`relative group bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 text-center transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:shadow-[#C8252C]/20 overflow-hidden ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            {/* Animated borders */}
            <span className="absolute left-0 top-0 w-0 h-[2px] bg-[#C8252C] group-hover:w-full transition-all duration-500"></span>
            <span className="absolute right-0 bottom-0 w-0 h-[2px] bg-[#C8252C] group-hover:w-full transition-all duration-500"></span>
            <span className="absolute right-0 top-0 h-0 w-[2px] bg-[#C8252C] group-hover:h-full transition-all duration-500"></span>
            <span className="absolute left-0 bottom-0 h-0 w-[2px] bg-[#C8252C] group-hover:h-full transition-all duration-500"></span>

            {/* Number */}
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-900 mb-2">
              {stat.number}
            </div>
            {/* Label */}
            <div className="text-sm sm:text-base md:text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
