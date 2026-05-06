import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PhotoStudioGallery() {
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      id: 1,
      name: "Wedding Photography",
      description: "Capturing your special moments with elegance",
      region: "Premium Package",
      link: "/services/wedding-photography",
      image: "wedding/w3.jpg",
      hoverImage: "wedding/w2.jpg",
      imageCount: 11
    },
       {
      id: 2,
      name: "Pre-Wedding Shoot",
      description: "Romantic couple photography for unforgettable memories",
      region: "Destination Available",
      link: "/services/prewedding-shoot",
      image: "/pre/p1.jpg",
      hoverImage: "/pre/p2.jpg",
      imageCount: 11
    },
       {
      id: 3,
      name: "Wedding Cinematography",
      description: "Romantic couple photography for unforgettable memories",
      region: "Destination Available",
      link: "/services/prewedding-shoot",
      image: "/wedd-ci/wc7.jpg",
      hoverImage: "/wedd-ci/wedd-cin3.jfif",
      imageCount: 11
    },
      {
      id: 4,
      name: "Maternity Photography",
      description: "Beautiful captures of pregnancy and maternity moments",
      region: "Restaurant & Cafe",
      link: "/services/maternity-shoot",
      image: "/maternity-img/maternity2.jpeg",
      hoverImage: "/maternity-img/maternity1.jpeg",
      imageCount: 11
    },
      {
      id: 5,
      name: "Potrait Photography",
      description: "Professional  portraits and lifestyle shots",
      region: "Studio Sessions",
      link: "/services/portrait-shoot",
      image: "/pot-img/port2.jpg",
      hoverImage: "/pot-img/port.jpg",
      imageCount: 11
    },
       {
      id: 6,
      name: "Event Coverage",
      description: "Corporate and social events, captured perfectly",
      region: "Full Day Package",
      link: "/services/event-photography",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
      imageCount: 11
    },
      {
      id: 7,
      name: "Birth Photography",
      description: "Because every year deserves to be remembered beautifully.",
      region: "Studio Sessions",
      link: "/services/birthday",
      image: "/birthday-img/birthday6.jpeg",
      hoverImage: "/birthday-img/birthday4.jpeg",
      imageCount: 11
    },
        {
      id: 8,
      name: "Baby Photography",
      description: "Capturing tiny toes, big smiles, and pure love.",
      region: "Baby Sessions",
      link: "/services/baby-shoot",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80",
      imageCount: 11
    },
    {
      id: 9,
      name: "Outdoor Photography",
      description: "Professional outdoor portraits and lifestyle shots",
      region: "Studio Sessions",
      link: "/services/outdoor-photography",
      image: "https://i.pinimg.com/1200x/45/a2/cf/45a2cfe40147527dfd72507db59ebe03.jpg",
      hoverImage: "https://i.pinimg.com/736x/01/6e/88/016e881dd216dd240259b59c73212cc7.jpg",
      imageCount: 11
    },
      {
      id: 10,
      name: "Indoor Photography",
      description: "Professional indoor portraits and lifestyle shots",
      region: "Studio Sessions",
      link: "/services/indoor-shoot",
      image: "/indoor-img/indoor3.jpg",
      hoverImage: "/indoor-img/indoor2.jpg",
      imageCount: 11
    },
   
 
  
    {
      id: 15,
      name: "Product Photography",
      description: "Transforming products into irresistible visuals.",
      region: "E-commerce Ready",
      link: "/services/product-photography",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      imageCount: 11
    },
 

 
  
  ];

  useEffect(() => window.scrollTo(0, 0), []);

  const handleCardClick = (id) => {
    // Toggle active card (for mobile)
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <header className="relative min-h-screen sm:h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/banner/service-banner.avif"
          alt="Photo Studio Banner"
          className="absolute inset-0 w-full h-full object-cover animate-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-40 md:py-45">
         <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <p className="text-red-400 text-xs font-bold mt-0 uppercase tracking-[0.2em]">
              Our Services
            </p>
            <div className="w-8 h-0.5 bg-red-600"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white"
          style={{ fontFamily: "'Playfair Display', serif" }}>
          Expert Shots Lasting Stories
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
            Capturing life's precious moments with artistry and passion
          </p>
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="p-4 sm:p-8 bg-gray-50">
        <div className="max-w-7xl px-2 sm:px-6 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="group cursor-pointer block"
                onClick={() => handleCardClick(service.id)}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-white rounded-2xl shadow-md group-hover:shadow-2xl transition-all duration-500">
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>

                  {/* Main Image */}
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 rounded-xl group-hover:scale-110"
                  />

                  {/* Hover Image */}
                  <img
                    src={service.hoverImage}
                    alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100"
                  />

                  {/* 🔹 Default Title (Visible before hover/click, hidden on hover/click) */}
                  <div
                    className={`absolute bottom-4 left-0 right-0 text-center text-white z-20 transition-opacity duration-500 ${
                      activeCard === service.id ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                    }`}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold">{service.name}</h3>
                  </div>

                  {/* 🔹 Hover/Active Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/80 ${
                      activeCard === service.id ? 'opacity-90' : 'opacity-0'
                    } group-hover:opacity-90 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center`}
                  >
                    <div
                      className={`mb-6 transform ${
                        activeCard === service.id ? 'translate-y-0' : 'translate-y-4'
                      } group-hover:translate-y-0 transition-all duration-500 delay-100`}
                    >
                      <p className="text-white text-lg font-semibold">
                        View {service.imageCount} Photos
                      </p>
                    </div>
                    <h3
                      className={`text-white text-xl sm:text-2xl font-black mb-6 tracking-tight transform ${
                        activeCard === service.id ? 'translate-y-0' : 'translate-y-4'
                      } group-hover:translate-y-0 transition-all duration-500 delay-200`}
                    >
                      {service.name}
                    </h3>
                    <Link to={service.link} onClick={(e) => e.stopPropagation()}>
                      <button
                        className={`bg-white text-black px-8 py-3 font-bold uppercase tracking-wider rounded-lg transition-all text-sm hover:bg-gray-100 active:scale-95 transform ${
                          activeCard === service.id ? 'translate-y-0' : 'translate-y-4'
                        } group-hover:translate-y-0 duration-500 delay-300`}
                      >
                        View More →
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Zoom Animation */}
      <style>{`
        @keyframes zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-zoom {
          animation: zoom 15s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
