import { useState, FormEvent } from 'react';
import { Calendar, User, Sparkles, MessageSquare, MapPin, Check, Plus, Minus, Info } from 'lucide-react';
import { PACKAGES } from '../data';
import { BookingPackage } from '../types';

export default function Booking() {
  const [selectedPkg, setSelectedPkg] = useState<BookingPackage>(PACKAGES[0]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [shootLocation, setShootLocation] = useState('Gafargaon, Mymensingh');
  const [customNotes, setCustomNotes] = useState('');
  
  // Custom Addons
  const [extraHours, setExtraHours] = useState(0);
  const [includeAlbum, setIncludeAlbum] = useState(false);
  const [includeDrone, setIncludeDrone] = useState(false);

  // Parse price from packages (e.g., '৳8,000' -> 8000)
  const basePrice = parseInt(selectedPkg.price.replace(/[^\d]/g, ''), 10);
  
  // Calculate pricing breakdown
  const hourlyRate = 2000;
  const albumCost = 5000;
  const droneCost = 7000;
  
  const totalCost = basePrice + (extraHours * hourlyRate) + (includeAlbum ? albumCost : 0) + (includeDrone ? droneCost : 0);

  const handleWhatsAppSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Please provide your name so Rahad knows who is inquiring.');
      return;
    }

    const formatPrice = (val: number) => `৳${val.toLocaleString()}`;

    // Construct highly organized pre-filled text
    const message = `Hello RH Rahad Hasan!

I would like to inquire about booking a photography session.

📋 *BOOKING INQUIRY DETAIL*
============================
👤 *Client Name:* ${clientName}
📧 *Email:* ${clientEmail || 'Not specified'}
📦 *Package Chosen:* ${selectedPkg.name}
📅 *Preferred Date:* ${bookingDate || 'To be discussed'}
📍 *Shoot Location:* ${shootLocation}

➕ *ADDONS & CUSTOMIZATION:*
----------------------------
• Extra Hours: ${extraHours} hours (+${formatPrice(extraHours * hourlyRate)})
• Premium Printed Photo-album: ${includeAlbum ? 'Yes' : 'No'} (+${includeAlbum ? formatPrice(albumCost) : '৳0'})
• Drone Aerial Coverage: ${includeDrone ? 'Yes' : 'No'} (+${includeDrone ? formatPrice(droneCost) : '৳0'})

💬 *Custom Notes / Creative Vision:*
${customNotes || 'None'}

============================
💰 *Estimated Total Quote:* ${formatPrice(totalCost)}

Please let me know your availability so we can finalize!`;

    // Construct link and open safely
    const encoded = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/8801618315451?text=${encoded}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <section id="packages" className="py-24 bg-brand-dark relative border-t border-zinc-900">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/3 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs text-brand-accent uppercase tracking-widest font-bold flex items-center justify-center space-x-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>INVESTMENT &amp; PACKAGES</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-charcoal tracking-tight">
            Cinematic Photography Packages
          </h2>
          <div className="h-0.5 w-16 bg-brand-accent mx-auto mt-2" />
          <p className="max-w-xl mx-auto text-sm text-zinc-400 font-sans">
            Review professional packages tailored to model portraits, weddings, events, and modern branding. Select a tier to customize.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedPkg.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg)}
                className={`relative p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-brand-slate border-brand-accent shadow-brand-accent/10 shadow-2xl -translate-y-1'
                    : 'bg-brand-slate/40 border-zinc-800 hover:border-brand-accent/30 hover:-translate-y-0.5'
                }`}
              >
                {/* Selected Accent Tag */}
                {isSelected && (
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-brand-accent text-brand-dark font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Selected Category
                  </div>
                )}

                <div className="space-y-6">
                  {/* Package Title & Price */}
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-charcoal">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-serif font-extrabold text-brand-accent">{pkg.price}</span>
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">/ base rate</span>
                  </div>

                  <hr className="border-zinc-800" />

                  {/* Bullet points */}
                  <ul className="space-y-3">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs text-zinc-300">
                        <Check className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => setSelectedPkg(pkg)}
                    className={`w-full py-2.5 text-center text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 ${
                      isSelected
                        ? 'bg-brand-accent text-brand-dark'
                        : 'bg-zinc-800/60 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700/80'
                    }`}
                  >
                    {isSelected ? 'Configure This Tier' : 'Select Package'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Customizer & Booking Form */}
        <div id="book" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-brand-slate border border-brand-accent/15 rounded-2xl p-4 sm:p-8 shadow-xl relative">
          
          {/* Form left Column: Customizer */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-lg font-serif font-bold text-brand-charcoal flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-brand-accent" />
                <span>Customize Your Session</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Currently customizing: <strong className="text-brand-accent">{selectedPkg.name}</strong>
              </p>
            </div>

            <hr className="border-zinc-800" />

            {/* Custom Extra Hours */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-300 font-semibold block">Add Extra Hours</span>
                  <span className="text-[10px] text-zinc-400 font-mono font-bold">+৳2,000 / hour</span>
                </div>
                <div className="flex items-center space-x-3 bg-zinc-900 border border-zinc-800 p-1.5 rounded">
                  <button
                    type="button"
                    onClick={() => setExtraHours(Math.max(0, extraHours - 1))}
                    className="p-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-350 border border-zinc-750 rounded transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-mono text-xs text-brand-charcoal font-bold w-4 text-center">{extraHours}</span>
                  <button
                    type="button"
                    onClick={() => setExtraHours(extraHours + 1)}
                    className="p-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-350 border border-zinc-750 rounded transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Print Photo-album Addon */}
            <div className="flex items-center justify-between p-3 bg-zinc-900/40 border border-zinc-800 rounded">
              <div>
                <span className="text-xs text-zinc-300 font-semibold block">Fine-Art Printed Photoalbum</span>
                <span className="text-[10px] text-zinc-400 font-mono font-bold">Premium 10x12 Matte Print Album (+৳5,000)</span>
              </div>
              <input
                type="checkbox"
                checked={includeAlbum}
                onChange={(e) => setIncludeAlbum(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 text-brand-charcoal accent-brand-accent cursor-pointer"
              />
            </div>

            {/* Drone Addon */}
            <div className="flex items-center justify-between p-3 bg-zinc-900/40 border border-zinc-800 rounded">
              <div>
                <span className="text-xs text-zinc-300 font-semibold block">Aerial Drone Coverage</span>
                <span className="text-[10px] text-zinc-400 font-mono font-bold">4K aerial landscapes &amp; cinematic highlights (+৳7,000)</span>
              </div>
              <input
                type="checkbox"
                checked={includeDrone}
                onChange={(e) => setIncludeDrone(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-700 text-brand-charcoal accent-brand-accent cursor-pointer"
              />
            </div>

            {/* Calculated Pricing Quote Widget */}
            <div className="p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs text-zinc-300">
                <span>Base Rate ({selectedPkg.name}):</span>
                <span className="font-mono font-bold">{selectedPkg.price}</span>
              </div>
              {extraHours > 0 && (
                <div className="flex justify-between items-center text-xs text-zinc-300">
                  <span>Extra Hours ({extraHours} hrs):</span>
                  <span className="font-mono font-bold">৳{(extraHours * hourlyRate).toLocaleString()}</span>
                </div>
              )}
              {includeAlbum && (
                <div className="flex justify-between items-center text-xs text-zinc-300">
                  <span>Fine Art Album Book:</span>
                  <span className="font-mono font-bold">৳{(albumCost).toLocaleString()}</span>
                </div>
              )}
              {includeDrone && (
                <div className="flex justify-between items-center text-xs text-zinc-300">
                  <span>Drone Aerial View:</span>
                  <span className="font-mono font-bold">৳{(droneCost).toLocaleString()}</span>
                </div>
              )}
              <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-sm font-bold">
                <span className="text-zinc-200">Estimated Investment:</span>
                <span className="text-brand-accent text-lg font-serif font-bold">৳{totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Form Right Column: Booking Inputs */}
          <form onSubmit={handleWhatsAppSubmit} className="lg:col-span-7 space-y-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-brand-charcoal flex items-center space-x-2">
                <User className="h-4 w-4 text-brand-accent" />
                <span>Contact Details &amp; Inquiry</span>
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Complete this form to generate and send a pre-formatted booking card directly to Rahad&apos;s WhatsApp.
              </p>
            </div>

            <hr className="border-zinc-800" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold block">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahad Hasan"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold block">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. rahad@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold block">Preferred Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-100 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>

              {/* Location */}
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold block">Shoot Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="e.g. Sreemangal, Sylhet"
                    value={shootLocation}
                    onChange={(e) => setShootLocation(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Custom description */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold block">Creative Vision &amp; Ideas</label>
              <textarea
                rows={3}
                placeholder="Share your concepts, preferred look, outfits, or specific questions..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-brand-accent transition-colors resize-none"
              />
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-brand-accent hover:bg-brand-accent-light text-brand-dark rounded text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span>Submit Inquiry via WhatsApp</span>
              </button>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-zinc-400 justify-center">
              <Info className="h-3.5 w-3.5 text-zinc-500" />
              <span>Clicking submit securely opens a dynamic preformatted chat directly to Rahad.</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
