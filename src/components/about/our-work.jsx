import React, { useState } from 'react';
import { Camera, Award, Users, Aperture, Film, Zap, Clock, Target } from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-950 via-red-900 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <div className="mb-8 flex justify-center gap-4">
            <Camera className="text-white animate-bounce" size={48} />
            <Aperture className="text-white animate-spin" size={48} style={{animationDuration: '3s'}} />
            <Film className="text-white animate-bounce" size={48} style={{animationDelay: '0.2s'}} />
          </div>
          <h1 className="text-8xl md:text-9xl font-bold text-white mb-6 tracking-tight">
            About <span className="text-red-500">Us</span>
          </h1>
          <p className="text-2xl text-white/90 font-light mb-8 italic">
            Crafting Visual Masterpieces Since 2014
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-red-900 px-8 py-3 rounded-lg font-semibold hover:bg-red-100 transition-all transform hover:scale-105">
              Our Portfolio
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-900 transition-all transform hover:scale-105">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="sticky top-0 bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 border-b-2 border-gray-200">
            {['story', 'team', 'process', 'awards'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'text-red-900 border-b-4 border-red-900'
                    : 'text-black/60 hover:text-red-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Content Based on Active Tab */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {activeTab === 'story' && (
          <div className="space-y-16 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold text-black mb-6">
                  Our <span className="text-red-900">Journey</span>
                </h2>
                <p className="text-lg text-black/80 leading-relaxed mb-4">
                  What started as a passion project in a small studio apartment has grown into one of the most sought-after photography studios in the region. Our journey has been fueled by an unwavering commitment to excellence and innovation.
                </p>
                <p className="text-lg text-black/80 leading-relaxed">
                  We've photographed countless weddings, portraits, and commercial projects, each one pushing us to explore new creative boundaries and techniques.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-900 to-red-950 p-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform">
                <div className="text-center text-white space-y-6">
                  <Camera size={80} className="mx-auto mb-4" />
                  <h3 className="text-3xl font-bold">10+ Years</h3>
                  <p className="text-xl">Of Excellence in Photography</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-red-50 p-8 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-2">
                <Zap className="text-red-900 mb-4" size={40} />
                <h3 className="text-2xl font-bold text-black mb-3">Innovation</h3>
                <p className="text-black/70">Using cutting-edge technology and techniques to create stunning visuals</p>
              </div>
              <div className="bg-red-50 p-8 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-2">
                <Target className="text-red-900 mb-4" size={40} />
                <h3 className="text-2xl font-bold text-black mb-3">Precision</h3>
                <p className="text-black/70">Every detail matters in creating the perfect shot</p>
              </div>
              <div className="bg-red-50 p-8 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-2">
                <Clock className="text-red-900 mb-4" size={40} />
                <h3 className="text-2xl font-bold text-black mb-3">Timeless</h3>
                <p className="text-black/70">Creating memories that last for generations</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-16 animate-fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-black mb-4">
                Meet Our <span className="text-red-900">Creative Team</span>
              </h2>
              <p className="text-xl text-black/60">The artists behind the lens</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { name: 'Alexandra Rivers', role: 'Lead Photographer & Founder', exp: '12 years', specialty: 'Wedding & Portrait' },
                { name: 'Marcus Thompson', role: 'Commercial Photography Director', exp: '10 years', specialty: 'Fashion & Product' },
                { name: 'Sofia Chen', role: 'Creative Director', exp: '8 years', specialty: 'Editorial & Art' }
              ].map((member, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                  <div className="bg-gradient-to-br from-red-900 to-black h-80 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Camera size={100} className="text-white/20" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-red-400 font-semibold mb-2">{member.role}</p>
                    <div className="flex justify-between text-sm text-white/80">
                      <span>{member.exp} experience</span>
                      <span>{member.specialty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-16 animate-fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-black mb-4">
                Our <span className="text-red-900">Creative Process</span>
              </h2>
              <p className="text-xl text-black/60">From concept to final masterpiece</p>
            </div>

            <div className="relative">
              {[
                { step: '01', title: 'Consultation', desc: 'We start by understanding your vision, goals, and unique story', icon: Users },
                { step: '02', title: 'Planning', desc: 'Detailed planning of locations, themes, and creative direction', icon: Target },
                { step: '03', title: 'Shooting', desc: 'Professional shoot with state-of-the-art equipment and techniques', icon: Camera },
                { step: '04', title: 'Post-Production', desc: 'Expert editing and retouching to perfect every image', icon: Zap },
                { step: '05', title: 'Delivery', desc: 'Final high-resolution images delivered in your preferred format', icon: Award }
              ].map((process, idx) => (
                <div key={idx} className="flex gap-8 mb-12 group">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-red-900 text-white rounded-full flex items-center justify-center text-3xl font-bold group-hover:scale-110 transition-transform shadow-lg">
                      {process.step}
                    </div>
                  </div>
                  <div className="flex-grow bg-white border-2 border-red-900/20 rounded-xl p-8 hover:border-red-900 hover:shadow-xl transition-all">
                    <div className="flex items-start gap-4">
                      <process.icon className="text-red-900 flex-shrink-0 mt-1" size={32} />
                      <div>
                        <h3 className="text-2xl font-bold text-black mb-3">{process.title}</h3>
                        <p className="text-lg text-black/70">{process.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'awards' && (
          <div className="space-y-16 animate-fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-black mb-4">
                Recognition & <span className="text-red-900">Awards</span>
              </h2>
              <p className="text-xl text-black/60">Celebrating excellence in photography</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { year: '2024', award: 'Best Wedding Photography Studio', org: 'International Photography Awards' },
                { year: '2023', award: 'Commercial Photography Excellence', org: 'National Photo Guild' },
                { year: '2023', award: 'Portrait Photographer of the Year', org: 'Creative Arts Foundation' },
                { year: '2022', award: 'Innovation in Photography', org: 'Digital Arts Council' },
                { year: '2022', award: 'Studio of the Year', org: 'Photography Masters' },
                { year: '2021', award: 'Editorial Photography Award', org: 'Visual Arts Society' },
                { year: '2020', award: 'Emerging Studio Award', org: 'Photography Institute' },
                { year: '2019', award: 'Creative Excellence Award', org: 'Arts & Media Association' }
              ].map((award, idx) => (
                <div key={idx} className="bg-gradient-to-br from-red-900 to-red-950 p-6 rounded-xl text-white hover:scale-105 transition-transform shadow-lg">
                  <Award size={40} className="mb-4" />
                  <div className="text-3xl font-bold mb-2">{award.year}</div>
                  <h3 className="font-bold mb-2">{award.award}</h3>
                  <p className="text-sm text-white/80">{award.org}</p>
                </div>
              ))}
            </div>

            <div className="bg-black/5 rounded-2xl p-12 text-center">
              <h3 className="text-3xl font-bold text-black mb-4">Numbers That Speak</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                <div>
                  <div className="text-5xl font-bold text-red-900 mb-2">800+</div>
                  <p className="text-black/70 font-semibold">Happy Clients</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-red-900 mb-2">2000+</div>
                  <p className="text-black/70 font-semibold">Projects Done</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-red-900 mb-2">15+</div>
                  <p className="text-black/70 font-semibold">Awards Won</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-red-900 mb-2">10+</div>
                  <p className="text-black/70 font-semibold">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-900 via-red-950 to-black py-24">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Create Magic?</h2>
          <p className="text-xl text-white/90 mb-10">
            Let's capture your moments and turn them into timeless memories that you'll cherish forever.
          </p>
          <div className="flex gap-6 justify-center">
            <button className="bg-white text-red-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-red-100 transition-all transform hover:scale-105 shadow-xl">
              Book Your Session
            </button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-900 transition-all transform hover:scale-105">
              View Gallery
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}