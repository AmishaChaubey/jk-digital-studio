import React, { useState, useEffect } from "react";

export default function AboutHero({ isVisible }) {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY * 0.5); // slower movement for parallax
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-red-900 text-white overflow-hidden">
      {/* Parallax & Zoom Background */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-zoom"
        style={{
          backgroundImage: "url('/banner/about-banner.jpg')",
          transform: `translateY(${offsetY}px)`,
        }}
      ></div>

      {/* Overlay for text clarity */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Banner Content */}
      <div
        className={`relative max-w-7xl mx-auto px-6 py-42 md:py-50 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 tracking-tight">
          Capturing Moments, Creating Memories
        </h1>
        <p className="text-xl md:text-2xl text-center text-red-100 max-w-3xl mx-auto">
          Where passion meets perfection in every frame
        </p>
      </div>

      {/* Zoom Animation */}
      <style>{`
        @keyframes zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-zoom {
          animation: zoom 15s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
