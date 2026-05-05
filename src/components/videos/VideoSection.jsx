import React, { useEffect, useState, useRef } from 'react';
import { Play, Star, Award, Zap, Heart, Users, Camera, Aperture } from 'lucide-react';
import CTA from "../CTA";

const VideoSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [liked, setLiked] = useState({});
  const [activeCategory, setActiveCategory] = useState('All');
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef({});

  useEffect(() => {
    fetch('http://localhost:5000/api/videos')
      .then(res => res.json())
      .then(data => {
        setAllVideos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching videos:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', ...new Set(allVideos.map(v => v.category).filter(Boolean))];

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMouseEnter = (videoId) => {
    setHoveredCard(videoId);
    const el = videoRefs.current[videoId];
    if (el) el.play().catch(() => {});
  };

  const handleMouseLeave = (videoId) => {
    setHoveredCard(null);
    const el = videoRefs.current[videoId];
    if (el) { el.pause(); el.currentTime = 0; }
  };

  const filteredVideos = activeCategory === 'All'
    ? allVideos
    : allVideos.filter(v => v.category === activeCategory);

  /* ── Small / Medium Card ── */
  const VideoCard = ({ video, height = 'h-56', showFeatured = false }) => (
    <div
      className="group relative w-full"
      onMouseEnter={() => handleMouseEnter(video.id)}
      onMouseLeave={() => handleMouseLeave(video.id)}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        <div className={`relative overflow-hidden ${height}`}>
          <video
            ref={el => videoRefs.current[video.id] = el}
            src={`http://localhost:5000${video.videoUrl}`}
            muted loop preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hoveredCard === video.id ? 'opacity-100 scale-105' : 'opacity-0'}`}
          />
          <img
            src={video.thumbnail ? `http://localhost:5000${video.thumbnail}` : '/thumbnails/default.jpg'}
            alt={video.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hoveredCard === video.id ? 'opacity-0 scale-105' : 'opacity-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          {/* Play Button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-400 ${hoveredCard === video.id ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl hover:scale-110 transition-transform cursor-pointer">
              <Play className="text-red-900" size={22} fill="currentColor" />
            </div>
          </div>

          {/* Badges */}
          {showFeatured && video.featured && !video.trending && (
            <div className="absolute top-3 left-3 bg-red-900 text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
              <Award size={10} /> FEATURED
            </div>
          )}
          {video.trending && (
            <div className="absolute top-3 left-3 bg-amber-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 animate-pulse shadow">
              <Zap size={10} /> TRENDING
            </div>
          )}

          {/* Like */}
          <button
            onClick={() => toggleLike(video.id)}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover:scale-110 shadow"
          >
            <Heart size={16} className={liked[video.id] ? 'text-red-700 fill-red-700' : 'text-gray-500'} />
          </button>

          {/* Info */}
          <div className="absolute bottom-3 left-3 right-10">
            <span className="text-red-400 text-[10px] font-bold tracking-widest uppercase mb-0.5 block">{video.category}</span>
            <h3 className="text-white font-bold text-base leading-snug line-clamp-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {video.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── Featured Hero Card ── */
  const FeaturedCard = ({ video }) => (
    <div
      className="w-full group relative"
      onMouseEnter={() => handleMouseEnter(video.id)}
      onMouseLeave={() => handleMouseLeave(video.id)}
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 h-full">
        <div className="relative overflow-hidden h-72 sm:h-96 lg:h-[420px]">
          <video
            ref={el => videoRefs.current[video.id] = el}
            src={`http://localhost:5000${video.videoUrl}`}
            muted loop preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hoveredCard === video.id ? 'opacity-100 scale-105' : 'opacity-0'}`}
          />
          <img
            src={video.thumbnail ? `http://localhost:5000${video.thumbnail}` : '/thumbnails/default.jpg'}
            alt={video.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hoveredCard === video.id ? 'opacity-0 scale-105' : 'opacity-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Big Play */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${hoveredCard === video.id ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-red-800 rounded-full animate-ping opacity-40" />
              <div className="relative bg-red-900 rounded-full p-7 sm:p-9 shadow-2xl hover:bg-red-800 cursor-pointer transition-transform hover:scale-110">
                <Play className="text-white" size={36} fill="white" />
              </div>
            </div>
          </div>

          {/* Featured Badge */}
          <div className="absolute top-5 left-5">
            <div className="bg-red-900 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xl">
              <Award size={13} /> FEATURED
            </div>
          </div>

          {/* Like */}
          <button
            onClick={() => toggleLike(video.id)}
            className="absolute top-5 right-5 bg-white/20 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/35 transition-all hover:scale-110"
          >
            <Heart size={22} className={liked[video.id] ? 'text-red-400 fill-red-400' : 'text-white'} />
          </button>

          {/* Info */}
          <div className="absolute bottom-5 left-5 right-5">
            <span className="text-red-400 text-[11px] font-bold tracking-widest uppercase mb-1.5 flex items-center gap-1.5">
              <Camera size={12} /> {video.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              {video.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-gray-100 relative overflow-hidden">

      {/* ── Decorative blobs ── */}
      <div className="pointer-events-none fixed top-20 left-10 w-72 h-72 bg-red-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none fixed bottom-40 right-20 w-96 h-96 bg-red-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }} />

      {/* ── Banner ── */}
      <header className="relative min-h-screen sm:h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/video-banner2.avif"
          alt="Photo Studio Banner"
          className="absolute inset-0 w-full h-full object-cover animate-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="relative z-10 px-4 sm:px-8 max-w-4xl mx-auto">
           <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <p className="text-red-400 text-xs font-bold mt-0 uppercase tracking-[0.2em]">
             Studio Mastery
            </p>
            <div className="w-8 h-0.5 bg-red-600"></div>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
           Turning Moments into Perfection
          </h1>
          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Master the art of photography with professional techniques and studio secrets
          </p>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="max-w-7xl mx-auto">

          {/* ── Header + Stats ── */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-red-900 px-4 py-1.5 rounded-full mb-4">
                <Aperture className="text-white" size={15} />
                <span className="text-white font-bold text-[11px] tracking-widest" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  STUDIO MASTERY
                </span>
              </div>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-red-900 leading-tight mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Beauty captured
                <br />
                <span className="text-gray-900">through motion</span>
              </h2>
              <p className="text-gray-500 text-base max-w-md leading-relaxed">
                Professional photography techniques from industry experts
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-3 sm:gap-4 flex-shrink-0">
              {[
                { value: `${allVideos.length}+`, label: 'Videos', icon: <Users size={13} /> },
                { value: '4.8★', label: 'Avg Rating', icon: <Star size={13} /> },
              ].map(({ value, label, icon }) => (
                <div
                  key={label}
                  className="bg-white/80 backdrop-blur-sm px-5 py-4 sm:px-6 sm:py-5 rounded-2xl shadow border border-red-100 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-black text-red-900 mb-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {value}
                  </div>
                  <div className="text-xs text-gray-500 font-medium flex items-center gap-1">{icon}{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Category Filter ── */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                  activeCategory === cat
                    ? 'bg-red-900 text-white shadow-lg scale-105'
                    : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white hover:shadow-md'
                }`}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div className="text-center py-24">
              <div className="inline-flex gap-1.5">
                {[0, 0.15, 0.3].map((d, i) => (
                  <span key={i} className="w-2.5 h-2.5 bg-red-900 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />
                ))}
              </div>
              <p className="text-gray-400 mt-3 text-sm">Loading videos...</p>
            </div>
          )}

          {/* ── Empty ── */}
          {!loading && filteredVideos.length === 0 && (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg">No videos in this category</p>
            </div>
          )}

          {/* ── Videos Grid ── */}
          {!loading && filteredVideos.length > 0 && (
            <div className="space-y-6">

              {/* Row 1: Featured + 2 side cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  {filteredVideos[0] && <FeaturedCard video={filteredVideos[0]} />}
                </div>
                <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 sm:gap-6">
                  {filteredVideos.slice(1, 3).map(video => (
                    <div key={video.id} className="flex-1 min-w-0">
                      <VideoCard video={video} height="h-40 sm:h-48 lg:h-[192px]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2: 3-column grid */}
              {filteredVideos.length > 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredVideos.slice(3, 6).map(video => (
                    <VideoCard key={video.id} video={video} height="h-56" showFeatured />
                  ))}
                </div>
              )}

              {/* Extra rows */}
              {filteredVideos.length > 6 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filteredVideos.slice(6).map(video => (
                    <VideoCard key={video.id} video={video} height="h-56" />
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ── CTA ── */}
          <div className="mt-16">
            <CTA />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .animate-zoom { animation: zoom 16s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default VideoSection;