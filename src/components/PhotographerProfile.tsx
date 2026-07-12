import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, BookOpen, Layers, Award, Aperture, Cpu } from 'lucide-react';
import { PERSONAL_PHOTOS } from '../data';
import { Photo } from '../types';

interface PhotographerProfileProps {
  onPhotoSelect: (photo: Photo) => void;
}

export default function PhotographerProfile({ onPhotoSelect }: PhotographerProfileProps) {
  const [activeTab, setActiveTab] = useState<'journey' | 'style' | 'gear'>('journey');
  const [hoveredPhotoId, setHoveredPhotoId] = useState<string | null>(null);

  const tabs = [
    { id: 'journey' as const, label: 'My Journey', icon: BookOpen },
    { id: 'style' as const, label: 'Visual Style', icon: Layers },
    { id: 'gear' as const, label: 'My Gear', icon: Camera },
  ];

  return (
    <section id="artist" className="py-24 bg-brand-dark border-t border-brand-accent/10 relative overflow-hidden">
      {/* Warm Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs text-brand-accent uppercase tracking-widest font-bold flex items-center justify-center space-x-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>THE CREATIVE MIND</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-charcoal tracking-tight">
            Meet Rahad Hasan
          </h2>
          <div className="h-0.5 w-16 bg-brand-accent mx-auto mt-2" />
          <p className="max-w-xl mx-auto text-sm text-zinc-400 font-sans">
            The visionary artist behind the viewfinder, sculpting raw emotions, natural geometry, and timeless light.
          </p>
        </div>

        {/* Profile Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Biography & Interactive Storyteller */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-brand-accent font-mono text-xs tracking-wider uppercase font-bold">Lead Visual Artist</span>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-brand-charcoal leading-tight">
                Crafting fine-art memories &amp; cinematic frames
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-sans">
                I believe that photography is not just about capturing a scene, but preserving the invisible whisper of the soul. Through soft organic lighting and intentional compositions, I reveal the profound beauty in every subject.
              </p>
            </div>

            {/* Interactive Tabs */}
            <div className="space-y-4">
              <div className="flex border-b border-zinc-800 gap-1 sm:gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'border-brand-accent text-brand-accent bg-brand-accent/5'
                          : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="min-h-[140px] p-5 rounded-xl bg-brand-slate border border-brand-accent/15 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  {activeTab === 'journey' && (
                    <motion.div
                      key="journey"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <h4 className="font-serif text-brand-charcoal font-bold text-base flex items-center space-x-2">
                        <Award className="h-4 w-4 text-brand-accent" />
                        <span>The Journey of Light</span>
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        Starting as a passion for rural geometry and candid streets, my journey evolved into a deep dedication to professional fine-art portraits. Based in Gafargaon, Mymensingh, I travel nationwide to document high-end events, modeling portfolios, and corporate visual campaigns.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'style' && (
                    <motion.div
                      key="style"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <h4 className="font-serif text-brand-charcoal font-bold text-base flex items-center space-x-2">
                        <Aperture className="h-4 w-4 text-brand-accent" />
                        <span>Atmospheric Minimalism</span>
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        My signature style emphasizes rich shadows, complementary color palettes, and natural light sculpting. I skip the clinical over-processed look to deliver deep, cinematic stories with organic warmth and rich analog grain textures.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'gear' && (
                    <motion.div
                      key="gear"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <h4 className="font-serif text-brand-charcoal font-bold text-base flex items-center space-x-2">
                        <Cpu className="h-4 w-4 text-brand-accent" />
                        <span>The Darkroom Hardware</span>
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        I create high-fidelity captures using the 33MP high-resolution sensor of the <strong>Sony Alpha 7 IV</strong>. Paired with professional high-speed glass to maintain absolute pixel-perfect output, framing rich textures and natural geometric contrasts.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Unique Personal Portraits Design */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row gap-6 justify-center items-center">
            {PERSONAL_PHOTOS.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onClick={() => onPhotoSelect(photo)}
                onMouseEnter={() => setHoveredPhotoId(photo.id)}
                onMouseLeave={() => setHoveredPhotoId(null)}
                className={`relative w-full sm:w-[240px] aspect-[3/4] rounded-2xl overflow-hidden border cursor-pointer shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  index % 2 === 1 ? 'sm:translate-y-8' : ''
                } ${
                  hoveredPhotoId === photo.id 
                    ? 'border-brand-accent shadow-brand-accent/20 scale-102' 
                    : 'border-zinc-800 bg-brand-slate'
                }`}
              >
                {/* Photo Image */}
                <img
                  src={photo.url}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  style={{
                    transform: hoveredPhotoId === photo.id ? 'scale(1.04)' : 'scale(1)'
                  }}
                />

                {/* Aesthetic Gradient Cover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Small Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-0.5 text-[8px] uppercase tracking-wider font-mono font-bold bg-brand-accent text-white rounded border border-brand-accent/20">
                    {index === 0 ? 'CREATOR' : 'VISION'}
                  </span>
                </div>

                {/* Exif Quick Info */}
                <div className="absolute inset-x-0 bottom-0 p-5 space-y-2 flex flex-col justify-end">
                  <h4 className="font-serif text-sm font-bold text-white tracking-wide">
                    {photo.title}
                  </h4>
                  <div className="h-px bg-white/20 w-full" />
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-300">
                    <span>{photo.exif.camera}</span>
                    <span className="text-brand-accent-light font-semibold">{photo.exif.aperture} • {photo.exif.shutterSpeed}</span>
                  </div>
                </div>

                {/* Overlay Hover Icon */}
                <div className="absolute top-4 right-4 p-2 bg-brand-accent/90 rounded-full text-white opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow">
                  <Aperture className="h-3 w-3 animate-spin-slow" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
