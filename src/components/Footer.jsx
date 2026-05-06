import React, { useEffect } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Camera,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const serviceLinks = [
    { name: "Birthday Photography", path: "/services/birthday-shoot" },
    { name: "Wedding Photography", path: "/services/wedding-photography" },
    { name: "Live Photography", path: "/services/live-event-photography" },
    { name: "Maternity Photography", path: "/services/maternity-shoot" },
    { name: "Wedding Cinematography", path: "/services/wedding-cinemo" },
    { name: "Event Photography", path: "/services/wedding-photography" },
  ];

  const socials = [
    { Icon: Facebook, label: "Facebook", href: "#" },
    { Icon: Instagram, label: "Instagram", href: "#" },
    { Icon: Twitter, label: "Twitter", href: "#" },
  ];

  return (
    <footer className="bg-gray-950 text-white relative overflow-hidden">
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); opacity: 0.15; }
          50% { transform: translateY(-18px); opacity: 0.25; }
        }
        .float-slow { animation: floatUp 8s ease-in-out infinite; }
        .float-slow-2 { animation: floatUp 11s ease-in-out infinite 2s; }
        .float-slow-3 { animation: floatUp 9s ease-in-out infinite 4s; }
        .footer-link {
          position: relative;
          display: inline-block;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #dc2626;
          transition: width 0.3s ease;
        }
        .footer-link:hover::after { width: 100%; }
      `}</style>

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="float-slow absolute -top-10 -left-10 w-64 h-64 bg-red-900/10 rounded-full blur-3xl" />
        <div className="float-slow-2 absolute top-20 right-0 w-80 h-80 bg-red-800/8 rounded-full blur-3xl" />
        <div className="float-slow-3 absolute bottom-0 left-1/2 w-96 h-48 bg-red-900/6 rounded-full blur-3xl" />
      </div>

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-red-700 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-8">
        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand col — wider */}
          <div className="lg:col-span-4 flex flex-col items-start gap-5">
            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <div>
                <p
                  className="text-white font-bold text-lg leading-tight"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  JK
                </p>
                <p className="text-red-400 text-xs tracking-widest uppercase font-medium">
                  Digital Studio
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              JK Digital Photo Studio – Professional wedding, baby & event
              photography in Noida, capturing emotions and turning moments into
              timeless memories.
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-800 hover:border-red-700 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-red-700 inline-block" />
              Navigate
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="footer-link text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-red-700 inline-block" />
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="footer-link text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
              <span className="w-5 h-px bg-red-700 inline-block" />
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3 items-start group">
                <div className="w-8 h-8 rounded-lg bg-red-900/20 border border-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-red-800/30 transition-colors">
                  <MapPin size={14} className="text-red-400" />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Nav durga Mandir, Nirala Greenshire, Sector 2, Noida, UP
                </p>
              </div>

              <div className="flex gap-3 items-center group">
                <div className="w-8 h-8 rounded-lg bg-red-900/20 border border-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-800/30 transition-colors">
                  <Phone size={14} className="text-red-400" />
                </div>
                <a
                  href="tel:9990607660"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  +91 9990607660, 9990607650
                </a>
              </div>

              <div className="flex gap-3 items-center group">
                <div className="w-8 h-8 rounded-lg bg-red-900/20 border border-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-800/30 transition-colors">
                  <Mail size={14} className="text-red-400" />
                </div>
                <a
                  href="mailto:jaikaran326@gmail.com"
                  className="text-gray-400 hover:text-white text-sm transition-colors break-all"
                >
                  jaikaran326@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-7" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs flex items-center gap-1.5">
            <Camera size={12} className="text-red-700" />
            &copy; {currentYear}{" "}
            <span className="text-gray-300 font-medium mx-1">
              JK Digital Photo Studio
            </span>{" "}
            — All rights reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-1">
            Made with{" "}
            <Heart size={11} className="text-red-700 fill-red-700 mx-0.5" /> by{" "}
            <a
              href="https://deboxtechnology.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white ml-1 transition-colors underline underline-offset-2"
            >
              Debox Technology
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
