import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Wedding Photography",
      description: "Heartwarming family moments during the mehndi ceremony",
      image: "/wedding/wc8.jpg",
      link: "/services/wedding-photography",
      tag: "Most Popular",
    },
    {
      id: 2,
      title: "Haldi Photography",
      description: "Sun-kissed haldi festivities bursting with color and smiles",
      image: "/wedding/w18.jpg",
      link: "/services/wedding-photography",
      tag: null,
    },
    {
      id: 3,
      title: "Mehndi Photography",
      description: "Capture your special day with timeless elegance and emotion",
      image: "/wedding/w14.jpg",
      link: "/services/wedding-photography",
      tag: null,
    },
    {
      id: 4,
      title: "Portrait Sessions",
      description: "Professional portraits that showcase your unique personality",
      image: "/pot-img/port14.jfif",
      link: "/services/portrait-shoot",
      tag: null,
    },
    {
      id: 5,
      title: "Event Photography",
      description: "Preserve precious moments with your loved ones forever",
      image: "/even/live10.jfif",
      link: "/services/event-photography",
      tag: null,
    },
    {
      id: 6,
      title: "Indoor Photography",
      description: "From cozy corners to grand halls — every shot matters.",
      image: "/indoor-img/md1.jpg",
      link: "/services/indoor-shoot",
      tag: null,
    },
    {
      id: 7,
      title: "Outdoor Photography",
      description: "Where nature becomes your backdrop and magic unfolds.",
      image: "/out-img/ot2.jpeg",
      link: "/services/outdoor-photography",
      tag: null,
    },
    {
      id: 8,
      title: "Prewedding Shoot",
      description: "Romantic frames before the big day — love in every click.",
      image: "/pre/p4.jpg",
      link: "/services/prewedding-shoot",
      tag: "Trending",
    },

    {
      id: 10,
      title: "Product Photography",
      description: "Stunning visuals that make your products shine and sell",
      image: "/produ/pro42.jpg",
      link: "/services/product-photography",
      tag: null,
    },


  ];

  const [current, setCurrent] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const cardWidth = scrollContainer.children[0]?.clientWidth + 16;
    const interval = setInterval(() => {
      let nextIndex = current + 1;
      if (nextIndex >= services.length) nextIndex = 0;
      scrollContainer.scrollTo({ left: nextIndex * cardWidth, behavior: "smooth" });
      setCurrent(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [current, services.length]);

  const handleScroll = (e) => {
    const cardWidth = e.target.children[0]?.clientWidth + 16;
    const index = Math.round(e.target.scrollLeft / cardWidth);
    setCurrent(index);
  };

  const renderCard = (service, key) => (
    <div
      key={key}
      className="flex-shrink-0 w-64 sm:w-72 mx-2"
    >
      <Link to={service.link}>
        <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-red-100 transition-all duration-500 cursor-pointer border border-gray-100 hover:border-red-200">

          {/* Image */}
          <div className="relative overflow-hidden h-80 sm:h-96">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient overlay always visible at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Top accent bar on hover */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

            {/* Tag badge */}
            {service.tag && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                {service.tag}
              </div>
            )}

            {/* Default title at bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 translate-y-0 group-hover:translate-y-full transition-transform duration-500">
              <h3
                className="text-white font-bold text-lg leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {service.title}
              </h3>
            </div>

            {/* Hover overlay panel */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-5 py-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col gap-2">
              <h3
                className="text-gray-900 font-bold text-lg leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              <div className="flex items-center gap-1 text-red-600 text-sm font-semibold mt-1 group/link">
                <span>View More</span>
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <section className="bg-white py-16 sm:py-20 relative overflow-hidden">
      {/* Subtle bg blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-red-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-24 w-80 h-80 bg-red-50 rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-0.5 bg-red-600"></div>
          <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">What We Offer</p>
          <div className="w-8 h-0.5 bg-red-600"></div>
        </div>
        <h2
          className="text-4xl sm:text-5xl font-bold text-gray-900"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our{" "}
          <span className="text-red-600" style={{ fontFamily: "'Playfair Display', serif" }}>
            Services
          </span>
        </h2>
        <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          A wide range of photography services tailored to your needs
        </p>
      </div>

      {/* Desktop Marquee */}
      <div className="hidden md:block overflow-hidden relative z-10">
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {services.map((s) => renderCard(s, `a-${s.id}`))}
            {services.map((s) => renderCard(s, `b-${s.id}`))}
          </div>
        </div>
      </div>

      {/* Mobile Auto-Slide */}
      <div
        className="md:hidden overflow-x-auto no-scrollbar flex px-4 gap-4 snap-x snap-mandatory relative z-10"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {services.map((s) => (
          <div key={s.id} className="snap-center flex-shrink-0">
            {renderCard(s, `m-${s.id}`)}
          </div>
        ))}
      </div>

      {/* Mobile Dots */}
      <div className="md:hidden flex justify-center mt-5 gap-1.5">
        {services.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              current === i
                ? "w-6 h-2 bg-red-600"
                : "w-2 h-2 bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }

        .marquee-wrapper { overflow: hidden; }
        .marquee-content {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .marquee-content:hover { animation-play-state: paused; }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ServicesSection;