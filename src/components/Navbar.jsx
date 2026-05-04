import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronDown, Calendar, User, Mail, Phone, MessageSquare, Camera,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", eventType: "wedding", eventDate: "", message: "",
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isBookingModalOpen ? "hidden" : "unset";
  }, [isBookingModalOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setIsBookingModalOpen(false); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleServicesMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesOpen(true);
  };
  const handleServicesMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsServicesOpen(false), 200);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://kpstudioandphotoframing.in/backend/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await response.text();
      alert("Booking request submitted! We will contact you soon.");
      setIsBookingModalOpen(false);
      setFormData({ name: "", email: "", phone: "", eventType: "wedding", eventDate: "", message: "" });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isActive = (path) =>
    path === "/services" ? location.pathname.startsWith("/services") : location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];
  const navLinksAfterServices = [
    { name: "Gallery", path: "/gallery" },
    { name: "Video", path: "/videos" },
    { name: "Contact", path: "/contact" },
  ];
  const serviceItems = [
    { name: "Photo Framing", path: "/services/photo-framing" },
    { name: "Photo Printing", path: "/services/photo-printing" },
    { name: "Indoor Shoot", path: "/services/indoor-shoot" },
    { name: "Outdoor Shoot", path: "/services/outdoor-photography" },
    { name: "PVC Cards", path: "/services/pvc-cards" },
    { name: "Baby Shoot", path: "/services/baby-shoot" },
    { name: "Birthday Shoot", path: "/services/birthday" },
    { name: "Visa-Passport", path: "/services/visa-passport" },
    { name: "Live Event Shoot", path: "/services/live-event-photography" },
    { name: "Food Shoot", path: "/services/food-photography" },
    { name: "Wedding Event Shoot", path: "/services/event-photography" },
    { name: "Portrait Shoot", path: "/services/portrait-shoot" },
    { name: "Product Shoot", path: "/services/product-photography" },
    { name: "Maternity Shoot", path: "/services/maternity-shoot" },
    { name: "Wedding Shoot", path: "/services/wedding-photography" },
    { name: "Pre-Wedding Shoot", path: "/services/prewedding-shoot" },
    { name: "Wedding Cinematography", path: "/services/wedding-cinemo" },
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes orb1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(8px, -12px) scale(1.04); }
          66% { transform: translate(-6px, 6px) scale(0.97); }
        }
        @keyframes orb2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-10px, 8px) scale(1.06); }
          66% { transform: translate(8px, -5px) scale(0.95); }
        }
        @keyframes orb3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(5px, 10px) scale(1.03); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .orb-1 { animation: orb1 9s ease-in-out infinite; }
        .orb-2 { animation: orb2 12s ease-in-out infinite 1s; }
        .orb-3 { animation: orb3 7s ease-in-out infinite 2s; }

        .dropdown-animate { animation: slideDown 0.2s ease forwards; }
        .modal-animate { animation: modalUp 0.3s ease forwards; }
        .modal-overlay { animation: fadeIn 0.25s ease forwards; }

        /* Glassmorphism navbar bg */
        .navbar-glass-scrolled {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(220, 38, 38, 0.12);
          box-shadow: 0 4px 32px rgba(0,0,0,0.07), 0 1px 0 rgba(255,255,255,0.9) inset;
        }
        .navbar-glass-top {
          background: rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          border-bottom: 1px solid rgba(255,255,255,0.10);
        }

        /* Orb bg strip */
        .navbar-orb-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        /* Nav link underline effect */
        .nav-link {
          position: relative;
          padding: 6px 12px;
          border-radius: 8px;
          transition: all 0.25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 12px;
          right: 12px;
          height: 1.5px;
          background: #dc2626;
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.3s ease;
          transform-origin: center;
        }
        .nav-link:hover::after,
        .nav-link.is-active::after { transform: scaleX(1); }

        /* Book Now shimmer */
        .book-btn {
          background: linear-gradient(135deg, #991b1b 0%, #b91c1c 40%, #dc2626 60%, #991b1b 100%);
          background-size: 200% auto;
          transition: all 0.35s ease;
        }
        .book-btn:hover {
          background-position: right center;
          box-shadow: 0 6px 24px rgba(153,27,27,0.35), 0 2px 8px rgba(0,0,0,0.15);
          transform: translateY(-1px) scale(1.03);
        }

        /* Mobile menu */
        .mobile-item {
          border-left: 2.5px solid transparent;
          transition: all 0.2s ease;
          border-radius: 0 10px 10px 0;
        }
        .mobile-item:hover { border-left-color: #dc2626; background: #fff1f2; color: #991b1b; }
        .mobile-item.is-active { border-left-color: #991b1b; background: #fee2e2; color: #991b1b; }

        /* Scrollbars */
        .scroll-red::-webkit-scrollbar { width: 4px; }
        .scroll-red::-webkit-scrollbar-track { background: #fef2f2; }
        .scroll-red::-webkit-scrollbar-thumb { background: #b91c1c; border-radius: 4px; }

        /* Inputs */
        .f-input {
          width: 100%;
          padding: 8px 10px 8px 32px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 12px;
          background: #f9fafb;
          transition: all 0.2s ease;
          outline: none;
          color: #111827;
        }
        .f-input:focus {
          border-color: #991b1b;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(153,27,27,0.09);
        }
        .f-select {
          width: 100%;
          padding: 8px 10px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 12px;
          background: #f9fafb;
          transition: all 0.2s ease;
          outline: none;
          color: #111827;
          cursor: pointer;
        }
        .f-select:focus {
          border-color: #991b1b;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(153,27,27,0.09);
        }
      `}</style>

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'navbar-glass-scrolled' : 'navbar-glass-top'}`}>

        {/* Decorative orbs — visible when not scrolled */}
        {!isScrolled && (
          <div className="navbar-orb-bg">
            <div className="orb-1 absolute -top-6 left-[10%] w-28 h-28 rounded-full bg-red-600/20 blur-2xl" />
            <div className="orb-2 absolute -top-4 left-1/2 w-36 h-20 rounded-full bg-rose-500/15 blur-2xl" />
            <div className="orb-3 absolute -top-6 right-[12%] w-24 h-24 rounded-full bg-red-700/20 blur-2xl" />
          </div>
        )}

        {/* Scrolled orbs — subtler */}
        {isScrolled && (
          <div className="navbar-orb-bg">
            <div className="orb-1 absolute top-0 left-[8%] w-20 h-16 rounded-full bg-red-200/40 blur-2xl" />
            <div className="orb-3 absolute top-0 right-[10%] w-24 h-14 rounded-full bg-rose-200/30 blur-2xl" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[68px] sm:h-[76px] md:h-[84px]">

            {/* ── Logo ── */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/logo2.jpg"
                alt="Kanchan Photo Studio"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-md"
              />
            </Link>

            {/* ── Desktop Links ── */}
            <div className="hidden min-[860px]:flex items-center gap-0.5 lg:gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link text-[11px] lg:text-xs font-bold tracking-widest uppercase ${
                    isActive(link.path)
                      ? 'is-active text-red-600'
                      : isScrolled
                      ? 'text-gray-800 hover:text-red-700'
                      : 'text-white hover:text-red-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                <button
                  onClick={() => navigate("/services")}
                  className={`nav-link flex items-center gap-1 text-[11px] lg:text-xs font-bold tracking-widest uppercase ${
                    isActive("/services")
                      ? 'is-active text-red-600'
                      : isScrolled
                      ? 'text-gray-800 hover:text-red-700'
                      : 'text-white hover:text-red-200'
                  }`}
                >
                  Services
                  <ChevronDown size={12} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isServicesOpen && (
                  <div className="dropdown-animate absolute top-full left-0 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/12 border border-gray-100 overflow-hidden mt-3">
                    <div className="absolute -top-1.5 left-5 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                    <div className="max-h-72 overflow-y-auto scroll-red py-1.5">
                      <Link
                        to="/services"
                        className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-black text-red-800 tracking-widest uppercase bg-red-50 border-b border-red-100"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <Camera size={11} /> All Services
                      </Link>
                      {serviceItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-4 py-2.5 text-gray-600 hover:bg-red-800 hover:text-white transition-all duration-150 text-[11px] font-medium"
                          onClick={() => setIsServicesOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {navLinksAfterServices.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link text-[11px] lg:text-xs font-bold tracking-widest uppercase ${
                    isActive(link.path)
                      ? 'is-active text-red-600'
                      : isScrolled
                      ? 'text-gray-800 hover:text-red-700'
                      : 'text-white hover:text-red-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* ── Book Now (desktop) ── */}
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="hidden min-[860px]:flex book-btn items-center gap-2 text-white px-4 lg:px-6 py-2.5 rounded-full font-black tracking-widest uppercase text-[10px] lg:text-[11px] flex-shrink-0"
            >
              <Calendar size={13} />
              Book Now
            </button>

            {/* ── Mobile toggle ── */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`min-[860px]:hidden p-2 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-800 hover:bg-red-50 hover:text-red-700'
                  : 'text-white hover:bg-white/15'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {/* ═══ Mobile Menu ═══ */}
        <div className={`min-[860px]:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[88vh] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {/* Glassmorphism panel */}
          <div className="bg-white/90 backdrop-blur-2xl border-t border-red-100/60 shadow-xl">

            {/* Subtle orb inside mobile menu */}
            <div className="absolute left-0 right-0 h-full overflow-hidden pointer-events-none">
              <div className="absolute top-4 right-6 w-32 h-32 rounded-full bg-red-100/60 blur-3xl" />
              <div className="absolute bottom-4 left-6 w-24 h-24 rounded-full bg-rose-100/50 blur-2xl" />
            </div>

            <div className="relative z-10 px-4 py-3 overflow-y-auto max-h-[80vh] scroll-red">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`mobile-item block px-4 py-3 mb-1 text-[11px] font-black tracking-widest uppercase ${
                    isActive(link.path) ? 'is-active' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Services */}
              <div className="mb-1">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className={`mobile-item w-full flex items-center justify-between px-4 py-3 text-[11px] font-black tracking-widest uppercase ${
                    isActive("/services") ? 'is-active' : 'text-gray-700'
                  }`}
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180 text-red-700' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isServicesOpen ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                  <div className="ml-4 border-l-2 border-red-200 pl-3 overflow-y-auto max-h-56 scroll-red">
                    <Link
                      to="/services"
                      className="block px-3 py-2 text-[10px] font-black text-red-700 tracking-widest uppercase"
                      onClick={() => { setIsMobileMenuOpen(false); setIsServicesOpen(false); }}
                    >
                      All Services
                    </Link>
                    {serviceItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-3 py-2 text-gray-500 hover:text-red-700 text-xs font-medium transition-colors"
                        onClick={() => { setIsMobileMenuOpen(false); setIsServicesOpen(false); }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {navLinksAfterServices.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`mobile-item block px-4 py-3 mb-1 text-[11px] font-black tracking-widest uppercase ${
                    isActive(link.path) ? 'is-active' : 'text-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <button
                onClick={() => { setIsBookingModalOpen(true); setIsMobileMenuOpen(false); }}
                className="book-btn w-full mt-4 mb-3 flex items-center justify-center gap-2 text-white py-3 rounded-2xl font-black tracking-widest uppercase text-[11px]"
              >
                <Calendar size={13} /> Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════ BOOKING MODAL ═══════════════ */}
      {isBookingModalOpen && (
        <div
          className="modal-overlay fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-sm p-0 sm:p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setIsBookingModalOpen(false); }}
        >
          <div className="modal-animate bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[96vh] flex flex-col">

            {/* Banner */}
            <div className="relative h-28 sm:h-32 flex-shrink-0 overflow-hidden">
              <img src="/booknow.jpg" alt="Book Now" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/85 via-red-900/60 to-black/40" />
              {/* Orb in modal banner */}
              <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-rose-500/20 blur-2xl pointer-events-none" />
              <div className="absolute inset-0 flex items-center px-5 sm:px-6">
                <div>
                  <p className="text-red-300 text-[9px] tracking-[0.2em] uppercase font-bold mb-0.5">Kanchan Photo Studio</p>
                  <h2 className="text-white text-xl sm:text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                    Book Your Session
                  </h2>
                  <p className="text-white/60 text-[11px] mt-0.5">We'll reach out to confirm your slot.</p>
                </div>
              </div>
              {/* Mobile drag handle */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/30 rounded-full sm:hidden" />
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-3 right-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white p-1.5 rounded-full transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-5 overflow-y-auto scroll-red flex-1">
              <form onSubmit={handleSubmit} className="space-y-3">

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold mb-1 tracking-widest uppercase">Full Name</label>
                    <div className="relative">
                      <User size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="f-input" placeholder="Your name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold mb-1 tracking-widest uppercase">Phone</label>
                    <div className="relative">
                      <Phone size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="f-input" placeholder="9876543210" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 text-[10px] font-bold mb-1 tracking-widest uppercase">Email</label>
                  <div className="relative">
                    <Mail size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="f-input" placeholder="you@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold mb-1 tracking-widest uppercase">Event Type</label>
                    <select name="eventType" value={formData.eventType} onChange={handleInputChange} className="f-select">
                      <option value="wedding">Wedding</option>
                      <option value="prewedding">Pre-Wedding</option>
                      <option value="birthday">Birthday</option>
                      <option value="babyshoot">Baby Shoot</option>
                      <option value="maternity">Maternity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold mb-1 tracking-widest uppercase">Event Date</label>
                    <div className="relative">
                      <Calendar size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} required className="f-input" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 text-[10px] font-bold mb-1 tracking-widest uppercase">Message</label>
                  <div className="relative">
                    <MessageSquare size={12} className="absolute left-2.5 top-2.5 text-gray-400" />
                    <textarea
                      name="message" value={formData.message} onChange={handleInputChange} rows="2"
                      className="w-full pl-8 pr-3 py-2 border-[1.5px] border-gray-200 rounded-xl text-xs bg-gray-50 focus:border-red-800 focus:outline-none focus:bg-white focus:shadow-[0_0_0_3px_rgba(153,27,27,0.09)] transition-all resize-none text-gray-800"
                      placeholder="Tell us about your event..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`book-btn w-full text-white py-3 rounded-xl font-black tracking-widest uppercase text-[11px] transition-all duration-300 ${
                    isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : "Submit Booking"}
                </button>

              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;