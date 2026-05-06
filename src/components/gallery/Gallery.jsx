import React, { useState, useEffect } from "react";
import { X, Camera, Grid3X3, ArrowLeft } from "lucide-react";

const PhotoStudioWebsite = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryImages, setCategoryImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const categories = [
    { id: "wedding", title: "Wedding Photography", coverImage: "/wedding/w1.jpg", count: "Premium" },
    { id: "prewedding", title: "Pre-Wedding Photography", coverImage: "pre/p1.jpg", count: "Romantic" },
    { id: "portrait", title: "Portrait Studio", coverImage: "pot-img/port8.jpg", count: "Artistic" },
    { id: "babyshoot", title: "Baby Shoot", coverImage: "/baby-img/baby3.jpg", count: "Adorable" },
    { id: "birthday", title: "Birthday Photography", coverImage: "/birthday-img/birthday10.jfif", count: "Joyful" },
    { id: "maternity", title: "Maternity Shoot", coverImage: "/maternity-img/maternity2.jpeg", count: "Beautiful" },
    { id: "event", title: "Event Photography", coverImage: "/even/live1.jfif", count: "Professional" },
    { id: "model", title: "Model Shoot", coverImage: "/model/md19.jpg", count: "Editorial" },
  ];

  useEffect(() => window.scrollTo(0, 0), []);

  const handleCategoryClick = (serviceKey) => {
    setSelectedCategory(serviceKey);
    setLoadingImages(true);
    setCategoryImages([]);

    fetch(`http://localhost:5000/api/photos/gallery/${serviceKey}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryImages(data);
        setLoadingImages(false);
      })
      .catch((err) => {
        console.error("Error fetching images:", err);
        setLoadingImages(false);
      });
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setCategoryImages([]);
    setLightboxImg(null);
  };

  const selectedCategoryData = categories.find(
    (c) => c.id === selectedCategory,
  );

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmerSlide {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-zoom { animation: zoom 16s ease-in-out infinite; }
        .animate-fade-up { animation: fadeUp 0.7s ease forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease forwards; }

        .card-shine::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.10) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
          border-radius: inherit;
        }
        .card-shine:hover::after {
          opacity: 1;
          animation: shimmerSlide 1.4s linear infinite;
        }

        .scrollbar-light::-webkit-scrollbar { width: 6px; }
        .scrollbar-light::-webkit-scrollbar-track { background: #f3f4f6; }
        .scrollbar-light::-webkit-scrollbar-thumb { background: #991b1b; border-radius: 4px; }

        .photo-grid { columns: 1; column-gap: 1rem; }
        @media (min-width: 640px) { .photo-grid { columns: 2; } }
        @media (min-width: 1024px) { .photo-grid { columns: 3; } }
        .photo-grid-item { break-inside: avoid; margin-bottom: 1rem; }
      `}</style>

      {/* ── Banner ── */}
      <section className="relative min-h-screen sm:h-[72vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/banner/gallery-banner.jpg"
          alt="Photo Studio Banner"
          className="absolute inset-0 w-full h-full object-cover animate-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white/50" />
        <div className="relative z-10 px-4 sm:px-8 animate-fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <p className="text-red-400 text-xs font-bold mt-0 uppercase tracking-[0.2em]">
              Photo Gallery
            </p>
            <div className="w-8 h-0.5 bg-red-600"></div>
          </div>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white leading-tight drop-shadow-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
           Turning Instants Into Expressions
            
          </h1>
          <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed drop-shadow">
            Capturing life's precious moments with artistry and passion
          </p>
        </div>
      </section>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <Grid3X3 size={18} className="text-red-800" />
          <h2
            className="text-gray-900 text-2xl sm:text-3xl font-bold"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Our Collections
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-red-200 to-transparent ml-2" />
        </div>

        {/* ── Category Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((category, i) => (
            <div
              key={category.id}
              className="card-shine group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/15 shadow-md shadow-gray-200 border border-gray-100"
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="aspect-[3/4] relative rounded-2xl overflow-hidden">
                <img
                  src={category.coverImage}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-all duration-500 group-hover:from-black/85" />

                {/* Tag */}
                <div className="absolute top-3 right-3 bg-red-800/90 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full shadow">
                  {category.count}
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    className="text-white text-lg font-bold leading-snug mb-1 drop-shadow"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {category.title}
                  </h3>
                  <p className="text-gray-300 text-xs flex items-center gap-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Camera size={11} /> View gallery
                  </p>
                </div>

                {/* Hover ring */}
                <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-red-700/40 transition-all duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── Gallery Modal ── */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto scrollbar-light animate-fade-in">
          <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8 sticky top-4 z-10 bg-white/95 backdrop-blur-sm py-3 px-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={closeModal}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-gray-800 text-sm transition-colors group"
                  >
                    <ArrowLeft
                      size={15}
                      className="group-hover:-translate-x-0.5 transition-transform"
                    />
                    Back
                  </button>
                  <div className="w-px h-5 bg-gray-200" />
                  <h2
                    className="text-gray-900 text-lg sm:text-2xl font-bold"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {selectedCategoryData?.title}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-red-800 hover:bg-red-700 text-white p-2.5 rounded-full transition-all hover:scale-110 shadow"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Loading */}
              {loadingImages && (
                <div className="text-center py-28">
                  <div className="inline-flex gap-1.5 mb-3">
                    {[0, 0.15, 0.3].map((d, i) => (
                      <span
                        key={i}
                        className="w-2.5 h-2.5 bg-red-800 rounded-full animate-bounce"
                        style={{ animationDelay: `${d}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">Loading images...</p>
                </div>
              )}

              {/* Empty */}
              {!loadingImages && categoryImages.length === 0 && (
                <div className="text-center py-28">
                  <Camera size={40} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-400 text-lg">
                    No photos in this category yet
                  </p>
                </div>
              )}

              {/* Masonry Grid */}
              {!loadingImages && categoryImages.length > 0 && (
                <div className="photo-grid">
                  {categoryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="photo-grid-item group relative overflow-hidden rounded-xl cursor-zoom-in shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                      onClick={() => setLightboxImg(img)}
                    >
                      <img
                        src={`http://localhost:5000${img.imageUrl}`}
                        alt={img.title}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 rounded-xl" />
                      {img.title && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/65 to-transparent opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          <p className="text-white text-xs font-medium">
                            {img.title}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-all"
            onClick={() => setLightboxImg(null)}
          >
            <X size={20} />
          </button>
          <img
            src={`http://localhost:5000${lightboxImg.imageUrl}`}
            alt={lightboxImg.title}
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          {lightboxImg.title && (
            <p className="absolute bottom-6 text-gray-400 text-sm">
              {lightboxImg.title}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoStudioWebsite;
