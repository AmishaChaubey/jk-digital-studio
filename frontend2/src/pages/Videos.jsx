import { useEffect, useState } from 'react';
import { Film, Sparkles, Play, Award, Filter } from 'lucide-react';
import API from '../api/axios';

const SERVICE_LABELS = {
  wedding: 'Wedding', babyshoot: 'Baby Shoot', birthday: 'Birthday',
  portrait: 'Portrait', maternity: 'Maternity', corporate: 'Corporate',
  fashion: 'Fashion', prewedding: 'Pre-Wedding',
};

const SERVICE_ICONS = {
  wedding: '💍', babyshoot: '🌸', birthday: '🎂', portrait: '🖼',
  maternity: '🤍', corporate: '🏛', fashion: '✨', prewedding: '🌹',
};

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    setLoading(true);
    API.get('/videos')
      .then(r => setVideos(r.data))
      .finally(() => setLoading(false));
  }, []);

  const services = ['all', ...new Set(videos.map(v => v.service).filter(Boolean))];
  const filtered = filter === 'all' ? videos : videos.filter(v => v.service === filter);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)',
      fontFamily: "'Montserrat', sans-serif",
    }}>

      {/* Ambient orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-10%', width: '500px', height: '500px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero ── */}
        <div style={{
          borderBottom: '1px solid rgba(212,175,55,0.12)',
          background: 'rgba(255,255,255,0.01)',
          backdropFilter: 'blur(10px)',
          padding: '80px 24px 56px',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, #a78bfa)' }} />
            <Sparkles size={13} color="#a78bfa" />
            <span style={{
              color: '#a78bfa', fontSize: '10px', letterSpacing: '5px',
              textTransform: 'uppercase', fontWeight: 600,
            }}>Cinematic Work</span>
            <Sparkles size={13} color="#a78bfa" />
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, #a78bfa)' }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 7vw, 76px)', fontWeight: 300,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: '#f5f0e8', lineHeight: 1.1, letterSpacing: '-1px',
            margin: '0 0 8px',
          }}>
            Our <em style={{ color: '#a78bfa', fontStyle: 'italic', fontWeight: 400 }}>Films</em>
          </h1>

          <p style={{
            color: 'rgba(245,240,232,0.35)', fontSize: '13px',
            letterSpacing: '1px', maxWidth: '380px',
            margin: '0 auto 32px', lineHeight: 1.8,
          }}>
            Stories told through motion — crafted with care, preserved forever.
          </p>

          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center' }}>
            {[['4K', 'Quality'], [videos.length || '—', 'Films'], ['RAW', 'Footage']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#a78bfa', fontSize: '20px', fontWeight: 600 }}>{num}</div>
                <div style={{ color: 'rgba(245,240,232,0.25)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '40px 20px 80px' }}>

          {/* ── Filter Pills ── */}
          {services.length > 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '44px' }}>
              {services.map(s => {
                const isActive = filter === s;
                return (
                  <FilterPill key={s} label={s === 'all' ? '✦ All' : `${SERVICE_ICONS[s] || ''} ${SERVICE_LABELS[s] || s}`}
                    active={isActive} onClick={() => setFilter(s)} />
                );
              })}
            </div>
          )}

          {/* ── Loading ── */}
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{
                  borderRadius: '4px', overflow: 'hidden',
                  background: 'linear-gradient(110deg, rgba(255,255,255,0.02) 8%, rgba(167,139,250,0.04) 18%, rgba(255,255,255,0.02) 33%)',
                  backgroundSize: '200% 100%', animation: 'shimmer 1.8s infinite',
                  height: '260px',
                }} />
              ))}
            </div>
          )}

          {/* ── Empty ── */}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px 20px' }}>
              <Film size={48} color="rgba(167,139,250,0.2)" style={{ margin: '0 auto 24px', display: 'block' }} />
              <p style={{ color: 'rgba(245,240,232,0.25)', fontSize: '16px', marginBottom: '20px' }}>
                No films in this collection yet.
              </p>
              {filter !== 'all' && (
                <button onClick={() => setFilter('all')} style={{
                  background: 'none', border: '1px solid rgba(167,139,250,0.3)',
                  color: '#a78bfa', padding: '10px 24px', cursor: 'pointer',
                  borderRadius: '2px', fontSize: '10px', letterSpacing: '2px',
                  textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif",
                }}>View All Films</button>
              )}
            </div>
          )}

          {/* ── Grid ── */}
          {!loading && filtered.length > 0 && (
            <>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Filter size={12} color="#a78bfa" />
                  <span style={{ color: 'rgba(245,240,232,0.3)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {filtered.length} {filtered.length === 1 ? 'film' : 'films'}
                  </span>
                </div>
                <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, rgba(167,139,250,0.3), transparent)' }} />
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
              }}>
                {filtered.map(v => (
                  <VideoCard
                    key={v.id} video={v}
                    hovered={hoveredId === v.id}
                    onHover={() => setHoveredId(v.id)}
                    onLeave={() => setHoveredId(null)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid rgba(212,175,55,0.08)',
          padding: '24px', textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Award size={12} color="rgba(212,175,55,0.3)" />
            <span style={{ color: 'rgba(245,240,232,0.15)', fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              Premium Photography Studio
            </span>
            <Award size={12} color="rgba(212,175,55,0.3)" />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        video::-webkit-media-controls { opacity: 0.85; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 2px; }
      `}</style>
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '8px 18px', borderRadius: '2px', cursor: 'pointer',
        fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase',
        fontWeight: 600, fontFamily: "'Montserrat', sans-serif",
        transition: 'all 0.25s ease',
        border: active ? '1px solid #a78bfa' : `1px solid ${hovered ? 'rgba(167,139,250,0.4)' : 'rgba(167,139,250,0.15)'}`,
        background: active
          ? 'linear-gradient(135deg, #a78bfa, #8b5cf6)'
          : hovered ? 'rgba(167,139,250,0.07)' : 'rgba(255,255,255,0.02)',
        color: active ? '#0a0a0a' : hovered ? '#a78bfa' : 'rgba(245,240,232,0.4)',
      }}
    >{label}</button>
  );
}

function VideoCard({ video, hovered, onHover, onLeave }) {
  const label = SERVICE_LABELS[video.service] || video.service;
  const icon = SERVICE_ICONS[video.service] || '🎬';

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        borderRadius: '4px', overflow: 'hidden',
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.2)'
          : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Video */}
      <div style={{ position: 'relative', background: '#050505' }}>
        <video
          controls
          poster={video.thumbnail ? `http://localhost:5000${video.thumbnail}` : undefined}
          style={{
            width: '100%', display: 'block',
            maxHeight: '220px', objectFit: 'cover',
          }}
        >
          <source src={`http://localhost:5000${video.videoUrl}`} />
        </video>

        {/* Category badge overlay */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(167,139,250,0.3)',
          padding: '3px 10px', borderRadius: '2px',
          fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase',
          color: '#a78bfa', fontWeight: 600,
          pointerEvents: 'none',
        }}>
          {icon} {label}
        </div>
      </div>

      {/* Info */}
      <div style={{
        padding: '14px 16px 16px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
          <p style={{
            color: '#f5f0e8', fontSize: '14px', fontWeight: 300, margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: '0.3px', lineHeight: 1.4,
            flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>{video.title}</p>

          <div style={{
            width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
            background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Play size={10} color="#a78bfa" fill="#a78bfa" />
          </div>
        </div>
      </div>
    </div>
  );
}