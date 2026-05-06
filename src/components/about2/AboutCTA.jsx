import React from "react";
import { Link } from "react-router-dom";

export default function AboutCTA() {
  return (
    <div className="relative min-h-[90vh] overflow-hidden flex items-center justify-center py-5">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src="/about-cta.jpg" 
          alt="Photography" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      

      {/* Glass card container */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left side - Empty space for balance */}
          <div className="hidden md:block"></div>

          {/* Right side - Content with glass effect */}
          <div className="backdrop-blur-md bg-white/5 border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl hover:shadow-2xl transition-all duration-500 group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-20">
              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-white via-red-100 to-orange-100 bg-clip-text text-transparent leading-tight">
                Ready to Create Magic Together?
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-gray-100 mb-6 sm:mb-8 md:mb-10 font-light leading-relaxed">
                Let's capture your story with elegance and artistry. Every moment deserves to be timeless.
              </p>

              {/* CTA Button */}
              <Link to='/contact'><button className="relative px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 group/btn overflow-hidden w-full sm:w-auto">
                <div className="absolute inset-0 bg-red-800 rounded-full opacity-100 group-hover/btn:opacity-110 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 rounded-full"></div>
                <span className="relative flex items-center justify-center text-white whitespace-nowrap">
                  Book Your Session
                  <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button></Link>

              {/* Subtle badge */}
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300 font-light">
                ✨ Limited availability | Premium experience guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
