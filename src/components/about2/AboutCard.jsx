import React from "react";
import CardSwap, { Card } from "./CardSwap"; 
import { Link } from "react-router-dom";

export default function AboutJourney() {
  return (
    <div className="relative w-full overflow-hidden flex flex-col md:flex-row items-stretch min-h-screen">

      {/* Full Section Background */}
      <div className="absolute inset-0">
        {/* Main Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>

        {/* Decorative Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-300 rounded-full mix-blend-soft-light filter blur-4xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-amber-200 rounded-full mix-blend-soft-light filter blur-4xl opacity-20 animate-pulse"></div>
      </div>

      {/* Left Text */}
      <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left space-y-6 px-8 md:px-16 z-10 py-16 md:py-0">
        <p className="text-red-900 text-sm font-semibold uppercase tracking-widest mb-4">About</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Our Journey in Capturing Moments
        </h2>
        <div className="w-16 h-1 bg-red-900 rounded-full mx-auto md:mx-0"></div>
        <p className="text-gray-600 text-lg md:text-xl">
          Kanchan Studio is a creative hub for professional photography and videography. We specialize in weddings, portraits, and commercial projects.
        </p>
       <Link to="/contact"><button className="bg-red-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-max mx-auto md:mx-0">
          Book a Session
        </button></Link>
      </div>

      {/* Right Card Swap */}
      <div className="md:w-1/2 flex items-center justify-center px-4 md:px-8 z-10 py-16 md:py-0">
        <CardSwap width={600} height={800} cardDistance={60} verticalDistance={50}>
          <Card customClass="shadow-2xl rounded-2xl bg-cover bg-center" style={{ backgroundImage: "url('/wedd-img/wedding3.jfif')" }} />
          <Card customClass="shadow-2xl rounded-2xl bg-cover bg-center" style={{ backgroundImage: "url('/product-img/pro6.jfif')" }} />
          <Card customClass="shadow-2xl rounded-2xl bg-cover bg-center" style={{ backgroundImage: "url('/port-img/port2.jpg')" }} />
          <Card customClass="shadow-2xl rounded-2xl bg-cover bg-center" style={{ backgroundImage: "url('/event-img/wedd-event7.jfif')" }} />
        </CardSwap>
      </div>
    </div>
  );
}