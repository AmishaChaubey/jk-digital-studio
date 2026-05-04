import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  const slides = [
    {
      image: "/banner/banner2.jpg",
      title: "Timeless Portraits.",
      titleAccent: "Perfect Shots.",
      subtitle: "Timeless Photography for Life's Most Cherished Stories",
    },
    {
      image: "/banner/banner3.jpg",
      title: "Every Moment",
      titleAccent: "Beautifully Captured.",
      subtitle: "Professional photography that turns memories into masterpieces",
    },
  ];

  const goTo = (index, dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 600);
  };

  const prev = () => goTo(current === 0 ? slides.length - 1 : current - 1, 'prev');
  const next = () => goTo(current === slides.length - 1 ? 0 : current + 1, 'next');

  useEffect(() => {
    const timer = setInterval(() => next(), 5500);
    return () => clearInterval(timer);
  }, [current, animating]);

  return (
    <div className="relative h-[92vh] sm:h-screen bg-black overflow-hidden" id="home">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter    { font-family: 'Inter', sans-serif; }

        @keyframes slideInRight {
          from { opacity: 0; transform: scale(1.06) translateX(3%); }
          to   { opacity: 1; transform: scale(1) translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: scale(1.06) translateX(-3%); }
          to   { opacity: 1; transform: scale(1) translateX(0); }
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to   { transform: scale(1.07); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandWidth {
          from { width: 0; opacity: 0; }
          to   { width: 5rem; opacity: 1; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50%       { transform: translateY(6px); opacity: 0.5; }
        }

        .slide-in-right { animation: slideInRight 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .slide-in-left  { animation: slideInLeft  0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .ken-burns      { animation: kenBurns 6s ease-out forwards; }
        .txt-1 { animation: fadeDown 0.7s ease 0.1s both; }
        .txt-2 { animation: fadeUp  0.7s ease 0.25s both; }
        .txt-3 { animation: fadeUp  0.7s ease 0.4s  both; }
        .txt-4 { animation: fadeUp  0.7s ease 0.55s both; }
        .bar   { animation: expandWidth 0.6s ease 0.3s both; }
        .dot-pulse    { animation: pulseDot 1.6s ease-in-out infinite; }
        .scroll-bounce { animation: scrollBounce 1.8s ease-in-out infinite; }

        .overlay-left {
          background: linear-gradient(
            105deg,
            rgba(0,0,0,0.82) 0%,
            rgba(0,0,0,0.55) 45%,
            rgba(0,0,0,0.18) 70%,
            transparent 100%
          );
        }
        .overlay-bottom {
          background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 40%);
        }
        .nav-arrow {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          transition: all 0.3s ease;
        }
        .nav-arrow:hover {
          background: rgba(153,27,27,0.75);
          border-color: rgba(153,27,27,0.6);
          transform: scale(1.1);
        }
      `}</style>

      {/* ── Slides ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 ${
            i === current
              ? animating
                ? direction === 'next' ? 'slide-in-right' : 'slide-in-left'
                : 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
          style={{ zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover ${i === current && !animating ? 'ken-burns' : ''}`}
          />
          <div className="absolute inset-0 overlay-left" />
          <div className="absolute inset-0 overlay-bottom" />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)' }} />
        </div>
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex items-center px-5 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-2xl lg:max-w-3xl w-full" key={current}>

          {/* Tag */}
          <div className="txt-1 inline-flex items-center gap-2 mb-4 sm:mb-5">
            <div className="dot-pulse w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="font-inter text-[10px] sm:text-xs tracking-[0.25em] text-red-400 font-semibold uppercase">
              Kanchan Photo Studio
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-playfair txt-2 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-2 sm:mb-3">
            {slides[current].title}
          </h1>
          <h1
            className="font-playfair txt-3 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] mb-5 sm:mb-6"
            style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(220,38,38,0.9)' }}
          >
            {slides[current].titleAccent}
          </h1>

          {/* Divider */}
          <div className="bar h-[2px] bg-gradient-to-r from-red-700 via-red-500 to-transparent mb-5 sm:mb-6" />

          {/* Subtitle */}
          <p className="font-inter txt-4 text-sm sm:text-base md:text-lg text-gray-300 font-light leading-relaxed mb-7 sm:mb-9 max-w-xl tracking-wide">
            {slides[current].subtitle}
          </p>

          {/* ── CTAs — always one row ── */}
          <div className="txt-4 flex flex-row items-center gap-2 sm:gap-3">
            <Link to="/contact" className="flex-shrink-0">
              <button className="group flex items-center gap-1.5 sm:gap-2 bg-red-800 hover:bg-red-700 text-white pl-4 pr-3 sm:pl-6 sm:pr-4 py-2.5 sm:py-3 rounded-full font-inter font-bold tracking-widest uppercase text-[10px] sm:text-[11px] transition-all duration-300 hover:scale-105 shadow-lg shadow-red-900/30 whitespace-nowrap">
                Schedule Session
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
              </button>
            </Link>

            <Link to="/gallery" className="flex-shrink-0">
              <button className="flex items-center gap-1.5 sm:gap-2 border border-white/30 hover:border-white/70 bg-white/5 hover:bg-white/12 backdrop-blur-sm text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-inter font-bold tracking-widest uppercase text-[10px] sm:text-[11px] transition-all duration-300 hover:scale-105 whitespace-nowrap">
                Explore Gallery
              </button>
            </Link>
          </div>

        </div>
      </div>

      {/* ── Prev / Next ── */}
      <button onClick={prev} aria-label="Previous"
        className="nav-arrow absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full text-white">
        <ChevronLeft size={18} />
      </button>
      <button onClick={next} aria-label="Next"
        className="nav-arrow absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full text-white">
        <ChevronRight size={18} />
      </button>

      {/* ── Dots ── */}
      <div className="absolute bottom-14 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            aria-label={`Slide ${i + 1}`}
            className={`transition-all duration-400 rounded-full ${
              i === current ? 'w-7 sm:w-9 h-1.5 bg-red-500' : 'w-1.5 h-1.5 bg-white/35 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* ── Counter ── */}
      <div className="absolute bottom-14 sm:bottom-16 md:bottom-20 right-4 sm:right-7 z-20 font-inter text-[10px] sm:text-xs tracking-widest flex items-center gap-1">
        <span className="text-white/80 font-semibold">{String(current + 1).padStart(2, '0')}</span>
        <span className="text-white/30">/</span>
        <span className="text-white/40">{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
        <span className="font-inter text-white/40 text-[9px] tracking-[0.25em] uppercase">Scroll</span>
        <div className="scroll-bounce w-px h-5 sm:h-7 bg-gradient-to-b from-red-600/80 to-transparent" />
      </div>

      {/* ── Bottom line ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-700/60 to-transparent z-20" />
    </div>
  );
};

export default Banner;