import React, { useState } from "react";
import { Camera, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MarqueePhotoGallery() {
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    { url: "/wedding/w2.jpg", alt: "Wedding photoshoot", category: "Wedding", link: "/services/wedding-photography" },
    { url: "/pre/p6.jpg", alt: "Pre-Wedding shoot", category: "Pre-Wedding", link: "/services/prewedding-shoot" },
    { url: "/pot-img/port2.jpg", alt: "Portrait photography", category: "Portrait", link: "/services/portrait-shoot" },
    { url: "/event-img/wedd-event4.jfif", alt: "Event Photography", category: "Event", link: "/services/event-photography" },
    { url: "/product-img/pro3.jfif", alt: "Product photography", category: "Product", link: "/services/product-photography" },
    { url: "/indoor-img/indoor11.jpg", alt: "Indoor photoshoot", category: "Indoor", link: "/services/indoor-shoot" },
    { url: "/out-img/out1.jpeg", alt: "Outdoor photoshoot", category: "Outdoor", link: "/services/outdoor-photography" },
    { url: "/birthday-img/birthday10.jfif", alt: "Birthday photoshoot", category: "Birthday", link: "/services/birthday" },
    { url: "/baby-img/baby9.jpg", alt: "Baby Photoshoot", category: "Baby Shoot", link: "/services/baby-shoot" },
    { url: "/printout-img/printout4.jpg", alt: "Photo Printout", category: "Printing", link: "/services/photo-printing" },
  ];

  const row = [...images, ...images];

  return (
    <section className="py-16 sm:py-20 bg-white overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-red-100 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-24 w-80 h-80 bg-red-50 rounded-full opacity-25 blur-3xl"></div>
      </div>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-10 sm:mb-14 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-red-600"></div>
          <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">Our Work</p>
          <div className="w-8 h-0.5 bg-red-600"></div>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Photoshoot{" "}
          <span className="text-red-600">Moments</span>
        </h2>
        <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Every frame tells a <span className="text-red-600 font-semibold">beautiful story</span>
        </p>
      </div>

      {/* Single Marquee Row */}
      <div
        className="overflow-hidden relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-4"
          style={{
            width: 'max-content',
            animation: 'marquee-ltr 35s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {row.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden border border-gray-100 hover:border-red-200 shadow-md hover:shadow-xl hover:shadow-red-100 transition-all duration-500 group cursor-pointer"
              style={{ height: '22rem' }}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Category pill */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold rounded-full">
                  {image.category}
                </span>
              </div>

              {/* Camera icon */}
              <div className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <Camera className="w-4 h-4 text-white" />
              </div>

              {/* Default title */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-4 group-hover:translate-y-full transition-transform duration-500">
                <h3 className="text-white font-bold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {image.alt}
                </h3>
              </div>

              {/* Hover panel */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-4 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-2.5 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-2">
                  {image.category}
                </span>
                <h3 className="text-gray-900 font-bold text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {image.alt}
                </h3>
                <Link to={image.link}>
                  <div className="flex items-center gap-1 text-red-600 text-sm font-semibold mt-1.5 group/arrow">
                    <span>View More</span>
                    <ArrowRight className="w-4 h-4 group-hover/arrow:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10 relative z-10">
        <Link to="/gallery">
          <button className="px-9 py-3.5 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 active:scale-95 transition-all duration-200 shadow-lg shadow-red-200 tracking-wide">
            View Full Gallery
          </button>
        </Link>
        <p className="mt-2.5 text-gray-400 text-xs">100+ photos across all categories</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }

        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}