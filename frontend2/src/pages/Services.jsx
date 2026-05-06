import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, Award, Camera, ChevronRight, IndianRupee, CalendarCheck, Tag } from 'lucide-react';
import API from '../api/axios';

const SERVICE_ICONS = {
  wedding: '💍', babyshoot: '🌸', birthday: '🎂', portrait: '🖼',
  maternity: '🤍', corporate: '🏛', fashion: '✨', prewedding: '🌹',
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [booked, setBooked] = useState(false);
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type');

  useEffect(() => {
    API.get('/services')
      .then(r => {
        setServices(r.data);
        if (typeFromUrl) {
          const found = r.data.find(s => s.slug === typeFromUrl);
          if (found) setSelected(found);
        }
      })
      .finally(() => setLoading(false));
  }, [typeFromUrl]);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => setBooked(false), 2500);
  };

  const icon = selected ? (SERVICE_ICONS[selected.slug] || SERVICE_ICONS[selected.name?.toLowerCase()] || '✦') : null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 50%, #0a0a0a 100%)',
      fontFamily: "'Montserrat', sans-serif",
    }}>

      {/* Ambient orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-15%', right: '-10%', width: '600px', height: '600px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%', width: '450px', height: '450px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.03) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero ── */}
        <div style={{
          borderBottom: '1px solid rgba(212,175,55,0.12)',
          backdropFilter: 'blur(10px)',
          padding: '72px 24px 52px',
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '18px' }}>
            <div style={{ width: '36px', height: '1px', background: 'linear-gradient(to right, transparent, #d4af37)' }} />
            <Sparkles size={12} color="#d4af37" />
            <span style={{ color: '#d4af37', fontSize: '9px', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 600 }}>
              What We Offer
            </span>
            <Sparkles size={12} color="#d4af37" />
            <div style={{ width: '36px', height: '1px', background: 'linear-gradient(to left, transparent, #d4af37)' }} />
          </div>

          <h1 style={{
            fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 300,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: '#f5f0e8', lineHeight: 1.1, letterSpacing: '-1px', margin: '0 0 10px',
          }}>
            Our <em style={{ color: '#d4af37', fontStyle: 'italic', fontWeight: 400 }}>Services</em>
          </h1>
          <p style={{
            color: 'rgba(245,240,232,0.3)', fontSize: '12px', letterSpacing: '1px',
            maxWidth: '360px', margin: '0 auto', lineHeight: 1.8,
          }}>
            Select a service to explore what we offer and book your session.
          </p>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 20px', flexDirection: 'column', gap: '16px' }}>
            <Camera size={36} color="rgba(212,175,55,0.2)" />
            <span style={{ color: 'rgba(245,240,232,0.2)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              Loading...
            </span>
          </div>
        )}

        {/* ── Main Layout ── */}
        {!loading && (
          <div style={{
            maxWidth: '1200px', margin: '0 auto',
            padding: '40px 20px 80px',
            display: 'flex', gap: '20px', alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>

            {/* ── Sidebar ── */}
            <div style={{
              width: '240px', flexShrink: 0,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(212,175,55,0.1)',
              borderRadius: '4px', overflow: 'hidden',
            }}>
              {/* Sidebar header */}
              <div style={{
                padding: '14px 18px',
                borderBottom: '1px solid rgba(212,175,55,0.1)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <Tag size={12} color="#d4af37" />
                <span style={{ fontSize: '9px', color: 'rgba(212,175,55,0.7)', letterSpacing: '2.5px', textTransform: 'uppercase', fontWeight: 700 }}>
                  Services
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '9px', color: 'rgba(212,175,55,0.4)', fontWeight: 600 }}>
                  ({services.length})
                </span>
              </div>

              {services.length === 0 && (
                <p style={{ color: 'rgba(245,240,232,0.2)', fontSize: '11px', textAlign: 'center', padding: '32px 16px', fontStyle: 'italic' }}>
                  No services added yet.
                </p>
              )}

              {services.map(service => {
                const isActive = selected?.id === service.id;
                const isHovered = hoveredId === service.id;
                const sIcon = SERVICE_ICONS[service.slug] || SERVICE_ICONS[service.name?.toLowerCase()] || '✦';
                return (
                  <div
                    key={service.id}
                    onClick={() => setSelected(service)}
                    onMouseEnter={() => setHoveredId(service.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '12px 18px', cursor: 'pointer',
                      borderLeft: `3px solid ${isActive ? '#d4af37' : 'transparent'}`,
                      background: isActive
                        ? 'rgba(212,175,55,0.08)'
                        : isHovered ? 'rgba(255,255,255,0.03)' : 'transparent',
                      transition: 'all 0.22s ease',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                    }}
                  >
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>{sIcon}</span>
                    <span style={{
                      fontSize: '11px', fontWeight: 600,
                      color: isActive ? '#d4af37' : isHovered ? 'rgba(245,240,232,0.7)' : 'rgba(245,240,232,0.4)',
                      letterSpacing: '0.5px', flex: 1,
                      transition: 'color 0.2s',
                    }}>{service.name}</span>
                    <ChevronRight size={12} color={isActive ? '#d4af37' : 'transparent'} style={{ flexShrink: 0, transition: 'color 0.2s' }} />
                  </div>
                );
              })}
            </div>

            {/* ── Detail Panel ── */}
            <div style={{ flex: 1, minWidth: '280px' }}>

              {!selected ? (
                /* Placeholder */
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(212,175,55,0.1)',
                  borderRadius: '4px', minHeight: '440px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '14px', padding: '40px',
                }}>
                  <Camera size={48} color="rgba(212,175,55,0.15)" />
                  <p style={{ color: 'rgba(245,240,232,0.2)', fontSize: '13px', letterSpacing: '1px', textAlign: 'center' }}>
                    Select a service from the left<br />to view details
                  </p>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[...Array(3)].map((_, i) => (
                      <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(212,175,55,0.2)' }} />
                    ))}
                  </div>
                </div>
              ) : (
                /* Service Detail */
                <div style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(212,175,55,0.12)',
                  borderRadius: '4px', overflow: 'hidden',
                  animation: 'fadeSlide 0.3s ease',
                }}>

                  {/* Cover Image */}
                  {selected.coverImage ? (
                    <div style={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={`http://localhost:5000${selected.coverImage}`}
                        alt={selected.name}
                        style={{
                          width: '100%', height: '300px',
                          objectFit: 'cover', display: 'block',
                        }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)',
                      }} />
                      <div style={{
                        position: 'absolute', bottom: '20px', left: '24px',
                        display: 'flex', alignItems: 'center', gap: '10px',
                      }}>
                        <span style={{ fontSize: '24px' }}>{icon}</span>
                        <h2 style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '28px', fontWeight: 300, color: '#f5f0e8',
                          margin: 0, letterSpacing: '0.5px',
                        }}>{selected.name}</h2>
                      </div>
                    </div>
                  ) : (
                    /* No cover — show header block */
                    <div style={{
                      padding: '36px 28px 28px',
                      borderBottom: '1px solid rgba(212,175,55,0.08)',
                      background: 'rgba(212,175,55,0.03)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '52px', height: '52px', borderRadius: '4px',
                          background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                        }}>{icon}</div>
                        <h2 style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '30px', fontWeight: 300, color: '#f5f0e8',
                          margin: 0, letterSpacing: '0.5px',
                        }}>{selected.name}</h2>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div style={{ padding: '28px' }}>

                    {/* Price */}
                    {selected.price && (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(52,211,153,0.08)',
                        border: '1px solid rgba(52,211,153,0.2)',
                        padding: '8px 16px', borderRadius: '3px', marginBottom: '24px',
                      }}>
                        <IndianRupee size={13} color="#34d399" />
                        <span style={{ color: '#34d399', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px' }}>
                          Starting from: {selected.price}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    {selected.description && (
                      <p style={{
                        color: 'rgba(245,240,232,0.5)', lineHeight: 1.85,
                        fontSize: '13px', marginBottom: '32px', letterSpacing: '0.3px',
                      }}>{selected.description}</p>
                    )}

                    {/* Divider */}
                    <div style={{
                      height: '1px', background: 'rgba(212,175,55,0.08)',
                      marginBottom: '28px',
                    }} />

                    {/* Book Button */}
                    <BookButton onClick={handleBook} booked={booked} name={selected.name} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(212,175,55,0.08)', padding: '24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Award size={11} color="rgba(212,175,55,0.3)" />
            <span style={{ color: 'rgba(245,240,232,0.15)', fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              Premium Photography Studio
            </span>
            <Award size={11} color="rgba(212,175,55,0.3)" />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 2px; }
        @media (max-width: 640px) {
          .services-sidebar { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

function BookButton({ onClick, booked, name }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '14px 28px',
        background: booked
          ? 'linear-gradient(135deg, #34d399, #059669)'
          : hovered
          ? 'linear-gradient(135deg, #d4af37, #b8962a)'
          : 'linear-gradient(135deg, #c9a227, #a8841e)',
        border: 'none', borderRadius: '3px',
        color: '#0a0a0a', fontWeight: 700, fontSize: '11px',
        letterSpacing: '2px', textTransform: 'uppercase',
        fontFamily: "'Montserrat', sans-serif",
        cursor: 'pointer', transition: 'all 0.3s ease',
        transform: hovered && !booked ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered && !booked ? '0 8px 24px rgba(212,175,55,0.25)' : 'none',
      }}
    >
      <CalendarCheck size={15} />
      {booked ? `✓ Booked — ${name}` : `Book This Session`}
    </button>
  );
}