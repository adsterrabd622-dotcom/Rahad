import { useState, useMemo, useRef, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import { Sliders, RefreshCw, Sparkles, Image as ImageIcon, Eye, Copy, Check, Type, Upload, Download, Loader2 } from 'lucide-react';
import { PHOTO_DATA } from '../data';

interface Preset {
  name: string;
  exposure: number;
  contrast: number;
  saturation: number;
  warmth: number;
  blur: number;
  vignette: number;
  grayscale: boolean;
  highlights: number;
  shadows: number;
  vibrance: number;
  tint: number;
  clarity: number;
  dehaze: number;
}

export default function InteractiveStudio() {
  const [customPhotos, setCustomPhotos] = useState<any[]>([]);
  
  const allPhotos = useMemo(() => {
    return [...PHOTO_DATA, ...customPhotos];
  }, [customPhotos]);

  const [selectedPhoto, setSelectedPhoto] = useState(PHOTO_DATA[0]);
  
  // Lightroom Tab State
  const [activeTab, setActiveTab] = useState<'light' | 'color' | 'effects' | 'overlay'>('light');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States for Lightroom sliders
  const [exposure, setExposure] = useState<number>(0); // -100 to 100
  const [contrast, setContrast] = useState<number>(100); // 50 to 150
  const [saturation, setSaturation] = useState<number>(100); // 0 to 200
  const [warmth, setWarmth] = useState<number>(0); // -100 to 100
  const [blur, setBlur] = useState<number>(0); // 0 to 8
  const [vignette, setVignette] = useState<number>(0); // 0 to 100
  const [grayscale, setGrayscale] = useState<boolean>(false);
  
  // Advanced Lightroom Controls
  const [highlights, setHighlights] = useState<number>(0); // -100 to 100
  const [shadows, setShadows] = useState<number>(0); // -100 to 100
  const [vibrance, setVibrance] = useState<number>(0); // -100 to 100
  const [tint, setTint] = useState<number>(0); // -100 to 100
  const [clarity, setClarity] = useState<number>(0); // -100 to 100
  const [dehaze, setDehaze] = useState<number>(0); // -100 to 100

  // Interactive "Before & After" compare mode
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const [copiedPresetCode, setCopiedPresetCode] = useState<boolean>(false);

  // Text overlay state
  const [overlayTitle, setOverlayTitle] = useState('');
  const [overlayTitle2, setOverlayTitle2] = useState('');

  const presets: Record<string, Preset> = {
    raw: { name: 'Default RAW', exposure: 0, contrast: 100, saturation: 100, warmth: 0, blur: 0, vignette: 0, grayscale: false, highlights: 0, shadows: 0, vibrance: 0, tint: 0, clarity: 0, dehaze: 0 },
    moody: { name: 'Moody Noir', exposure: -25, contrast: 130, saturation: 65, warmth: -20, blur: 0, vignette: 45, grayscale: false, highlights: -15, shadows: 20, vibrance: -10, tint: 10, clarity: 15, dehaze: 10 },
    vintage: { name: 'Warm Analog', exposure: 5, contrast: 90, saturation: 110, warmth: 35, blur: 1, vignette: 30, grayscale: false, highlights: 10, shadows: -10, vibrance: 20, tint: -5, clarity: -10, dehaze: -5 },
    mono: { name: 'B&W Contrast', exposure: 10, contrast: 145, saturation: 100, warmth: 0, blur: 0, vignette: 25, grayscale: true, highlights: 25, shadows: -15, vibrance: 0, tint: 0, clarity: 30, dehaze: 15 },
    pop: { name: 'Vivid Pop', exposure: 15, contrast: 115, saturation: 140, warmth: 10, blur: 0, vignette: 10, grayscale: false, highlights: 15, shadows: -5, vibrance: 40, tint: 5, clarity: 10, dehaze: 5 },
    dreamy: { name: 'Ethereal Mist', exposure: 20, contrast: 85, saturation: 90, warmth: 15, blur: 4, vignette: 20, grayscale: false, highlights: -20, shadows: 15, vibrance: -15, tint: -10, clarity: -30, dehaze: -20 },
  };

  const applyPreset = (presetKey: keyof typeof presets) => {
    const p = presets[presetKey];
    setExposure(p.exposure);
    setContrast(p.contrast);
    setSaturation(p.saturation);
    setWarmth(p.warmth);
    setBlur(p.blur);
    setVignette(p.vignette);
    setGrayscale(p.grayscale);
    setHighlights(p.highlights);
    setShadows(p.shadows);
    setVibrance(p.vibrance);
    setTint(p.tint);
    setClarity(p.clarity);
    setDehaze(p.dehaze);
  };

  const resetSliders = () => applyPreset('raw');

  // Compute CSS filter string
  const filterStyle = useMemo(() => {
    if (showOriginal) return {};
    
    // Convert exposure, highlights, shadows, dehaze into active brightness multiplier
    const bValue = 1 + (exposure / 200) + (highlights / 400) + (shadows / 600) + (dehaze > 0 ? -dehaze / 300 : 0);
    
    // Contrast adjusted by contrast slider, highlights, shadows, clarity and dehaze
    const cValue = 100 + (contrast - 100) + (highlights / 2) - (shadows / 2) + (clarity * 0.3) + (dehaze * 0.4);
    
    // Saturation boosted by saturation slider, vibrance, and dehaze
    const sValue = grayscale ? 0 : (saturation + (vibrance * 0.7) + (dehaze * 0.3));
    
    // Grayscale
    const grayVal = grayscale ? 100 : 0;

    return {
      filter: `
        brightness(${bValue}) 
        contrast(${cValue}%) 
        saturate(${sValue}%) 
        blur(${blur}px) 
        grayscale(${grayVal}%)
      `,
    };
  }, [exposure, contrast, saturation, blur, grayscale, showOriginal, highlights, shadows, vibrance, clarity, dehaze]);

  // Compute Warmth & Tint blend overlay
  const colorOverlayStyle = useMemo(() => {
    if (showOriginal) return { opacity: 0 };
    if (warmth === 0 && tint === 0) return { opacity: 0 };

    let r = 0, g = 0, b = 0;
    
    // Warmth: Warm amber vs Cool blue
    if (warmth > 0) { r += 245; g += 158; b += 11; }
    else if (warmth < 0) { r += 59; g += 130; b += 246; }
    
    // Tint: Magenta vs Green
    if (tint > 0) { r += 236; g += 72; b += 153; }
    else if (tint < 0) { r += 16; g += 185; b += 129; }

    const hasWarmth = warmth !== 0;
    const hasTint = tint !== 0;
    if (hasWarmth && hasTint) {
      r = Math.round(r / 2);
      g = Math.round(g / 2);
      b = Math.round(b / 2);
    }

    const maxOpacity = 0.22; // Maximum blend intensity
    const warmthIntensity = Math.abs(warmth) / 100;
    const tintIntensity = Math.abs(tint) / 100;
    const intensity = Math.max(warmthIntensity, tintIntensity) * maxOpacity;

    return {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
      opacity: intensity,
    };
  }, [warmth, tint, showOriginal]);

  // Compute Vignette style
  const vignetteOverlayStyle = useMemo(() => {
    if (showOriginal || vignette === 0) return { opacity: 0 };
    const intensity = vignette / 100;
    return {
      background: `radial-gradient(circle, transparent 40%, rgba(0,0,0,${intensity * 0.95}) 100%)`,
    };
  }, [vignette, showOriginal]);

  const copyPresetPresetValues = () => {
    const configString = `preset: {
  exposure: ${exposure},
  contrast: ${contrast},
  saturation: ${saturation},
  highlights: ${highlights},
  shadows: ${shadows},
  vibrance: ${vibrance},
  warmth: ${warmth},
  tint: ${tint},
  clarity: ${clarity},
  dehaze: ${dehaze},
  blur: ${blur},
  vignette: ${vignette},
  grayscale: ${grayscale}
}`;
    navigator.clipboard.writeText(configString);
    setCopiedPresetCode(true);
    setTimeout(() => setCopiedPresetCode(false), 2000);
  };

  // Image Upload Handler
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const newPhoto = {
      id: `upload-${Date.now()}`,
      title: file.name.split('.')[0]?.substring(0, 20) || 'Custom Upload',
      url: url,
      exif: {
        focalLength: 'Adaptive',
        aperture: 'F/1.8',
        shutterSpeed: '1/250s',
        iso: 'Auto'
      },
      category: 'custom'
    };

    setCustomPhotos(prev => [newPhoto, ...prev]);
    setSelectedPhoto(newPhoto);
  };

  // High-Fidelity Custom Download Handler
  const downloadEditedPhoto = () => {
    if (isExporting) return;
    setIsExporting(true);

    const img = new Image();
    // Enable cross-origin for local server images
    img.crossOrigin = 'anonymous';
    img.src = selectedPhoto.url;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          setIsExporting(false);
          alert('Could not render photo editing context.');
          return;
        }

        // Apply filters directly onto high-res canvas
        const bValue = 1 + (exposure / 200) + (highlights / 400) + (shadows / 600) + (dehaze > 0 ? -dehaze / 300 : 0);
        const cValue = 100 + (contrast - 100) + (highlights / 2) - (shadows / 2) + (clarity * 0.3) + (dehaze * 0.4);
        const sValue = grayscale ? 0 : (saturation + (vibrance * 0.7) + (dehaze * 0.3));
        
        // Scale blur dynamically to match high-resolution image size
        const scaleFactor = Math.max(1, (canvas.width / 800));
        const blurValue = blur * scaleFactor;
        const grayValue = grayscale ? 100 : 0;

        ctx.filter = `brightness(${bValue}) contrast(${cValue}%) saturate(${sValue}%) blur(${blurValue}px) grayscale(${grayValue}%)`;
        
        // Draw image under Lightroom filter
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Reset filter before blending non-native overlay effects
        ctx.filter = 'none';

        // 1. Blend Warmth & Tint Layer
        if (!grayscale && (warmth !== 0 || tint !== 0)) {
          let r = 0, g = 0, b = 0;
          if (warmth > 0) { r += 245; g += 158; b += 11; }
          else if (warmth < 0) { r += 59; g += 130; b += 246; }
          
          if (tint > 0) { r += 236; g += 72; b += 153; }
          else if (tint < 0) { r += 16; g += 185; b += 129; }

          const hasWarmth = warmth !== 0;
          const hasTint = tint !== 0;
          if (hasWarmth && hasTint) {
            r = Math.round(r / 2);
            g = Math.round(g / 2);
            b = Math.round(b / 2);
          }

          const maxOpacity = 0.22;
          const warmthIntensity = Math.abs(warmth) / 100;
          const tintIntensity = Math.abs(tint) / 100;
          const intensity = Math.max(warmthIntensity, tintIntensity) * maxOpacity;

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${intensity})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // 2. Apply Custom Vignette
        if (vignette > 0) {
          const intensity = vignette / 100;
          const cx = canvas.width / 2;
          const cy = canvas.height / 2;
          const rInner = Math.min(canvas.width, canvas.height) * 0.35;
          const rOuter = Math.sqrt(cx * cx + cy * cy);

          const grad = ctx.createRadialGradient(cx, cy, rInner, cx, cy, rOuter);
          grad.addColorStop(0, 'transparent');
          grad.addColorStop(1, `rgba(0,0,0,${intensity * 0.95})`);

          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // 3. Draw Cinematic Text Overlay
        if (overlayTitle || overlayTitle2) {
          const ribbonHeight = canvas.height * 0.12;
          const ribbonY = canvas.height - ribbonHeight - (canvas.height * 0.08);

          // Matte dark backing
          ctx.fillStyle = 'rgba(10, 10, 10, 0.7)';
          ctx.fillRect(0, ribbonY, canvas.width, ribbonHeight);

          // Accent border lines
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
          ctx.lineWidth = Math.max(2, Math.round(canvas.height * 0.0015));
          ctx.beginPath();
          ctx.moveTo(0, ribbonY);
          ctx.lineTo(canvas.width, ribbonY);
          ctx.moveTo(0, ribbonY + ribbonHeight);
          ctx.lineTo(canvas.width, ribbonY + ribbonHeight);
          ctx.stroke();

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          if (overlayTitle) {
            const titleFontSize = Math.max(16, Math.round(canvas.height * 0.03));
            ctx.font = `bold ${titleFontSize}px serif`;
            ctx.fillStyle = '#D4AF37'; // Golden Accent
            ctx.fillText(overlayTitle.toUpperCase(), canvas.width / 2, ribbonY + ribbonHeight * 0.36);
          }

          if (overlayTitle2) {
            const subtitleFontSize = Math.max(10, Math.round(canvas.height * 0.015));
            ctx.font = `${subtitleFontSize}px monospace`;
            ctx.fillStyle = '#E4E4E7'; // Zinc-200
            ctx.fillText(overlayTitle2.toUpperCase(), canvas.width / 2, ribbonY + ribbonHeight * 0.72);
          }
        }

        // Export & download trigger
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.download = `rahad_photography_${selectedPhoto.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_edited.jpg`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Export error: ', err);
        alert('Could not download image. Please try uploading another photo or try again.');
      }
      setIsExporting(false);
    };

    img.onerror = () => {
      setIsExporting(false);
      alert('Error loading image source. Please try another image.');
    };
  };

  return (
    <section id="sandbox" className="py-24 bg-brand-slate relative border-t border-zinc-900 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-xs text-brand-accent uppercase tracking-widest font-bold flex items-center justify-center space-x-2">
            <Sliders className="h-3.5 w-3.5" />
            <span>LIGHTROOM PLAYGROUND</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-brand-charcoal tracking-tight">
            Interactive Lightroom Sandbox
          </h2>
          <div className="h-0.5 w-16 bg-brand-accent mx-auto mt-2" />
          <p className="max-w-xl mx-auto text-sm text-zinc-400 font-sans">
            Step into Rahad&apos;s digital darkroom. Select any photograph from the gallery, play with the professional adjustment matrices, or toggle stylistic presets to see visual storytelling come alive.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Preview Frame */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between p-4 sm:p-6 bg-brand-slate border border-brand-accent/15 rounded-2xl shadow-xl min-h-[45vh] sm:min-h-[55vh] lg:min-h-0 select-none">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-zinc-800">
              <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
                <ImageIcon className="h-4 w-4 text-brand-accent shrink-0" />
                <select
                  value={selectedPhoto.id}
                  onChange={(e) => {
                    const found = allPhotos.find(p => p.id === e.target.value);
                    if (found) setSelectedPhoto(found);
                  }}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-semibold px-2 py-1.5 rounded focus:outline-none focus:border-brand-accent transition-colors cursor-pointer w-full max-w-[140px] sm:max-w-xs shrink-0"
                >
                  {allPhotos.map(p => (
                    <option key={p.id} value={p.id} className="bg-brand-slate text-zinc-200">{p.title}</option>
                  ))}
                </select>

                {/* Upload own pic button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center space-x-1 px-2.5 py-1.5 bg-brand-accent/15 border border-brand-accent/30 text-brand-accent hover:bg-brand-accent hover:text-brand-dark rounded text-[10px] uppercase tracking-widest font-mono font-bold transition-all duration-300 shrink-0"
                  title="Upload and edit your own custom image"
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline">Upload Pic</span>
                  <span className="inline xs:hidden">Upload</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Original/Compare Action */}
              <button
                onMouseDown={() => setShowOriginal(true)}
                onMouseUp={() => setShowOriginal(false)}
                onMouseLeave={() => setShowOriginal(false)}
                onTouchStart={() => setShowOriginal(true)}
                onTouchEnd={() => setShowOriginal(false)}
                className="flex items-center justify-center space-x-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-[10px] uppercase tracking-widest font-mono font-bold text-zinc-300 hover:text-white transition-all duration-300 w-full sm:w-auto"
                title="Hold to see original RAW file"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Hold to Compare</span>
              </button>
            </div>

            {/* Live Interactive Sandbox Canvas */}
            <div className="flex-1 my-4 sm:my-6 relative overflow-hidden rounded-lg bg-brand-dark/40 flex items-center justify-center h-[320px] sm:h-[450px] lg:h-[550px] max-h-[50vh] sm:max-h-[60vh] w-full">
              <div className="relative w-full h-full flex items-center justify-center p-2">
                {/* Visual Image */}
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  style={filterStyle}
                  className="max-h-full max-w-full object-contain rounded shadow-md sandbox-image"
                />

                {/* Warmth & Tint blend layer overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-100"
                  style={colorOverlayStyle}
                />

                {/* Vignette layer overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-100"
                  style={vignetteOverlayStyle}
                />

                {/* Custom Fine-Art Text Overlay */}
                {(overlayTitle || overlayTitle2) && (
                  <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs py-2 px-4 border-y border-brand-accent/15 text-center select-none max-w-[85%] mx-auto pointer-events-none rounded-lg shadow-xl">
                    {overlayTitle && (
                      <h4 className="font-serif text-brand-accent text-sm sm:text-base font-bold tracking-widest uppercase">
                        {overlayTitle}
                      </h4>
                    )}
                    {overlayTitle2 && (
                      <p className="font-mono text-[9px] text-zinc-300 tracking-wider mt-0.5 uppercase">
                        {overlayTitle2}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Status Tags */}
              <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
                <span className="px-2 py-0.5 text-[8px] uppercase tracking-widest font-mono font-bold bg-brand-slate/95 backdrop-blur text-brand-accent rounded shadow-sm border border-brand-accent/20">
                  {showOriginal ? 'Original RAW' : 'Custom Developed'}
                </span>
                {!showOriginal && (
                  <span className="px-2 py-0.5 text-[8px] uppercase tracking-widest font-mono font-bold text-zinc-300 bg-brand-slate/95 backdrop-blur rounded shadow-sm border border-brand-accent/15">
                    Focal: {selectedPhoto.exif.focalLength} • {selectedPhoto.exif.aperture}
                  </span>
                )}
              </div>
            </div>

            {/* Status Footer */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono font-semibold text-zinc-400">
              <span className="truncate text-zinc-300">Active Frame: {selectedPhoto.title}</span>
              <span className="hidden sm:inline text-zinc-500">CSS Matrix Enabled</span>
            </div>
          </div>

          {/* Right Panel: Lightroom Controls */}
          <div className="lg:col-span-5 xl:col-span-4 p-6 bg-brand-slate border border-brand-accent/15 rounded-2xl shadow-xl flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Presets Header Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center space-x-1.5">
                  <Sparkles className="h-4 w-4 text-brand-accent" />
                  <span>Creative Presets</span>
                </h3>
                
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(presets) as Array<keyof typeof presets>).map((key) => (
                    <button
                      key={key}
                      onClick={() => applyPreset(key)}
                      className="py-1.5 px-1 bg-zinc-800/80 hover:bg-brand-accent hover:text-brand-dark border border-zinc-700 text-[10px] text-zinc-200 font-bold uppercase tracking-wider text-center transition-all duration-200"
                    >
                      {presets[key].name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-zinc-800" />

              {/* Mobile Lightroom-style Tabbed Control Bar */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center space-x-1.5">
                    <Sliders className="h-4 w-4 text-brand-accent" />
                    <span>Adjustment Panel</span>
                  </h3>
                </div>

                {/* Scrollable Tab Row */}
                <div className="flex border-b border-zinc-800 pb-2 overflow-x-auto no-scrollbar gap-1.5">
                  {[
                    { id: 'light', label: '💡 Light' },
                    { id: 'color', label: '🎨 Color' },
                    { id: 'effects', label: '✨ Effects' },
                    { id: 'overlay', label: '📝 Text' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase transition-all shrink-0 ${
                        activeTab === tab.id
                          ? 'bg-brand-accent text-brand-dark shadow-md'
                          : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/45'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic Content based on active tab */}
                <div className="pt-2 min-h-[220px]">
                  
                  {/* LIGHT TAB */}
                  {activeTab === 'light' && (
                    <div className="space-y-4">
                      {/* Exposure */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Exposure</span>
                          <span className="text-brand-accent font-mono font-bold">{(exposure > 0 ? '+' : '') + (exposure / 100).toFixed(2)} EV</span>
                        </div>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={exposure}
                          onChange={(e) => setExposure(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      {/* Contrast */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Contrast</span>
                          <span className="text-brand-accent font-mono font-bold">{contrast}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          value={contrast}
                          onChange={(e) => setContrast(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      {/* Highlights */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Highlights</span>
                          <span className="text-brand-accent font-mono font-bold">{(highlights > 0 ? '+' : '') + highlights}%</span>
                        </div>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={highlights}
                          onChange={(e) => setHighlights(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      {/* Shadows */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Shadows</span>
                          <span className="text-brand-accent font-mono font-bold">{(shadows > 0 ? '+' : '') + shadows}%</span>
                        </div>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={shadows}
                          onChange={(e) => setShadows(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* COLOR TAB */}
                  {activeTab === 'color' && (
                    <div className="space-y-4">
                      {/* Temp / Warmth */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Temp (Warmth)</span>
                          <span className="text-brand-accent font-mono font-bold">{(warmth > 0 ? '+' : '') + warmth}</span>
                        </div>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={warmth}
                          onChange={(e) => setWarmth(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      {/* Tint */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Tint (Magenta/Green)</span>
                          <span className="text-brand-accent font-mono font-bold">{(tint > 0 ? '+' : '') + tint}</span>
                        </div>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={tint}
                          onChange={(e) => setTint(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      {/* Vibrance */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Vibrance</span>
                          <span className="text-brand-accent font-mono font-bold">{(vibrance > 0 ? '+' : '') + vibrance}%</span>
                        </div>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={vibrance}
                          onChange={(e) => setVibrance(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      {/* Saturation */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Color Saturation</span>
                          <span className="text-brand-accent font-mono font-bold">{grayscale ? 0 : saturation}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={saturation}
                          disabled={grayscale}
                          onChange={(e) => setSaturation(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer disabled:opacity-30"
                        />
                      </div>

                      {/* Monochrome */}
                      <div className="flex items-center space-x-3 pt-2 border-t border-zinc-800/40">
                        <input
                          type="checkbox"
                          id="grayscale-check"
                          checked={grayscale}
                          onChange={(e) => setGrayscale(e.target.checked)}
                          className="h-4 w-4 bg-zinc-800 border-zinc-700 rounded accent-brand-accent cursor-pointer"
                        />
                        <label htmlFor="grayscale-check" className="text-xs text-zinc-300 font-semibold select-none cursor-pointer">
                          Dramatic Monochrome (B&amp;W)
                        </label>
                      </div>
                    </div>
                  )}

                  {/* EFFECTS TAB */}
                  {activeTab === 'effects' && (
                    <div className="space-y-4">
                      {/* Clarity */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Clarity</span>
                          <span className="text-brand-accent font-mono font-bold">{(clarity > 0 ? '+' : '') + clarity}%</span>
                        </div>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={clarity}
                          onChange={(e) => setClarity(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      {/* Dehaze */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Dehaze</span>
                          <span className="text-brand-accent font-mono font-bold">{(dehaze > 0 ? '+' : '') + dehaze}%</span>
                        </div>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={dehaze}
                          onChange={(e) => setDehaze(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      {/* Vignette */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Vignette Depth</span>
                          <span className="text-brand-accent font-mono font-bold">{vignette}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={vignette}
                          onChange={(e) => setVignette(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>

                      {/* Blur */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300 font-semibold">Dreamy Mist (Blur)</span>
                          <span className="text-brand-accent font-mono font-bold">{blur} px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="8"
                          value={blur}
                          onChange={(e) => setBlur(Number(e.target.value))}
                          className="w-full accent-brand-accent h-1 bg-zinc-800 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* OVERLAY TAB */}
                  {activeTab === 'overlay' && (
                    <div className="space-y-4">
                      <p className="text-[10px] text-zinc-400 font-mono leading-relaxed bg-zinc-900/40 p-2.5 rounded border border-zinc-800">
                        Add an elegant fine-art black-bar ribbon style title at the bottom of the photo, which is fully baked in when you export/download the image.
                      </p>
                      
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider block">Overlay Title (Title 1)</label>
                          <input
                            type="text"
                            placeholder="e.g. SOUVENIR OF LIGHT"
                            value={overlayTitle}
                            onChange={(e) => setOverlayTitle(e.target.value)}
                            className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-brand-accent transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider block">Overlay Subtitle (Title 2)</label>
                          <input
                            type="text"
                            placeholder="e.g. FINE-ART COLLECTION 2026"
                            value={overlayTitle2}
                            onChange={(e) => setOverlayTitle2(e.target.value)}
                            className="w-full px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-brand-accent transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Quick Actions Footer Panel */}
            <div className="pt-6 mt-6 border-t border-zinc-800 space-y-3">
              <button
                onClick={downloadEditedPhoto}
                disabled={isExporting}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 text-brand-dark text-xs font-extrabold tracking-widest uppercase rounded transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin text-brand-dark" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span>{isExporting ? 'Exporting High-Res...' : 'Download Edited Photo'}</span>
              </button>

              <button
                onClick={copyPresetPresetValues}
                className="w-full py-2.5 bg-brand-accent hover:bg-brand-accent-light text-xs font-bold tracking-widest uppercase text-brand-dark rounded transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                {copiedPresetCode ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copiedPresetCode ? 'Preset Saved!' : 'Copy Developed Settings'}</span>
              </button>

              <button
                onClick={resetSliders}
                className="w-full py-2.5 bg-zinc-800 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/50 text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-red-400 rounded transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reset to Raw Photo</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
