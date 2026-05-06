import React from "react";
import { Camera, Sparkles, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  window.scrollTo(0, 0);
  return (
    <section className="py-20 bg-white relative overflow-hidden" id="about">
      {/* Subtle decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-16 w-72 h-72 bg-red-100 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-16 w-72 h-72 bg-red-50 rounded-full opacity-40 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image - shown first on mobile */}
          <div className="relative order-1 md:order-2 animate-fade-in-right">
            {/* Decorative border frame */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-red-600 rounded-3xl z-0 hidden sm:block"></div>
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://i.pinimg.com/736x/98/69/ba/9869ba7113b34cb7844acf0c30f9f0e4.jpg"
                alt="Kanchan Studio"
                className="w-full h-72 sm:h-96 md:h-[28rem] lg:h-[34rem] object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 leading-none mb-0.5">
                    Experience
                  </p>
                  <p className="text-sm font-bold text-gray-900 leading-none">
                    10+ Years
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-2 md:order-1 space-y-7 animate-fade-in">
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-red-600"></div>
              <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">
                Welcome
              </p>
            </div>

            {/* Heading */}
            <div>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                JK Digital Photo
                <span className="block text-red-600">Studio</span>
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                {/* Life is a collection of fleeting moments — a laugh shared, a glance exchanged, a tear shed, a promise made. At JK Digital Photo Studio, we don’t just capture images — we capture emotions, memories, and stories that last forever.

              We specialize in wedding photography, pre-wedding shoots, newborn baby photography, corporate events, and professional photoshoots. From the first heartbeat of a newborn to the joy of weddings and special occasions, our experienced photographers turn your precious moments into timeless art. */}
                Life is a collection of beautiful moments — a laugh, a glance, a
                promise. At JK Digital Photo Studio, we capture emotions,
                memories, and stories that last forever. We offer professional
                wedding, pre-wedding, baby, and event photography in Noida,
                delivering high-quality and creative services.
              </p>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                
                Book your session today and let us transform your memories into
                lasting masterpieces.
              </p>
            </div>

            {/* Divider */}
            <div className="w-12 h-0.5 bg-red-600 rounded-full"></div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Camera,
                  title: "Pro Equipment",
                  desc: "Latest tech & tools",
                },
                {
                  icon: Award,
                  title: "Expert Team",
                  desc: "Seasoned professionals",
                },
                {
                  icon: Sparkles,
                  title: "Creative Vision",
                  desc: "Unique perspectives",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group flex flex-col items-start gap-2 p-4 rounded-2xl border border-gray-100 hover:border-red-100 hover:bg-red-50 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-red-100 group-hover:bg-red-600 rounded-xl flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-semibold text-sm">
                      {title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pt-2">
              <Link to="/contact">
                <button className="w-full sm:w-auto px-8 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 active:scale-95 transition-all duration-200 shadow-lg shadow-red-200 text-sm tracking-wide">
                  Book Your Session
                </button>
              </Link>
              <Link to="/gallery">
                <button className="w-full sm:w-auto px-8 py-3 border border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 active:scale-95 transition-all duration-200 text-sm tracking-wide">
                  View Gallery
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        * { font-family: 'Inter', sans-serif; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(32px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out both; }
        .animate-fade-in-right { animation: fadeInRight 0.8s ease-out both; }
      `}</style>
    </section>
  );
};

export default Welcome;
