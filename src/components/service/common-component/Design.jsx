import React, { useState, useEffect } from 'react';

const GalleryCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const getSizeClass = () => {
    switch (item.size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-2';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  const handleImageClick = () => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div
        className={`gallery-card relative rounded-2xl overflow-hidden cursor-pointer group ${getSizeClass()} shadow-lg hover:shadow-2xl transition-shadow duration-500`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleImageClick}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Elegant Border Lines */}
        <span className="absolute left-0 top-0 w-0 h-[3px] bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 group-hover:w-full transition-all duration-700 z-30"></span>
        <span className="absolute right-0 bottom-0 w-0 h-[3px] bg-gradient-to-l from-gray-300 via-gray-400 to-gray-300 group-hover:w-full transition-all duration-700 z-30"></span>
        <span className="absolute right-0 top-0 h-0 w-[3px] bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 group-hover:h-full transition-all duration-700 z-30"></span>
        <span className="absolute left-0 bottom-0 h-0 w-[3px] bg-gradient-to-t from-gray-300 via-gray-400 to-gray-300 group-hover:h-full transition-all duration-700 z-30"></span>

        {/* Corners */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gray-500/0 group-hover:border-gray-300/80 transition-all duration-500 z-20"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gray-500/0 group-hover:border-gray-300/80 transition-all duration-500 z-20"></div>

        {/* Soft Shimmer */}
        {isHovered && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
            <div className="soft-shimmer-once"></div>
          </div>
        )}

        {/* Image with increased mobile height */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-80 sm:h-96 md:h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
        />

        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Content */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="font-serif text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 tracking-wide font-light">{item.title}</h3>
          <span className="inline-block bg-white/50 backdrop-blur-lg text-black px-3 sm:px-4 py-0.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-widest shadow-lg">
            {item.category}
          </span>
        </div>

        <style jsx>{`
          .gallery-card {
            animation: slideUp 0.6s ease-out both;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .soft-shimmer-once {
            position: absolute;
            top: -100%;
            left: -100%;
            width: 300%;
            height: 300%;
            background: linear-gradient(
              120deg,
              transparent 0%,
              transparent 40%,
              rgba(255, 255, 255, 0.2) 48%,
              transparent 60%,
              transparent 100%
            );
            animation: softShimmerOnce 1.2s ease-out forwards;
          }

          @keyframes softShimmerOnce {
            0% {
              transform: translate(-50%, -50%) rotate(30deg);
            }
            100% {
              transform: translate(50%, 50%) rotate(30deg);
            }
          }
        `}</style>
      </div>

      {/* Modal for enlarged image - Fully Responsive */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4 md:p-6 animate-fadeIn"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] animate-scaleIn">
            {/* Close button - Responsive */}
            <button
              className="absolute -top-8 sm:-top-10 md:-top-12 right-0 text-white text-3xl sm:text-4xl md:text-5xl font-light hover:text-gray-300 transition-colors duration-300 z-10"
              onClick={closeModal}
            >
              ×
            </button>
            
            {/* Enlarged image - Responsive */}
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-h-[70vh] sm:max-h-[75vh] md:max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image info - Fully Responsive */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 sm:p-4 md:p-6 rounded-b-lg">
              <h3 className="text-white font-serif text-base sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-2 tracking-wide font-light leading-tight">
                {selectedImage.title}
              </h3>
              <span className="inline-block bg-white/50 backdrop-blur-lg text-black px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wide sm:tracking-widest">
                {selectedImage.category}
              </span>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes scaleIn {
              from {
                opacity: 0;
                transform: scale(0.9);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }

            .animate-scaleIn {
              animation: scaleIn 0.4s ease-out;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default GalleryCard;