import React, { useEffect, useState } from 'react';
import { Camera, Calendar, Star, ArrowRight } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Link } from "react-router-dom";

const CTA = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(entry.target); } },
      { threshold: 0.2 }
    );
    const el = document.getElementById('cta-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const contentSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    delay: 150,
    config: { tension: 280, friction: 22 },
  });

  const features = [
    'Professional equipment & expertise',
    'Customized photoshoot packages',
    'Fast delivery with digital edits',
  ];

  return (
    <section id="cta-section" className="py-12 sm:py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-red-100 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-red-50 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">

          {/* Background Image */}
          <img
            src="/cta-img.jpg"
            alt="Professional photoshoot"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20"></div>

          {/* Red top accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600 z-10"></div>

          {/* Content */}
          <animated.div
            style={contentSpring}
            className="relative z-10 flex flex-col justify-center px-6 sm:px-10 md:px-14 py-10 sm:py-14 max-w-2xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1.5 rounded-full mb-5 w-fit">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-white text-xs font-semibold tracking-wide uppercase">Limited Time Offer</span>
            </div>

            {/* Heading */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Book Your{' '}
              <span className="text-red-400">Dream Session</span>
            </h2>

            {/* Subtext */}
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
              Create stunning memories that last a lifetime. Book today and receive a complimentary 10" × 8" print.
            </p>

            {/* Features */}
            <div className="space-y-2.5 mb-8">
              {features.map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <Star className="w-2.5 h-2.5 text-white fill-white" />
                  </div>
                  <span className="text-white/80 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl active:scale-95 transition-all duration-200 shadow-lg shadow-red-900/40 w-full sm:w-auto">
                  <Calendar className="w-4 h-4" />
                  Book Session
                </button>
              </Link>
              <Link to="/portfolio">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white font-semibold text-sm rounded-xl active:scale-95 transition-all duration-200 w-full sm:w-auto">
                  View Portfolio
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </animated.div>

          {/* Floating camera badge */}
          <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-2 rounded-full">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <span className="text-white text-xs font-semibold hidden sm:block">Kanchan Studio</span>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>
    </section>
  );
};

export default CTA;