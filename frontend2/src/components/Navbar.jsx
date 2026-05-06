import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const DEFAULT_SERVICES = [
  { label: 'Wedding Shoot', icon: '💍' },
  { label: 'Baby Shoot', icon: '🌸' },
  { label: 'Birthday', icon: '🎂' },
  { label: 'Portrait', icon: '🖼' },
  { label: 'Maternity', icon: '🤍' },
  { label: 'Corporate', icon: '🏛' },
  { label: 'Fashion', icon: '✨' },
  { label: 'Pre-Wedding', icon: '🌹' },
];

const SERVICE_ICONS = {
  wedding: '💍', babyshoot: '🌸', birthday: '🎂', portrait: '🖼',
  maternity: '🤍', corporate: '🏛', fashion: '✨', prewedding: '🌹',
};

const NAV_LINKS = [
  { label: 'Gallery', to: '/gallery' },
  { label: 'Videos', to: '/videos' },
];

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const location = useLocation();

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/services');
        const data = await res.json();
        if (data && data.length > 0) {
          const mapped = data.map(s => ({
            label: s.name,
            icon: SERVICE_ICONS[s.name.toLowerCase().replace(/\s/g, '')] || '📷',
            slug: s.name.toLowerCase().replace(/\s/g, ''),
          }));
          setServices(mapped);
        } else {
          // fallback to default if DB is empty
          setServices(DEFAULT_SERVICES.map(s => ({
            ...s,
            slug: s.label.toLowerCase().replace(/\s/g, ''),
          })));
        }
      } catch (err) {
        // fallback to default on error
        setServices(DEFAULT_SERVICES.map(s => ({
          ...s,
          slug: s.label.toLowerCase().replace(/\s/g, ''),
        })));
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdown(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 40px', height: '70px',
        background: scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.85)',
        borderBottom: `1px solid ${scrolled ? 'rgba(212,175,55,0.2)' : 'rgba(212,175,55,0.08)'}`,
        backdropFilter: 'blur(20px)',
        transition: 'all 0.4s ease',
        fontFamily: "'Montserrat', sans-serif",
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '22px', fontWeight: 400, color: '#f5f0e8',
              letterSpacing: '0.5px', lineHeight: 1,
            }}>
              JK <em style={{ color: '#d4af37', fontStyle: 'italic' }}>Digital</em>
            </span>
            <div style={{
              fontSize: '10px', color: 'rgba(212,175,55,0.5)',
              letterSpacing: '2.5px', textTransform: 'uppercase',
              fontWeight: 600, lineHeight: 1, marginTop: '2px',
            }}>Photo Studio</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {NAV_LINKS.map(link => (
            <NavLink key={link.to} to={link.to} active={isActive(link.to)}>
              {link.label}
            </NavLink>
          ))}

          {/* Services Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <button style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '8px 14px', borderRadius: '2px', cursor: 'pointer',
              background: dropdown ? 'rgba(212,175,55,0.08)' : 'transparent',
              border: dropdown ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
              color: dropdown ? '#d4af37' : 'rgba(245,240,232,0.6)',
              fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase',
              fontWeight: 600, fontFamily: "'Montserrat', sans-serif",
              transition: 'all 0.25s ease',
            }}>
              Services
              <ChevronDown size={12} style={{
                transition: 'transform 0.25s ease',
                transform: dropdown ? 'rotate(180deg)' : 'rotate(0deg)',
              }} />
            </button>

            <div style={{
              position: 'absolute', top: '100%', left: '50%',
              transform: dropdown
                ? 'translateX(-50%) translateY(0)'
                : 'translateX(-50%) translateY(-6px)',
              minWidth: '210px', zIndex: 200,
              opacity: dropdown ? 1 : 0,
              pointerEvents: dropdown ? 'all' : 'none',
              paddingTop: '8px',
              transition: 'opacity 0.22s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
            }}>
              {/* Arrow tip */}
              <div style={{
                position: 'absolute', top: '4px', left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '8px', height: '8px',
                background: 'rgba(10,10,10,0.98)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderBottom: 'none', borderRight: 'none',
                zIndex: 1,
              }} />
              {/* Menu box */}
              <div style={{
                background: 'rgba(10,10,10,0.98)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '4px', padding: '8px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.7)',
              }}>
                {loadingServices ? (
                  <div style={{
                    padding: '12px', textAlign: 'center',
                    color: 'rgba(212,175,55,0.4)', fontSize: '11px',
                    letterSpacing: '1px', fontFamily: "'Montserrat', sans-serif",
                  }}>Loading...</div>
                ) : (
                  services.map((s, i) => (
                    <DropdownItem key={s.label} service={s} delay={i * 20} />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Admin link */}
          <Link
            to="/admin"
            style={{
              padding: '8px 16px', marginLeft: '6px',
              background: isActive('/admin')
                ? 'linear-gradient(135deg, #d4af37, #b8962a)'
                : 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '2px', color: isActive('/admin') ? '#0a0a0a' : '#d4af37',
              textDecoration: 'none', fontSize: '11px',
              letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700,
              fontFamily: "'Montserrat', sans-serif",
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              if (!isActive('/admin')) {
                e.currentTarget.style.background = 'rgba(212,175,55,0.18)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.6)';
              }
            }}
            onMouseLeave={e => {
              if (!isActive('/admin')) {
                e.currentTarget.style.background = 'rgba(212,175,55,0.08)';
                e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
              }
            }}
          >
            Admin
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{
              display: 'none',
              background: 'transparent', border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '3px', padding: '6px', cursor: 'pointer', color: '#d4af37',
              alignItems: 'center', justifyContent: 'center',
              marginLeft: '8px',
            }}
            className="mobile-menu-btn"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed', top: '70px', left: 0, right: 0, zIndex: 99,
        background: 'rgba(8,8,8,0.99)',
        borderBottom: '1px solid rgba(212,175,55,0.12)',
        backdropFilter: 'blur(20px)',
        padding: mobileOpen ? '16px 24px 24px' : '0 24px',
        maxHeight: mobileOpen ? '500px' : '0',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Montserrat', sans-serif",
      }}
        className="mobile-drawer"
      >
        {NAV_LINKS.map(link => (
          <Link key={link.to} to={link.to} style={{
            display: 'block', padding: '12px 0',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
            color: isActive(link.to) ? '#d4af37' : 'rgba(245,240,232,0.6)',
            textDecoration: 'none', fontSize: '11px', letterSpacing: '2px',
            textTransform: 'uppercase', fontWeight: 600,
          }}>{link.label}</Link>
        ))}

        <div>
          <button
            onClick={() => setMobileServices(o => !o)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 0', background: 'none', border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              color: 'rgba(245,240,232,0.6)', cursor: 'pointer', fontSize: '11px',
              letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Services
            <ChevronDown size={12} color="#d4af37" style={{
              transform: mobileServices ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s'
            }} />
          </button>
          {mobileServices && (
            <div style={{ paddingLeft: '12px', paddingTop: '4px' }}>
              {loadingServices ? (
                <p style={{ color: 'rgba(212,175,55,0.4)', fontSize: '11px', padding: '10px 0' }}>Loading...</p>
              ) : (
                services.map(s => (
                  <Link key={s.label}
                    to={`/services?type=${s.slug}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 0', color: 'rgba(245,240,232,0.4)',
                      textDecoration: 'none', fontSize: '11px', letterSpacing: '1px',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                    }}
                  >
                    <span>{s.icon}</span> {s.label}
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        <Link to="/admin" style={{
          display: 'block', marginTop: '16px', padding: '12px',
          background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: '3px', color: '#d4af37', textDecoration: 'none',
          textAlign: 'center', fontSize: '11px', letterSpacing: '2px',
          fontWeight: 700, textTransform: 'uppercase',
        }}>Admin Panel</Link>
      </div>

      {/* Spacer */}
      <div style={{ height: '70px' }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .desktop-links { display: none !important; }
          .mobile-drawer { display: block !important; }
        }
      `}</style>
    </>
  );
}

function NavLink({ to, active, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '8px 14px', borderRadius: '2px', textDecoration: 'none',
        color: active ? '#d4af37' : hovered ? '#d4af37' : 'rgba(245,240,232,0.6)',
        fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase',
        fontWeight: 600, fontFamily: "'Montserrat', sans-serif",
        background: active ? 'rgba(212,175,55,0.08)' : hovered ? 'rgba(212,175,55,0.05)' : 'transparent',
        border: active ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
        transition: 'all 0.25s ease',
        position: 'relative',
      }}
    >
      {children}
      {active && (
        <span style={{
          position: 'absolute', bottom: '4px', left: '50%',
          transform: 'translateX(-50%)',
          width: '16px', height: '1px', background: '#d4af37',
          borderRadius: '1px',
        }} />
      )}
    </Link>
  );
}

function DropdownItem({ service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/services?type=${service.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '9px 12px', borderRadius: '3px', textDecoration: 'none',
        color: hovered ? '#d4af37' : 'rgba(245,240,232,0.55)',
        background: hovered ? 'rgba(212,175,55,0.07)' : 'transparent',
        fontSize: '11px', letterSpacing: '1px', whiteSpace: 'nowrap',
        fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
        transition: 'all 0.2s ease',
        borderLeft: hovered ? '2px solid #d4af37' : '2px solid transparent',
      }}
    >
      <span style={{ fontSize: '13px' }}>{service.icon}</span>
      {service.label}
    </Link>
  );
}