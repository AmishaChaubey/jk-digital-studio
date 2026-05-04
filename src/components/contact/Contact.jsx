import React, { useState, useEffect } from "react";
import {
  Phone, Mail, MapPin, Send, User,
  MessageSquare, PhoneCall, ChevronDown, ArrowRight
} from "lucide-react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const contactInfo = [
    { icon: Phone, title: "Call Us", detail: "+91 9958138641", sub: "Available 24/7", href: "tel:+919958138641" },
    { icon: Mail, title: "Email Us", detail: "Kpstudioandphotoframing@gmail.com", sub: "Reply within 24 hrs", href: "mailto:Kpstudioandphotoframing@gmail.com" },
    { icon: MapPin, title: "Visit Studio", detail: "Gate No-4, Parmukh Market, Shop-3", sub: "Greater Noida, UP 201306", href: "#map" },
  ];

  const faqs = [
    { question: "How can I book a photoshoot?", answer: "Fill the contact form or call us. Our team will reach out within 24 hours to schedule your shoot." },
    { question: "Do you offer outdoor photoshoots?", answer: "Yes! We specialize in both indoor and outdoor shoots and can suggest beautiful locations nearby." },
    { question: "What should I wear for my shoot?", answer: "Wear anything that makes you comfortable. We provide outfit guidance based on your shoot theme." },
    { question: "How long for edited photos?", answer: "Edited photos are delivered within 5–7 working days. Express delivery is available on request." },
    { question: "Can I get raw photos too?", answer: "Yes, raw photos are available on request. All files are kept safe for up to 30 days post-shoot." },
    { question: "Do you travel for destination shoots?", answer: "Absolutely! We love destination events and offer custom travel packages for outstation shoots." },
  ];

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://kpstudioandphotoframing.in/backend/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else { alert("Failed: " + data.message); }
    } catch { alert("Something went wrong. Try again."); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* Hero Banner */}
      <div className="relative h-[55vh] sm:h-[65vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('/banner/contact-banner.jpg')", animation: "zoom 15s ease-in-out infinite" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600 z-10"></div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-red-600"></div>
            <p className="text-red-400 text-xs font-bold uppercase tracking-[0.2em]">Get In Touch</p>
            <div className="w-8 h-0.5 bg-red-600"></div>
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Let's Create{" "}
            <span className="text-red-400">Magic</span> Together
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have a photoshoot idea in mind? Reach out and let's make it happen.
          </p>
          <a href="#contact-form">
            <button className="mt-7 inline-flex items-center gap-2 px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl active:scale-95 transition-all duration-200 shadow-lg shadow-red-900/40">
              Book a Session <ArrowRight className="w-4 h-4" />
            </button>
          </a>
        </div>
      </div>

      {/* Info Cards — overlap the banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <a
                key={index}
                href={info.href}
                className="group bg-white border border-gray-100 hover:border-red-200 rounded-2xl p-5 shadow-xl hover:shadow-2xl hover:shadow-red-100 transition-all duration-300 flex items-start gap-4 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl"></div>
                <div className="w-11 h-11 bg-red-50 group-hover:bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <Icon className="w-5 h-5 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">{info.title}</p>
                  <p className="text-sm font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors duration-300">{info.detail}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{info.sub}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Form + Map */}
      <div id="contact-form" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Form */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>

            <div className="mb-7">
              <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em] mb-1">Contact Form</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Send Us a Message
              </h2>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-5 text-red-600 text-sm font-semibold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", name: "name", icon: User, type: "text" },
                    { label: "Phone Number", name: "phone", icon: PhoneCall, type: "tel" },
                  ].map((field) => {
                    const Icon = field.icon;
                    return (
                      <div key={field.name}>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{field.label}</label>
                        <div className="relative">
                          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type={field.type} name={field.name} value={formData[field.name]}
                            onChange={handleInputChange} required
                            placeholder={field.label}
                            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-300 transition-all"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {[
                  { label: "Email", name: "email", icon: Mail, type: "email" },
                  { label: "Subject", name: "subject", icon: MessageSquare, type: "text" },
                ].map((field) => {
                  const Icon = field.icon;
                  return (
                    <div key={field.name}>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{field.label}</label>
                      <div className="relative">
                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={field.type} name={field.name} value={formData[field.name]}
                          onChange={handleInputChange} required
                          placeholder={field.label}
                          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-300 transition-all"
                        />
                      </div>
                    </div>
                  );
                })}

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      name="message" value={formData.message} onChange={handleInputChange}
                      rows="4" required placeholder="Tell us about your shoot..."
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-300 transition-all resize-none"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit" disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all duration-200 shadow-lg shadow-red-200 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : <Send className="w-4 h-4" />}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Map */}
          <div id="map" className="flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex-1 min-h-[300px]">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600 z-10"></div>
              <iframe
                title="Studio Map"
                className="w-full h-full min-h-[300px]"
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d529153.2451992526!2d77.32019303488845!3d28.493852918194584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390cefeb1c19ffad%3A0xf989fc42fb6f281!2sGate%20No%20-%204%2C%20Parmukh%20Market%2C%20Shop-3%2C%20Bisrakh%20Rd%2C%20opposite%20STELLAR%20JEEVAN%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201306!3m2!1d28.565932399999998!2d77.4483253!5e0!3m2!1sen!2sin!4v1764148183184!5m2!1sen!2sin"
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Quick contact strip */}
            <div className="grid grid-cols-2 gap-4">
              <a href="tel:+919958138641" className="group bg-red-600 hover:bg-red-700 rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 active:scale-95">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-xs">Call Now</p>
                  <p className="text-white font-bold text-sm">+91 99581 38641</p>
                </div>
              </a>
              <a href="https://wa.me/919958138641" target="_blank" rel="noreferrer" className="group bg-gray-900 hover:bg-gray-800 rounded-2xl p-4 flex items-center gap-3 transition-all duration-200 active:scale-95">
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white/50 text-xs">WhatsApp</p>
                  <p className="text-white font-bold text-sm">Chat With Us</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-red-600"></div>
              <p className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">FAQ</p>
              <div className="w-8 h-0.5 bg-red-600"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked <span className="text-red-600">Questions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-red-200 shadow-lg shadow-red-50' : 'border-gray-100 shadow-sm'}`}
              >
                <button
                  className="w-full px-5 py-4 flex justify-between items-center text-left gap-3"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className={`font-semibold text-sm leading-snug transition-colors duration-200 ${openFaq === index ? 'text-red-600' : 'text-gray-800'}`}>
                    {faq.question}
                  </h3>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === index ? 'bg-red-600' : 'bg-gray-100'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-white' : 'text-gray-500'}`} />
                  </div>
                </button>
                <div className={`px-5 transition-all duration-300 overflow-hidden ${openFaq === index ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="w-6 h-0.5 bg-red-600 mb-3"></div>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        @keyframes zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}