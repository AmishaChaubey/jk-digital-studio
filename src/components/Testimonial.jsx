import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    { name: "Radhika Singh", role: "Bride", text: "The team captured our wedding perfectly! Every moment was beautifully documented with such care and artistry.", rating: 5 },
    { name: "Sushma Shree", role: "Business Owner", text: "Professional product photography that increased our sales by 40%. Highly recommended for any business!", rating: 5 },
    { name: "Adhya Singh", role: "Model", text: "Creative and talented photographers who know how to bring out the best in their subjects. Loved every shot.", rating: 5 },
    { name: "Deepak Kumar", role: "Father", text: "Our family photos turned out amazing. They made everyone feel comfortable and completely natural.", rating: 5 },
    { name: "Jaya Shah", role: "Event Planner", text: "Working with this team was an absolute pleasure. They delivered well beyond our expectations!", rating: 5 },
    { name: "Suraj Kumar", role: "Actor", text: "Their headshots are incredible. They have a unique ability to capture personality in every frame.", rating: 5 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, currentIndex]);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setAnimating(false);
    }, 300);
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  const getVisibleTestimonials = () =>
    [0, 1, 2].map((i) => testimonials[(currentIndex + i) % testimonials.length]);

  const TestimonialCard = ({ t, featured = false }) => (
    <div
      className={`relative bg-white border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 overflow-hidden group
        ${featured
          ? 'border-red-200 shadow-xl shadow-red-100 ring-1 ring-red-100'
          : 'border-gray-100 shadow-md hover:shadow-xl hover:shadow-red-50 hover:border-red-100'
        }`}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-red-600 transition-transform duration-500 origin-left
        ${featured ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
      ></div>

      {/* Quote icon */}
      <div className="mb-5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300
          ${featured ? 'bg-red-600' : 'bg-red-50 group-hover:bg-red-600'}`}>
          <Quote className={`w-5 h-5 transition-colors duration-300
            ${featured ? 'text-white' : 'text-red-600 group-hover:text-white'}`} />
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-red-600 fill-red-600" />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-1 mb-6">
        "{t.text}"
      </p>

      {/* Divider */}
      <div className="border-t border-gray-100 pt-5 flex items-center gap-4">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors duration-300
          ${featured ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 group-hover:bg-red-600 group-hover:text-white'}`}>
          {getInitials(t.name)}
        </div>
        <div>
          <h4 className="text-gray-900 font-bold text-sm sm:text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t.name}
          </h4>
          <p className="text-red-600 text-xs font-medium">{t.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="py-16 sm:py-20 bg-white relative overflow-hidden"
      id="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Subtle bg blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-80 h-80 bg-red-100 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-red-50 rounded-full opacity-25 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div
          className="text-center mb-12 sm:mb-16 transition-all duration-700"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">Testimonials</p>
            <div className="w-8 h-0.5 bg-red-600"></div>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Client{' '}
            <span className="text-red-600" style={{ fontFamily: "'Playfair Display', serif" }}>
              Stories
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Discover why clients trust us to capture their most precious moments
          </p>
        </div>

        {/* Mobile — single card */}
        <div
          className="md:hidden mb-10 transition-all duration-300"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)' }}
        >
          <TestimonialCard t={testimonials[currentIndex]} featured={true} />
        </div>

        {/* Desktop — 3 cards */}
        <div
          className="hidden md:grid grid-cols-3 gap-6 mb-12 transition-all duration-300"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(10px)' : 'translateY(0)' }}
        >
          {getVisibleTestimonials().map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} featured={i === 1} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center gap-6">
          {/* Arrows + dots row */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-gray-200 hover:border-red-600 hover:bg-red-600 text-gray-500 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-red-600 w-6 h-2'
                      : 'bg-gray-200 hover:bg-red-300 w-2 h-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-gray-200 hover:border-red-600 hover:bg-red-600 text-gray-500 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-0.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
            ></div>
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

export default Testimonials;