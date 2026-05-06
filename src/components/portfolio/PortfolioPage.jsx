import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PortfolioPage = () => {
  // Portfolio data
  const portfolioItems = [
    {
      id: 1,
      title: "Wedding Photography",
      description: "Capturing beautiful moments of love and celebration",
      imageUrl: "/wedd-img/wedding3.jfif",
    },
    {
      id: 2,
      title: "Portrait Sessions",
      description: "Professional portraits that capture your unique personality",
      imageUrl: "/pot-img/port5.jpg",
    },
    {
      id: 3,
      title: "Product Photography",
      description: "High-end product showcase for luxury brand",
      imageUrl: "/product-img.jpeg",
    },
    {
      id: 4,
      title: " Wedding Event Photography" ,
      description: "Annual gala with celebrity guests",
      imageUrl: "/event-img/wedd-event2.jfif",
    },
    {
      id: 5,
      title: "Baby Photography",
      description: "Culinary artistry and ambiance captured",
      imageUrl: "/baby-img/baby4.jpg",
    },
    {
      id: 6,
      title: "Candid Photography",
      description: "Creative and conceptual photography works",
      imageUrl: "/candid-img/candid1.jfif",
    },
  ];

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ Banner Section with black gradient overlay */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src="/banner/portfolio-banner.jpg"
          alt="Photography Studio Banner"
          className="w-full h-full object-cover transform scale-105 animate-zoom"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/1500x600?text=Portfolio+Banner";
          }}
        />
        {/* Black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
           Where Passion Meets Photography
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Capturing life's beautiful moments through our lens
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="container px-4 py-16">
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 group z-0"
            >
              {/* Glowing Border Animation */}
              <span className="absolute top-0 left-0 w-0 h-[2px] bg-amber-700 shadow-[0_0_10px_#b45309,0_0_20px_#b45309] group-hover:w-full transition-all duration-500 z-20"></span>
              <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-amber-700 shadow-[0_0_10px_#b45309,0_0_20px_#b45309] group-hover:w-full transition-all duration-500 delay-150 z-20"></span>
              <span className="absolute top-0 right-0 h-0 w-[2px] bg-amber-700 shadow-[0_0_10px_#b45309,0_0_20px_#b45309] group-hover:h-full transition-all duration-500 delay-300 z-20"></span>
              <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-amber-700 shadow-[0_0_10px_#b45309,0_0_20px_#b45309] group-hover:h-full transition-all duration-500 delay-450 z-20"></span>

              <div className="h-100 overflow-hidden relative z-10">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(
                      item.title
                    )}`;
                  }}
                />
              </div>
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <Link to="/gallery" className="inline-block">
                  <button className="px-4 py-2 bg-red-900 text-white rounded-md hover:bg-red-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50">
                    View Gallery
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-red-900 text-white rounded-full shadow-lg z-50 transition-opacity duration-300 hover:bg-red-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes zoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-zoom {
          animation: zoom 15s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default PortfolioPage;
