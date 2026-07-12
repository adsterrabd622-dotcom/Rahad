import { useState, useEffect } from 'react';
import { Camera, Menu, X, MessageSquare, Instagram, Facebook } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Meet Rahad', href: '#artist' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Lightroom Sandbox', href: '#sandbox' },
    { label: 'Packages', href: '#packages' },
    { label: 'Book Session', href: '#book' },
  ];

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-brand-dark/95 backdrop-blur-md border-brand-accent/15 py-3 shadow-2xl' 
          : 'bg-brand-dark/60 backdrop-blur-[4px] border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-1.5 sm:space-x-2 group">
            <div className="p-1.5 sm:p-2 bg-brand-accent/10 rounded-lg group-hover:bg-brand-accent/20 transition-all duration-300">
              <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-brand-accent" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm sm:text-base md:text-lg font-bold tracking-wider text-brand-charcoal">
                RH RAHAD HASAN
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] tracking-widest text-zinc-400 font-semibold uppercase">
                Fine Art Photography
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-xs font-semibold text-zinc-400 hover:text-brand-accent transition-colors duration-200 uppercase tracking-widest"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button & Socials */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/8801618315451"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-zinc-400 hover:text-brand-accent transition-colors font-medium"
              title="Connect on WhatsApp"
            >
              <MessageSquare className="h-4 w-4 text-brand-accent" />
              <span className="text-xs font-mono">01618315451</span>
            </a>
            <span className="text-zinc-800">|</span>
            <a
              href="#book"
              className="px-4 py-2 text-xs font-bold tracking-widest uppercase bg-brand-accent text-brand-dark rounded hover:bg-brand-accent-light transition-all duration-300 shadow-sm"
            >
              Book Session
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-brand-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-slate/95 backdrop-blur-lg absolute top-full left-0 right-0 border-t border-brand-accent/10 py-5 px-6 shadow-2xl animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-xs font-semibold text-zinc-300 hover:text-brand-accent transition-colors duration-200 uppercase tracking-widest py-1"
              >
                {link.label}
              </a>
            ))}
            <hr className="border-brand-accent/10" />
            <div className="flex flex-col space-y-3 pt-2">
              <a
                href="https://wa.me/8801618315451"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-zinc-400 hover:text-brand-accent transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-brand-accent" />
                <span className="text-xs font-mono font-medium">WhatsApp: 01618315451</span>
              </a>
              <a
                href="#book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-bold tracking-widest uppercase bg-brand-accent text-brand-dark rounded hover:bg-brand-accent-light transition-all duration-300"
              >
                Book Session
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
