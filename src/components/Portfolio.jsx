import React, { useState } from "react";
import { X, ArrowRight, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Work" },
    { id: "wedding", name: "Weddings" },
    { id: "portrait", name: "Portraits" },
    { id: "events", name: "Events" },
  ];
  const portfolio = [
    {
      id: 1,
      category: "wedding",
      title: "Wedding Photoshoot",
      description:
        "Full wedding coverage capturing rituals, emotions, and candid moments",
      image: "/wedding/w2.jpg",
      link: "/services/wedding-photography",
    },
    {
      id: 2,
      category: "pre-wedding",
      title: "Pre-Wedding Shoot",
      description:
        "Romantic and cinematic pre-wedding shoots at beautiful locations",
      image: "/pre/p2.jpg",
      link: "/services/prewedding-shoot",
    },
 
    {
      id: 4,
      category: "model",
      title: "Model Portfolio Shoot",
      description:
        "Professional model portfolio photography for fashion and branding",
      image: "/model/md21.jpg",
      link: "/services/model-shoot",
    },
       {
      id: 3,
      category: "baby",
      title: "Baby Photography",
      description:
        "Cute and creative baby shoots capturing precious early moments",
      image: "/baby-img/baby29.jpg",
      link: "/services/baby-shoot",
    },
    {
      id: 5,
      category: "outdoor",
      title: "Outdoor Shoot",
      description: "Natural light outdoor photography at scenic locations",
      image: "/out-img/ot2.jpeg",
      link: "/services/outdoor-photography",
    },
    {
      id: 6,
      category: "indoorshoot",
      title: "Indoor Studio Shoot",
      description:
        "Studio-based indoor photography with controlled lighting setup",
      image: "/model/md16.jpg",
      link: "/services/indoor-shoot",
    },
    {
      id: 7,
      category: "Maternity",
      title: "Maternity Shoot",
      description: "Elegant maternity photography celebrating motherhood",
      image: "/maternity-img/maternity2.jpeg",
      link: "/services/maternity-shoot",
    },
    {
      id: 8,
      category: "product",
      title: "Product Photography",
      description: "High-quality product shoots for eCommerce and branding",
      image: "/produ/pro5.jpg",
      link: "/services/product-photography",
    },
  ];

  const filteredPortfolio =
    selectedCategory === "all"
      ? portfolio
      : portfolio.filter((item) => item.category === selectedCategory);

  const getGridClass = (index, total) => {
    if (total === 1) return "col-span-2 row-span-2";
    if (total === 2) return "col-span-2 sm:col-span-1 row-span-1";
    const patterns = [
      "col-span-2 sm:col-span-2 row-span-2",
      "col-span-2 sm:col-span-1 row-span-1",
      "col-span-2 sm:col-span-1 row-span-1",
      "col-span-2 sm:col-span-2 row-span-1",
      "col-span-2 sm:col-span-1 row-span-1",
      "col-span-2 sm:col-span-1 row-span-1",
    ];
    return patterns[index] || "col-span-2 sm:col-span-1 row-span-1";
  };

  return (
    <section
      className="py-16 sm:py-20 bg-white relative overflow-hidden"
      id="portfolio"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-80 h-80 bg-red-100 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-red-50 rounded-full opacity-25 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">
              Our Portfolio
            </p>
            <div className="w-8 h-0.5 bg-red-600"></div>
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our <span className="text-red-600">Portfolio</span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Explore our diverse collection of visual stories, each frame crafted
            with precision and passion.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-200"
                  : "bg-gray-50 text-gray-500 border border-gray-100 hover:border-red-200 hover:text-red-600 hover:bg-red-50"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[240px] sm:auto-rows-[280px]">
          {filteredPortfolio.map((item, index) => (
            <Link
              to={item.link}
              key={`${item.id}-${index}`}
              className={`${getGridClass(index, filteredPortfolio.length)} group relative overflow-hidden rounded-2xl cursor-pointer border border-gray-100 hover:border-red-200 shadow-md hover:shadow-2xl hover:shadow-red-100 transition-all duration-500 block`}
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

              {/* Top accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Zoom icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                <ZoomIn className="w-3.5 h-3.5 text-white" />
              </div>

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm border border-white/25 text-white text-xs font-semibold rounded-full capitalize">
                  {item.category}
                </span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-6 h-0.5 bg-red-600 mb-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <h3
                  className="text-white font-bold text-base sm:text-lg leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <p className="text-white/70 text-xs line-clamp-1">
                    {item.description}
                  </p>
                  <ArrowRight className="w-3 h-3 text-red-400 flex-shrink-0 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/portfolio">
            <button className="inline-flex items-center gap-2 px-9 py-3.5 bg-red-600 text-white rounded-xl font-semibold text-sm hover:bg-red-700 active:scale-95 transition-all duration-200 shadow-lg shadow-red-200 tracking-wide group">
              View Full Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
          <p className="mt-2.5 text-gray-400 text-xs">
            Hundreds of moments captured across all categories
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;