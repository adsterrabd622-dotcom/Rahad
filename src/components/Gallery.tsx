import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Sliders, Search, Camera, Sparkles } from 'lucide-react';
import { PHOTO_DATA } from '../data';
import { Photo } from '../types';

interface GalleryProps {
  onPhotoSelect: (photo: Photo) => void;
}

export default function Gallery({ onPhotoSelect }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Portraits', 'Nature', 'Urban', 'Creative'];

  const filteredPhotos = useMemo(() => {
    return PHOTO_DATA.filter((photo) => {
      const matchesCategory = selectedCategory === 'All' || photo.category === selectedCategory;
      const matchesSearch =
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.exif.camera.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="gallery" className="py-24 bg-brand-dark border-t border-zinc-900 relative overflow-hidden">
      {/* Decorative subtle glowing backgrounds */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-accent-light/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs text-brand-accent uppercase tracking-widest font-bold flex items-center justify-center space-x-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>EXQUISITE PORTFOLIO</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-charcoal tracking-tight">
            Curated Visual Storytelling
          </h2>
          <div className="h-0.5 w-16 bg-brand-accent mx-auto mt-2" />
          <p className="max-w-xl mx-auto text-sm text-zinc-400 font-sans">
            Explore authentic fine-art photography captured through a creative lens, balancing light, geometry, and real human expression.
          </p>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 p-4 bg-brand-slate border border-brand-accent/15 rounded-xl shadow-lg">
          
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-brand-accent text-brand-dark shadow-md'
                    : 'bg-zinc-800/60 hover:bg-zinc-700/80 text-zinc-300 hover:text-white border border-zinc-700/40'
                }`}
              >
                {category === 'All' ? 'All Captures' : category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search by title, gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-800/40 border border-zinc-700/60 text-sm text-zinc-200 placeholder-zinc-500 rounded focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/20 transition-all duration-300 font-sans"
            />
          </div>
        </div>

        {/* Masonry/Grid Showcase */}
        {filteredPhotos.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo) => (
                <motion.div
                  layout
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onPhotoSelect(photo)}
                  className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-brand-accent/10 bg-brand-slate cursor-pointer shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-accent/10 hover:border-brand-accent/45"
                >
                  {/* Photo Image */}
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Aesthetic Shadow Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest font-mono font-bold bg-brand-dark/80 backdrop-blur-md text-brand-accent rounded-full border border-brand-accent/20">
                      {photo.category}
                    </span>
                  </div>

                  {/* Metadata Overlay Detail */}
                  <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    
                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-brand-accent-light transition-colors duration-300">
                      {photo.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-zinc-300 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                      {photo.description}
                    </p>

                    {/* EXIF Quick Strip */}
                    <div className="flex items-center space-x-3 mt-3 pt-3 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center space-x-1 text-[10px] font-mono text-zinc-300">
                        <Camera className="h-3.5 w-3.5 text-zinc-400" />
                        <span>{photo.exif.focalLength}</span>
                      </div>
                      <span className="text-zinc-600">•</span>
                      <div className="text-[10px] font-mono text-zinc-300">
                        {photo.exif.aperture}
                      </div>
                      <span className="text-zinc-600">•</span>
                      <div className="text-[10px] font-mono text-zinc-300">
                        ISO {photo.exif.iso}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Quick View Indicator */}
                  <div className="absolute top-4 right-4 z-10 p-2 rounded-full bg-brand-accent/95 text-white opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-md">
                    <Eye className="h-4 w-4" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-brand-slate border border-brand-accent/15 rounded-2xl shadow-xl">
            <Sliders className="h-10 w-10 text-zinc-500 mx-auto mb-4" />
            <p className="text-zinc-300 font-bold font-sans">No captures found matching your query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-bold text-brand-accent hover:underline uppercase tracking-widest"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
