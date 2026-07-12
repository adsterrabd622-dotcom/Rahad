import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, MapPin, Camera, Info, Copy, Check, MessageSquare, Download, ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import { Photo } from '../types';

interface LightboxProps {
  photo: Photo;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ photo, onClose, onPrev, onNext }: LightboxProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const copyColorToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const copyPhotoLink = () => {
    navigator.clipboard.writeText(photo.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const generateWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Rahad! I saw your stunning photo "${photo.title}" on your portfolio. I'm absolutely in love with this style and would like to inquire about booking a similar photography session.`
    );
    return `https://wa.me/8801618315451?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/98 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6">
      
      {/* Absolute Close Header Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-800 transition-all duration-300"
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Main Container Layout */}
      <div className="w-full max-w-6xl bg-zinc-900/50 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative z-10 max-h-[92vh] lg:max-h-[85vh]">
        
        {/* Left Interactive Image Display Panel */}
        <div className="flex-1 relative bg-black/40 flex items-center justify-center min-h-[40vh] sm:min-h-[50vh] lg:min-h-0 select-none overflow-hidden group">
          
          {/* Main Visual Image */}
          <motion.img
            key={photo.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            src={photo.url}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[40vh] sm:max-h-[50vh] lg:max-h-[80vh] object-contain p-2"
          />

          {/* Navigation Overlay Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 p-2.5 sm:p-3 bg-zinc-900/60 hover:bg-brand-accent hover:text-brand-dark text-white rounded-full border border-zinc-800/40 backdrop-blur-sm transition-all duration-300 shadow-md"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 p-2.5 sm:p-3 bg-zinc-900/60 hover:bg-brand-accent hover:text-brand-dark text-white rounded-full border border-zinc-800/40 backdrop-blur-sm transition-all duration-300 shadow-md"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Right Info & Lightroom EXIF Panel */}
        <div className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-l border-zinc-800/80 bg-zinc-900 flex flex-col justify-between overflow-y-auto">
          
          {/* Header Description Section */}
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 text-[9px] uppercase tracking-widest font-mono font-bold bg-zinc-950 text-brand-accent border border-zinc-850 rounded-full">
                {photo.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                {photo.title}
              </h2>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {photo.description}
              </p>
            </div>

            {/* Capture Info Section */}
            <div className="py-4 border-y border-zinc-800/50 flex items-center justify-center space-x-3">
              <div className="p-2 bg-zinc-950 rounded-lg text-brand-accent">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">Captured Date</p>
                <p className="text-xs text-zinc-300 font-medium">{photo.exif.date}</p>
              </div>
            </div>

            {/* Technical EXIF Specifications Dashboard */}
            <div className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-widest font-mono font-bold text-zinc-400 flex items-center space-x-2">
                <Camera className="h-3.5 w-3.5 text-brand-accent" />
                <span>EXIF Specifications</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-2 bg-zinc-950 rounded border border-zinc-800/40 col-span-2">
                  <span className="block text-[8px] uppercase text-zinc-600 font-bold">Camera Body</span>
                  <span className="text-[11px] text-zinc-300 font-medium">{photo.exif.camera}</span>
                </div>
                <div className="p-2 bg-zinc-950 rounded border border-zinc-800/40">
                  <span className="block text-[8px] uppercase text-zinc-600 font-bold">Focal Length</span>
                  <span className="text-[11px] text-zinc-300 font-medium">{photo.exif.focalLength}</span>
                </div>
                <div className="p-2 bg-zinc-950 rounded border border-zinc-800/40">
                  <span className="block text-[8px] uppercase text-zinc-600 font-bold">Aperture</span>
                  <span className="text-[11px] text-brand-accent font-medium">{photo.exif.aperture}</span>
                </div>
                <div className="p-2 bg-zinc-950 rounded border border-zinc-800/40">
                  <span className="block text-[8px] uppercase text-zinc-600 font-bold">Shutter Speed</span>
                  <span className="text-[11px] text-zinc-300 font-medium">{photo.exif.shutterSpeed}</span>
                </div>
                <div className="p-2 bg-zinc-950 rounded border border-zinc-800/40">
                  <span className="block text-[8px] uppercase text-zinc-600 font-bold">Sensitivity ISO</span>
                  <span className="text-[11px] text-zinc-300 font-medium">{photo.exif.iso}</span>
                </div>
              </div>
            </div>

            {/* Dominant Palette Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-[10px] uppercase tracking-widest font-mono font-bold text-zinc-400 flex items-center space-x-2">
                <Palette className="h-3.5 w-3.5 text-brand-accent" />
                <span>Extracted Tone Palette</span>
              </h3>
              
              <div className="flex items-center space-x-2">
                {photo.palette.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => copyColorToClipboard(hex)}
                    className="relative flex-1 aspect-square rounded-md border border-zinc-800 shadow transition-transform duration-200 hover:scale-110 active:scale-95 group/btn"
                    style={{ backgroundColor: hex }}
                    title={`Copy Hex: ${hex}`}
                  >
                    <span className="absolute bottom-1 right-1 opacity-0 group-hover/btn:opacity-100 transition-opacity p-0.5 bg-black/80 rounded">
                      {copiedColor === hex ? (
                        <Check className="h-2 w-2 text-emerald-400" />
                      ) : (
                        <Copy className="h-2 w-2 text-white" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-[9px] text-zinc-500 font-mono italic">
                *Click any tone block to copy color code directly.
              </p>
            </div>
          </div>

          {/* Persistent Booking & Action Buttons Bar */}
          <div className="p-6 bg-zinc-950/80 border-t border-zinc-800/50 space-y-3">
            <a
              href={generateWhatsAppInquiry()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-brand-accent text-brand-dark rounded text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-brand-dark transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-brand-accent/5"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Inquire This Style</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={copyPhotoLink}
                className="py-2 px-3 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-1.5"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
              
              <a
                href={photo.url}
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded text-[11px] font-semibold tracking-wider uppercase transition-colors flex items-center justify-center space-x-1.5 text-center"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Full Size</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
