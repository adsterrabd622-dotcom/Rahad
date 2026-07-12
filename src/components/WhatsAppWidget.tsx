import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, MessageCircle, Send } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show a gentle greeting tooltip after 4 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    window.open('https://wa.me/8801618315451', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* 1. Interactive Greeting Card / Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-[calc(100vw-2rem)] max-w-[320px] sm:w-80 bg-brand-slate border border-brand-accent/20 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto mb-4"
          >
            {/* Header with photographer avatar */}
            <div className="p-4 bg-brand-dark border-b border-brand-accent/15 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center font-serif text-brand-accent font-bold text-sm">
                    RH
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-brand-slate animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold text-brand-charcoal tracking-wide">
                    RH Rahad Hasan
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-sans">Fine-Art Photographer</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-brand-accent rounded-full transition-colors"
                aria-label="Close chat popup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Conversation Area */}
            <div className="p-4 bg-brand-dark/40 space-y-3">
              <div className="bg-brand-slate p-3 rounded-xl border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-sans max-w-[85%]">
                <p className="font-semibold text-[10px] text-brand-accent mb-1">RAHAD HASAN</p>
                Hello there! 👋 Let me know if you have any questions or want to customize a photography package! How can I help you today?
              </div>
              <p className="text-[9px] font-mono text-zinc-500 text-center uppercase tracking-wider py-1">
                Typically replies within 1 hour
              </p>
            </div>

            {/* CTA Send Button */}
            <div className="p-3 bg-brand-slate border-t border-brand-accent/10 flex">
              <button
                onClick={handleOpenChat}
                className="w-full py-2 px-4 bg-brand-accent hover:bg-brand-accent-light text-brand-dark rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center space-x-2 transition-all duration-300 shadow-md"
              >
                <Send className="h-3 w-3" />
                <span>Start WhatsApp Chat</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Micro Greeting Tooltip (automatically displays, then can be closed) */}
      <AnimatePresence>
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center space-x-2 bg-brand-accent/95 backdrop-blur-md text-brand-dark font-sans text-[10px] sm:text-[11px] font-bold tracking-wide uppercase px-3 py-2 rounded-lg shadow-xl pointer-events-auto mb-3 border border-brand-accent/30 max-w-[calc(100vw-2rem)]"
          >
            <span className="truncate">Need photography service? Let&apos;s chat!</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="p-0.5 hover:bg-brand-dark/10 rounded"
              aria-label="Dismiss message"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Floating Circular Launcher Trigger */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/40 relative border-2 border-emerald-400/20 cursor-pointer pointer-events-auto hover:shadow-emerald-500/20 hover:shadow-2xl transition-all duration-300"
        title="Chat with Rahad on WhatsApp"
        id="whatsapp-floating-btn"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
        <MessageSquare className="h-6 w-6 relative z-10 fill-white/10" />
      </motion.button>

    </div>
  );
}
