import { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PhotographerProfile from './components/PhotographerProfile';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import InteractiveStudio from './components/InteractiveStudio';
import Booking from './components/Booking';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import { PHOTO_DATA, TESTIMONIALS, PERSONAL_PHOTOS } from './data';
import { Photo } from './types';
import { Star, Quote, Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Filtered dataset for Lightbox next/prev navigation
  const activePhotos = useMemo(() => {
    if (selectedPhoto && PERSONAL_PHOTOS.some((p) => p.id === selectedPhoto.id)) {
      return PERSONAL_PHOTOS;
    }
    return PHOTO_DATA;
  }, [selectedPhoto]);

  const currentPhotoIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return activePhotos.findIndex((p) => p.id === selectedPhoto.id);
  }, [selectedPhoto, activePhotos]);

  const handlePrevPhoto = () => {
    if (currentPhotoIndex === -1) return;
    const prevIndex = (currentPhotoIndex - 1 + activePhotos.length) % activePhotos.length;
    setSelectedPhoto(activePhotos[prevIndex]);
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex === -1) return;
    const nextIndex = (currentPhotoIndex + 1) % activePhotos.length;
    setSelectedPhoto(activePhotos[nextIndex]);
  };

  return (
    <div className="bg-brand-dark min-h-screen text-zinc-100 flex flex-col justify-between selection:bg-brand-accent selection:text-brand-dark">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Cinematic Hero Section */}
      <Hero />

      {/* 2.5. Meet the Photographer Profile Section */}
      <PhotographerProfile onPhotoSelect={setSelectedPhoto} />

      {/* 3. Filterable Bento Grid Gallery */}
      <Gallery onPhotoSelect={setSelectedPhoto} />

      {/* 4. Lightroom Adjustment Sandbox Playground */}
      <InteractiveStudio />

      {/* 5. Pricing Investment Packages & WhatsApp Booking Customizer */}
      <Booking />

      {/* 6. Testimonial Section */}
      <section className="py-24 bg-brand-dark/95 border-t border-brand-accent/15 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="font-mono text-xs text-brand-accent uppercase tracking-widest font-bold flex items-center justify-center space-x-2">
              <Star className="h-3.5 w-3.5 fill-brand-accent text-brand-accent" />
              <span>TESTIMONIALS</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-charcoal tracking-tight">
              Client Appreciations
            </h2>
            <div className="h-0.5 w-16 bg-brand-accent mx-auto mt-2" />
          </div>

          {/* Testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-8 bg-brand-slate border border-brand-accent/10 rounded-2xl relative flex flex-col justify-between space-y-6 shadow-sm hover:border-brand-accent/30 hover:shadow-brand-accent/5 transition-all duration-300"
              >
                {/* Floating quote badge */}
                <div className="absolute top-6 right-8 text-zinc-800">
                  <Quote className="h-8 w-8 fill-zinc-900 opacity-60" />
                </div>

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-brand-accent text-brand-accent" />
                    ))}
                  </div>

                  <p className="text-xs text-zinc-300 font-sans italic leading-relaxed">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div>
                  <h4 className="font-serif text-sm font-bold text-brand-charcoal">{t.name}</h4>
                  <p className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider font-semibold mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Footer Info Bar */}
      <Footer />

      {/* 8. WhatsApp Floating Chat Popup */}
      <WhatsAppWidget />

      {/* 9. Fullscreen EXIF Lightbox Modal Overlay */}
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onPrev={handlePrevPhoto}
          onNext={handleNextPhoto}
        />
      )}
    </div>
  );
}
