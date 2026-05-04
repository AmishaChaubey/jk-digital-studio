import React from 'react';
import { Camera, Award, Users, Clock, Aperture } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, useSprings } from '@react-spring/web';
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    config: { tension: 280, friction: 22 },
  });

  const features = [
    { icon: Camera, title: 'Pro Equipment', description: 'Latest cameras & lighting for flawless shots.', stat: '50K+ Photos' },
    { icon: Award, title: 'Award-Winning', description: 'Recognized by industry leaders worldwide.', stat: '15+ Awards' },
    { icon: Users, title: 'Happy Clients', description: 'Thousands of families trust us with their memories.', stat: '98% Rating' },
    { icon: Clock, title: 'Fast Delivery', description: 'Edited photos delivered within 3–5 days.', stat: '3–5 Days' },
  ];

  const cardSprings = useSprings(
    features.length,
    features.map((_, i) => ({
      from: { opacity: 0, transform: 'translateY(30px)' },
      to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0px)' : 'translateY(30px)' },
      delay: 300 + i * 100,
      config: { tension: 260, friction: 22 },
    }))
  );

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-white relative overflow-hidden" id="why-choose-us">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-red-100 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-red-50 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <animated.div style={titleSpring} className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">Our Edge</p>
            <div className="w-8 h-0.5 bg-red-600"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why <span className="text-red-600">Choose Us</span>
          </h2>
        </animated.div>

        {/* Main layout: image left, cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* Left — featured image */}
          <animated.div
            style={titleSpring}
            className="relative rounded-2xl overflow-hidden group min-h-[320px] sm:min-h-[400px]"
          >
            <img
              src="/wedd-ci/wedd-cin7.jfif"
              alt="Professional Photography"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-8">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                <Aperture className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Professional Studio Experience
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-sm">
                State-of-the-art equipment ensuring every shot is picture-perfect.
              </p>
              <div className="flex flex-wrap gap-2">
                {['50K+ Photos', '10+ Years', '98% Satisfaction'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </animated.div>

          {/* Right — 2x2 feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <animated.div
                  key={index}
                  style={cardSprings[index]}
                  className="group relative bg-white border border-gray-100 hover:border-red-200 rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-100 flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl"></div>

                  <div>
                    <div className="w-11 h-11 bg-red-50 group-hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 mb-4">
                      <Icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-gray-900 font-bold text-base mb-1 group-hover:text-red-600 transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
                  </div>

                  <div className="mt-4">
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      {feature.stat}
                    </span>
                  </div>
                </animated.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link to="/contact">
            <button className="px-9 py-3.5 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 active:scale-95 transition-all duration-200 shadow-lg shadow-red-200 tracking-wide">
              Book Your Session Today
            </button>
          </Link>
          <p className="mt-2.5 text-gray-400 text-xs">No commitment required · Free consultation</p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;