import React from 'react';
import { Camera, Heart, Sparkles, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-block mb-6">
              <Camera className="text-red-900 mx-auto" size={48} strokeWidth={1.5} />
            </div>
            <h1 className="text-7xl md:text-8xl font-thin text-black mb-6 tracking-wider">
              About Us
            </h1>
            <p className="text-xl text-red-900 font-light tracking-widest uppercase">
              Where Art Meets Photography
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-8">
          <p className="text-2xl text-black font-extralight leading-relaxed text-center">
            We don't just take photographs.
          </p>
          <p className="text-2xl text-black font-extralight leading-relaxed text-center">
            We craft visual poetry that captures the essence of who you are.
          </p>
          <div className="w-24 h-px bg-red-900 mx-auto my-12"></div>
          <p className="text-lg text-black/80 font-light leading-loose text-center">
            Founded in 2014, our studio has been dedicated to the art of storytelling through the lens. 
            Every click of the shutter is intentional. Every frame is carefully composed. 
            Every image tells a story worth remembering.
          </p>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-red-900 py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-thin text-white mb-12 tracking-wide">Our Philosophy</h2>
          <p className="text-xl text-white/90 font-extralight leading-loose">
            Authenticity over perfection. Emotion over pose. Moments over manufactured scenes. 
            We believe the most beautiful photographs are the ones that feel real, raw, and genuine.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="max-w-6xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="text-center space-y-4">
            <Heart className="mx-auto text-red-900" size={40} strokeWidth={1} />
            <h3 className="text-2xl font-light text-black tracking-wide">Passion</h3>
            <p className="text-black/70 font-extralight leading-relaxed">
              Every project is approached with genuine care and artistic dedication
            </p>
          </div>

          <div className="text-center space-y-4">
            <Sparkles className="mx-auto text-red-900" size={40} strokeWidth={1} />
            <h3 className="text-2xl font-light text-black tracking-wide">Creativity</h3>
            <p className="text-black/70 font-extralight leading-relaxed">
              Pushing boundaries and exploring new perspectives in every shoot
            </p>
          </div>

          <div className="text-center space-y-4">
            <Star className="mx-auto text-red-900" size={40} strokeWidth={1} />
            <h3 className="text-2xl font-light text-black tracking-wide">Excellence</h3>
            <p className="text-black/70 font-extralight leading-relaxed">
              Committed to delivering timeless quality in every single frame
            </p>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-black/5 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-6xl font-thin text-red-900 mb-2">10</div>
              <p className="text-sm text-black/60 font-light tracking-widest uppercase">Years</p>
            </div>
            <div>
              <div className="text-6xl font-thin text-red-900 mb-2">800+</div>
              <p className="text-sm text-black/60 font-light tracking-widest uppercase">Clients</p>
            </div>
            <div>
              <div className="text-6xl font-thin text-red-900 mb-2">2K+</div>
              <p className="text-sm text-black/60 font-light tracking-widest uppercase">Sessions</p>
            </div>
            <div>
              <div className="text-6xl font-thin text-red-900 mb-2">15+</div>
              <p className="text-sm text-black/60 font-light tracking-widest uppercase">Awards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <div className="max-w-6xl mx-auto px-6 py-32">
        <h2 className="text-5xl font-thin text-black mb-20 tracking-wide text-center">
          What We Do
        </h2>
        <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
          <div className="space-y-3">
            <h3 className="text-2xl font-light text-red-900">Portrait Photography</h3>
            <p className="text-black/70 font-extralight leading-relaxed">
              Capturing the essence of your personality in timeless portraits
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-light text-red-900">Wedding Photography</h3>
            <p className="text-black/70 font-extralight leading-relaxed">
              Documenting your love story with artistry and emotion
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-light text-red-900">Commercial Shoots</h3>
            <p className="text-black/70 font-extralight leading-relaxed">
              Elevating brands through striking visual narratives
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-light text-red-900">Fine Art Photography</h3>
            <p className="text-black/70 font-extralight leading-relaxed">
              Creating artistic pieces that transcend traditional photography
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-32 border-t border-black/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-thin text-black mb-8 tracking-wide">
            Let's Create Something Beautiful
          </h2>
          <p className="text-lg text-black/60 font-extralight mb-12 leading-relaxed">
            Whether it's a portrait, an event, or a creative project, 
            we'd love to bring your vision to life.
          </p>
          <button className="border-2 border-red-900 text-red-900 px-16 py-4 hover:bg-red-900 hover:text-white transition-all duration-300 font-light tracking-widest uppercase text-sm">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}