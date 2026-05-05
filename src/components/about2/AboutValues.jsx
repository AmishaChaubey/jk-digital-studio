import React from "react";
import { Camera, Heart, Award, Sparkles } from "lucide-react";

export default function AboutValues() {
  const values = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Creative Excellence",
      desc: "We blend artistic vision with technical precision to create stunning visual stories.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Client First",
      desc: "Your satisfaction and comfort are our top priorities in every session.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award Winning",
      desc: "Recognized internationally for our innovative photography techniques.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Premium Quality",
      desc: "We use state-of-the-art equipment to deliver exceptional results.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-100 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our{" "}
          <span
            className="text-red-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Values
          </span>
        </h2>

        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-700 to-transparent mx-auto mb-6 rounded-full"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 group"
              style={{ transitionDelay: `${idx * 150 + 600}ms` }}
            >
              <div className="bg-red-900 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto">
                {value.icon}
              </div>
              
              {/* Title with animated underline */}
             <h3 className="text-xl font-bold text-gray-900 mb-4 text-center relative">
  {value.title}
  <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-red-900 rounded-full transition-all duration-500 ease-out group-hover:w-1/2 -translate-x-1/2"></span>
</h3>

              <p className="text-gray-600 leading-relaxed text-center">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
