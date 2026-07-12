import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, MessageSquare, Compass, Calendar, ChevronLeft, ChevronRight, X, Info } from 'lucide-react';
import { PERSONAL_PHOTOS } from '../data';

export default function Hero() {
  const slides = PERSONAL_PHOTOS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-slate py-20">
      {/* Dynamic Background Slideshow with Ken Burns effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: isOpen ? 0.28 : 0.95, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentIndex].url}
              alt={slides[currentIndex].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter saturate-50 contrast-110"
            />
          </motion.div>
        </AnimatePresence>
        {/* Cinematic Vignette Overlays matching Warm Ivory */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/50" />
      </div>

      {/* Manual Slide Controls */}
      <div className="absolute bottom-10 right-4 sm:right-10 z-20 flex items-center space-x-3">
        <button
          onClick={handlePrev}
          className="p-2.5 border border-brand-accent/20 hover:border-brand-accent bg-brand-slate/80 hover:bg-brand-accent text-zinc-300 hover:text-brand-dark rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-mono text-xs font-semibold text-zinc-450">
          {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
        <button
          onClick={handleNext}
          className="p-2.5 border border-brand-accent/20 hover:border-brand-accent bg-brand-slate/80 hover:bg-brand-accent text-zinc-300 hover:text-brand-dark rounded-full transition-all duration-300 shadow-sm backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Hero Content - Redesigned as an Editorial Exhibition Frame */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Main Welcome Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8 p-8 sm:p-12 md:p-16 bg-brand-slate/60 border border-brand-accent/20 shadow-2xl rounded-2xl backdrop-blur-md relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-brand-accent hover:scale-110 transition-all rounded-full bg-brand-dark/40 border border-brand-accent/10 hover:border-brand-accent/30"
                  title="Close welcome card"
                  aria-label="Close welcome card"
                  id="close-welcome-card"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Subtle Decorative Golden Corner Marks */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-brand-accent/40" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-brand-accent/40" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-brand-accent/40" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-brand-accent/40" />

                {/* Tagline Badge */}
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-brand-slate/90 border border-brand-accent/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
                  <span className="text-[9px] uppercase tracking-widest font-mono text-brand-accent font-bold">
                    Available for Bookings Worldwide
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight font-serif text-brand-charcoal leading-tight">
                    Capturing Moments <br />
                    <span className="font-serif italic text-brand-accent text-glow">
                      Whispering Stories
                    </span>
                  </h1>
                  <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 font-sans tracking-wide leading-relaxed">
                    I am <strong className="font-bold text-brand-charcoal">RH Rahad Hasan</strong>, a fine-art photographer specialized in dramatic portraits, breathtaking scenery, and rich street-life storytelling.
                  </p>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <a
                    href="#gallery"
                    className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold tracking-widest uppercase bg-brand-accent text-brand-dark rounded hover:bg-brand-accent-light transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
                  >
                    <Compass className="h-4 w-4" />
                    <span>Explore Portfolio</span>
                  </a>
                  <a
                    href="https://wa.me/8801618315451"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold tracking-widest uppercase border border-brand-accent/30 bg-brand-slate/60 text-brand-accent rounded hover:border-brand-accent hover:bg-brand-slate transition-all duration-300 shadow-sm flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </motion.div>

              {/* Quick Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 p-6 bg-brand-slate/50 rounded-xl border border-brand-accent/15 shadow-md backdrop-blur-sm"
              >
                <div className="text-center p-2 border-r border-zinc-800 last:border-0">
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-brand-accent">500+</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mt-1">Stunning Captures</p>
                </div>
                <div className="text-center p-2 border-r border-zinc-800 last:border-0">
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-brand-accent">150+</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mt-1">Bookings Completed</p>
                </div>
                <div className="text-center p-2 border-r border-zinc-800 last:border-0">
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-brand-accent">5 ★</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mt-1">Customer Reviews</p>
                </div>
                <div className="text-center p-2 last:border-0">
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-brand-accent">Sony</p>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mt-1">Alpha 7 IV gear</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Minimal Float To Re-Open Welcome Card */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex justify-center mt-6"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-brand-accent hover:bg-brand-accent-light text-brand-dark rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all duration-300 flex items-center space-x-2 border border-brand-accent/20"
              id="show-intro-btn"
            >
              <Info className="h-4 w-4" />
              <span>Show Intro Panel</span>
            </button>
          </motion.div>
        )}

        {/* Floating Scroll Down Arrow */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
          <motion.a
            href="#gallery"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center space-y-1 text-zinc-400 hover:text-brand-accent transition-colors duration-300"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
