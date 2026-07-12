import { Camera, Mail, Phone, MapPin, MessageSquare, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark pt-16 pb-8 border-t border-brand-accent/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-brand-accent/10 rounded-lg">
                <Camera className="h-5 w-5 text-brand-accent" />
              </div>
              <span className="font-serif text-lg font-bold tracking-wider text-brand-charcoal">
                RH RAHAD HASAN
              </span>
            </div>
            
            <p className="text-xs text-zinc-400 font-sans leading-relaxed max-w-sm">
              Fine-art photographer based in Bangladesh. Capturing raw emotional narratives, high-contrast structural street views, and deep-toned cinematic portrait frames.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://wa.me/8801618315451"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-zinc-900 hover:bg-zinc-850 text-brand-accent rounded-full border border-zinc-800 transition-all duration-300"
                title="WhatsApp Contact"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
              <span className="text-xs text-zinc-400 font-mono font-bold">01618315451 (WhatsApp)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest font-mono font-bold text-zinc-500">Navigation</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <a href="#hero" className="text-zinc-400 hover:text-brand-accent transition-colors">Hero Intro</a>
              </li>
              <li>
                <a href="#gallery" className="text-zinc-400 hover:text-brand-accent transition-colors">Curated Gallery</a>
              </li>
              <li>
                <a href="#sandbox" className="text-zinc-400 hover:text-brand-accent transition-colors">Lightroom Sandbox</a>
              </li>
              <li>
                <a href="#packages" className="text-zinc-400 hover:text-brand-accent transition-colors">Pricing Packages</a>
              </li>
            </ul>
          </div>

          {/* Studio Location & Booking */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest font-mono font-bold text-zinc-500">Studio Info</h4>
            
            <ul className="space-y-3 text-xs font-semibold">
              <li className="flex items-start space-x-2 text-zinc-400">
                <MapPin className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                <span>Gafargaon, Mymensingh (Available for national &amp; destination bookings)</span>
              </li>
              <li className="flex items-center space-x-2 text-zinc-400">
                <Phone className="h-4 w-4 text-brand-accent shrink-0" />
                <span>+880 1618-315451</span>
              </li>
              <li className="flex items-center space-x-2 text-zinc-400">
                <Mail className="h-4 w-4 text-brand-accent shrink-0" />
                <span>rahadhasan.photography@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom metadata info bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col space-y-1 text-center sm:text-left">
            <p className="text-[11px] text-zinc-500 font-mono font-bold">
              &copy; {currentYear} RH Rahad Hasan. All Rights Reserved.
            </p>
            <p className="text-[9px] text-zinc-500 font-sans tracking-wide">
              Crafted beautifully with high-contrast fine art display layouts.
            </p>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 rounded text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-brand-accent transition-all duration-300 flex items-center space-x-1.5 font-bold"
            title="Scroll to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
