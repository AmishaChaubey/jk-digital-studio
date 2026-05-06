import { useEffect, useState, useCallback } from 'react';
import API from '../api/axios';
import {
  Camera, X, ChevronLeft, ChevronRight, Grid3X3,
  Sparkles, Image, Filter, ZoomIn, Award, Heart, Share2
} from 'lucide-react';

const FILTERS = [
  'all', 'wedding', 'babyshoot', 'birthday', 'portrait',
  'maternity', 'corporate', 'fashion', 'prewedding'
];

const FILTER_LABELS = {
  all: 'All',
  wedding: 'Wedding',
  babyshoot: 'Baby Shoot',
  birthday: 'Birthday',
  portrait: 'Portrait',
  maternity: 'Maternity',
  corporate: 'Corporate',
  fashion: 'Fashion',
  prewedding: 'Pre-Wedding',
};

const FILTER_ICONS = {
  all: '✦',
  wedding: '💍',
  babyshoot: '🌸',
  birthday: '🎂',
  portrait: '🖼',
  maternity: '🤍',
  corporate: '🏛',
  fashion: '✨',
  prewedding: '🌹',
};

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [liked, setLiked] = useState({});
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const url = filter === 'all' ? '/photos' : `/photos?service=${filter}`;
    API.get(url)
      .then(r => setPhotos(r.data))
      .finally(() => setLoading(false));
  }, [filter]);

  const openLightbox = (photo, index) => {
    setSelected(photo);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelected(null);
    setSelectedIndex(null);
  };

  const navigate = useCallback((dir) => {
    const nextIndex = (selectedIndex + dir + photos.length) % photos.length;
    setSelected(photos[nextIndex]);
    setSelectedIndex(nextIndex);
  }, [selectedIndex, photos]);

  useEffect(() => {
    const handler = (e) => {
      if (!selected) return;
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected, navigate]);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)',
      fontFamily: "'Cormorant Garamond', Georgia, serif"
    }}>

      {/* Ambient background orbs */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero ── */}
        <div style={{
          borderBottom: '1px solid rgba(212,175,55,0.15)',
          background: 'rgba(255,255,255,0.01)',
          backdropFilter: 'blur(10px)',
          padding: '80px 24px 60px',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '10px', marginBottom: '20px'
          }}>
            <div style={{
              width: '40px', height: '1px',
              background: 'linear-gradient(to right, transparent, #d4af37)'
            }} />
            <Sparkles size={14} color="#d4af37" />
            <span style={{
              color: '#d4af37', fontSize: '11px', fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 600
            }}>Curated Collection</span>
            <Sparkles size={14} color="#d4af37" />
            <div style={{
              width: '40px', height: '1px',
              background: 'linear-gradient(to left, transparent, #d4af37)'
            }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 300,
            color: '#f5f0e8', lineHeight: 1.1, letterSpacing: '-1px',
            marginBottom: '8px'
          }}>
            Our <em style={{ color: '#d4af37', fontStyle: 'italic', fontWeight: 400 }}>Gallery</em>
          </h1>

          <p style={{
            color: 'rgba(245,240,232,0.4)', fontSize: '15px',
            fontFamily: "'Montserrat', sans-serif", fontWeight: 300,
            letterSpacing: '1px', maxWidth: '400px', margin: '0 auto 28px',
            lineHeight: 1.7
          }}>
            Every frame tells a story. Explore our carefully crafted moments.
          </p>

          <div style={{
            display: 'flex', gap: '32px', justifyContent: 'center',
            fontFamily: "'Montserrat', sans-serif"
          }}>
            {[['500+', 'Sessions'], ['12', 'Categories'], ['8+', 'Years']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#d4af37', fontSize: '22px', fontWeight: 600 }}>{num}</div>
                <div style={{ color: 'rgba(245,240,232,0.3)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>

          {/* ── Filter Bar ── */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '8px',
            justifyContent: 'center', marginBottom: '48px'
          }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '9px 20px',
                  borderRadius: '2px',
                  fontSize: '11px',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 500,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: filter === f ? '1px solid #d4af37' : '1px solid rgba(212,175,55,0.2)',
                  background: filter === f
                    ? 'linear-gradient(135deg, #d4af37 0%, #b8962a 100%)'
                    : 'rgba(255,255,255,0.02)',
                  color: filter === f ? '#0a0a0a' : 'rgba(245,240,232,0.5)',
                  backdropFilter: 'blur(10px)',
                }}
                onMouseEnter={e => {
                  if (filter !== f) {
                    e.target.style.borderColor = 'rgba(212,175,55,0.6)';
                    e.target.style.color = '#d4af37';
                    e.target.style.background = 'rgba(212,175,55,0.08)';
                  }
                }}
                onMouseLeave={e => {
                  if (filter !== f) {
                    e.target.style.borderColor = 'rgba(212,175,55,0.2)';
                    e.target.style.color = 'rgba(245,240,232,0.5)';
                    e.target.style.background = 'rgba(255,255,255,0.02)';
                  }
                }}
              >
                {FILTER_ICONS[f]} {FILTER_LABELS[f]}
              </button>
            ))}
          </div>

          {/* ── Loading ── */}
          {loading && (
            <div style={{
              columns: '2 200px', gap: '16px', columnFill: 'balance'
            }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{
                  breakInside: 'avoid', marginBottom: '16px',
                  borderRadius: '4px', overflow: 'hidden',
                  height: `${[240, 320, 280, 200, 300, 260, 340, 220][i % 8]}px`,
                  background: 'linear-gradient(110deg, rgba(255,255,255,0.03) 8%, rgba(212,175,55,0.05) 18%, rgba(255,255,255,0.03) 33%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.8s infinite',
                }} />
              ))}
            </div>
          )}

          {/* ── Empty ── */}
          {!loading && photos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
              <Camera size={48} color="rgba(212,175,55,0.3)" style={{ margin: '0 auto 24px' }} />
              <p style={{
                color: 'rgba(245,240,232,0.3)', fontSize: '18px',
                fontFamily: "'Montserrat', sans-serif', letterSpacing:'1px"
              }}>No photos in this collection yet.</p>
              <button
                onClick={() => setFilter('all')}
                style={{
                  marginTop: '20px', background: 'none',
                  border: '1px solid rgba(212,175,55,0.4)',
                  color: '#d4af37', padding: '10px 24px',
                  cursor: 'pointer', borderRadius: '2px',
                  fontSize: '11px', letterSpacing: '2px',
                  fontFamily: "'Montserrat', sans-serif",
                  textTransform: 'uppercase'
                }}
              >
                View All
              </button>
            </div>
          )}

          {/* ── Grid ── */}
          {!loading && photos.length > 0 && (
            <>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter size={13} color="#d4af37" />
                  <span style={{
                    color: 'rgba(245,240,232,0.35)', fontSize: '11px',
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: '1.5px', textTransform: 'uppercase'
                  }}>
                    {photos.length} {photos.length === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>
                <div style={{
                  width: '60px', height: '1px',
                  background: 'linear-gradient(to right, rgba(212,175,55,0.3), transparent)'
                }} />
              </div>

              <div style={{ columns: '2 220px', gap: '12px' }}>
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => openLightbox(photo, index)}
                    onMouseEnter={() => setHoveredId(photo.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      breakInside: 'avoid', marginBottom: '12px',
                      position: 'relative', cursor: 'pointer',
                      borderRadius: '4px', overflow: 'hidden',
                      border: '1px solid rgba(212,175,55,0.1)',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transform: hoveredId === photo.id ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: hoveredId === photo.id
                        ? '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.3)'
                        : '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <img
                      src={`http://localhost:5000${photo.imageUrl}`}
                      alt={photo.title}
                      style={{
                        width: '100%', display: 'block',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        transform: hoveredId === photo.id ? 'scale(1.07)' : 'scale(1)',
                      }}
                    />

                    {/* Overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: hoveredId === photo.id
                        ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                      transition: 'all 0.4s ease',
                    }} />

                    {/* Category badge */}
                    <div style={{
                      position: 'absolute', top: '12px', left: '12px',
                      background: 'rgba(10,10,10,0.7)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      padding: '4px 10px', borderRadius: '2px',
                      fontSize: '9px', letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: '#d4af37',
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      opacity: hoveredId === photo.id ? 1 : 0.85,
                      transition: 'all 0.3s ease',
                    }}>
                      {FILTER_LABELS[photo.service] || photo.service}
                    </div>

                    {/* Like button */}
                    <button
                      onClick={(e) => toggleLike(photo.id, e)}
                      style={{
                        position: 'absolute', top: '12px', right: '12px',
                        background: 'rgba(10,10,10,0.7)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${liked[photo.id] ? 'rgba(220,38,38,0.5)' : 'rgba(212,175,55,0.2)'}`,
                        borderRadius: '50%', width: '32px', height: '32px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        opacity: hoveredId === photo.id ? 1 : 0,
                        transition: 'all 0.3s ease',
                        transform: hoveredId === photo.id ? 'scale(1)' : 'scale(0.8)',
                      }}
                    >
                      <Heart
                        size={13}
                        color={liked[photo.id] ? '#ef4444' : '#d4af37'}
                        fill={liked[photo.id] ? '#ef4444' : 'none'}
                      />
                    </button>

                    {/* Bottom info */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '16px 14px 14px',
                      opacity: hoveredId === photo.id ? 1 : 0,
                      transform: hoveredId === photo.id ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'all 0.35s ease',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{
                          color: '#f5f0e8', fontSize: '13px',
                          fontWeight: 400, letterSpacing: '0.3px',
                          margin: 0, flex: 1,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                        }}>{photo.title}</p>
                        <ZoomIn size={14} color="rgba(245,240,232,0.5)" style={{ marginLeft: '8px', flexShrink: 0 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Footer bar ── */}
        <div style={{
          borderTop: '1px solid rgba(212,175,55,0.1)',
          padding: '24px', textAlign: 'center',
          marginTop: '40px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Award size={13} color="rgba(212,175,55,0.5)" />
            <span style={{
              color: 'rgba(245,240,232,0.2)', fontSize: '10px',
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: '2px', textTransform: 'uppercase'
            }}>Premium Photography Studio</span>
            <Award size={13} color="rgba(212,175,55,0.5)" />
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {selected && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(20px)',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '50%', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#d4af37',
              transition: 'all 0.2s ease',
              zIndex: 110,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <X size={18} />
          </button>

          {/* Nav Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            style={{
              position: 'absolute', left: '20px', top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '2px', width: '48px', height: '60px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#d4af37',
              transition: 'all 0.2s ease', zIndex: 110,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Nav Next */}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            style={{
              position: 'absolute', right: '20px', top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '2px', width: '48px', height: '60px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#d4af37',
              transition: 'all 0.2s ease', zIndex: 110,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
          >
            <ChevronRight size={20} />
          </button>

          {/* Lightbox content */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '900px', width: '100%',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '4px', overflow: 'hidden',
              animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <img
              src={`http://localhost:5000${selected.imageUrl}`}
              alt={selected.title}
              style={{
                width: '100%', maxHeight: '72vh',
                objectFit: 'contain',
                background: '#050505', display: 'block',
              }}
            />
            <div style={{
              padding: '18px 24px',
              background: 'rgba(10,10,10,0.95)',
              borderTop: '1px solid rgba(212,175,55,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <p style={{
                  color: '#f5f0e8', fontSize: '17px',
                  fontWeight: 300, letterSpacing: '0.5px', margin: '0 0 6px',
                }}>{selected.title}</p>
                <span style={{
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  color: '#d4af37', fontSize: '9px',
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: '2px', textTransform: 'uppercase',
                  padding: '3px 10px', borderRadius: '2px',
                }}>
                  {FILTER_ICONS[selected.service]} {FILTER_LABELS[selected.service] || selected.service}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={(e) => toggleLike(selected.id, e)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '2px', padding: '8px 12px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    color: liked[selected.id] ? '#ef4444' : '#d4af37',
                    fontSize: '11px', fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: '1px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Heart size={14} fill={liked[selected.id] ? '#ef4444' : 'none'} />
                </button>
                <div style={{
                  color: 'rgba(245,240,232,0.3)', fontSize: '11px',
                  fontFamily: "'Montserrat', sans-serif",
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  <Image size={12} />
                  <span>{selectedIndex + 1} / {photos.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.93); }
          to { opacity: 1; transform: scale(1); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 2px; }
      `}</style>
    </div>
  );
}