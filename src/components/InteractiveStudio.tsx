import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sliders, RefreshCw, Sparkles, Image as ImageIcon, Eye, Copy, Check, Type } from 'lucide-react';
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
}

export default function InteractiveStudio() {
  const [selectedPhoto, setSelectedPhoto] = useState(PHOTO_DATA[0]);
  
  // States for Lightroom sliders
  const [exposure, setExposure] = useState<number>(0); // -100 to 100
  const [contrast, setContrast] = useState<number>(100); // 50 to 150
  const [saturation, setSaturation] = useState<number>(100); // 0 to 200
  const [warmth, setWarmth] = useState<number>(0); // -100 to 100
  const [blur, setBlur] = useState<number>(0); // 0 to 8
  const [vignette, setVignette] = useState<number>(0); // 0 to 100
  const [grayscale, setGrayscale] = useState<boolean>(false);
  
  // Interactive "Before & After" compare mode
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const [copiedPresetCode, setCopiedPresetCode] = useState<boolean>(false);

  // Text overlay state
  const [overlayTitle, setOverlayTitle] = useState('');
  const [overlayTitle2, setOverlayTitle2] = useState('');

  const presets: Record<string, Preset> = {
    raw: { name: 'Default RAW', exposure: 0, contrast: 100, saturation: 100, warmth: 0, blur: 0, vignette: 0, grayscale: false },
    moody: { name: 'Moody Noir', exposure: -25, contrast: 130, saturation: 60, warmth: -20, blur: 0, vignette: 45, grayscale: false },
    vintage: { name: 'Warm Analog', exposure: 5, contrast: 90, saturation: 110, warmth: 35, blur: 1, vignette: 30, grayscale: false },
    mono: { name: 'B&W Contrast', exposure: 10, contrast: 145, saturation: 100, warmth: 0, blur: 0, vignette: 25, grayscale: true },
    pop: { name: 'Vivid Pop', exposure: 15, contrast: 115, saturation: 150, warmth: 10, blur: 0, vignette: 10, grayscale: false },
    dreamy: { name: 'Ethereal Mist', exposure: 20, contrast: 85, saturation: 90, warmth: 15, blur: 4, vignette: 20, grayscale: false },
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
  };

  const resetSliders = () => applyPreset('raw');

  // Compute CSS filter string
  const filterStyle = useMemo(() => {
    if (showOriginal) return {};
    
    // Convert exposure from percentage (-100 to 100) to brightness scale (0.5 to 1.5)
    const brightness = 1 + exposure / 200;
    
    // Grayscale
    const grayVal = grayscale ? 100 : 0;

    return {
      filter: `
        brightness(${brightness}) 
        contrast(${contrast}%) 
        saturate(${grayscale ? 0 : saturation}%) 
        blur(${blur}px) 
        grayscale(${grayVal}%)
      `,
    };
  }, [exposure, contrast, saturation, blur, grayscale, showOriginal]);

  // Compute Warmth/Tint overlay
  const warmthOverlayStyle = useMemo(() => {
    if (showOriginal || warmth === 0) return { opacity: 0 };
    const color = warmth > 0 ? 'rgba(212, 175, 55, 0.12)' : 'rgba(59, 130, 246, 0.1)';
    const intensity = Math.abs(warmth) / 100;
    return {
      backgroundColor: color,
      opacity: intensity,
    };
  }, [warmth, showOriginal]);

  // Compute Vignette style
  const vignetteOverlayStyle = useMemo(() => {
    if (showOriginal || vignette === 0) return { opacity: 0 };
    const intensity = vignette / 100;
    return {
      background: `radial-gradient(circle, transparent 40%, rgba(0,0,0,${intensity * 0.9}) 100%)`,
    };
  }, [vignette, showOriginal]);

  const copyPresetPresetValues = () => {
    const configString = `preset: {
  exposure: ${exposure},
  contrast: ${contrast},
  saturation: ${saturation},
  warmth: ${warmth},
  blur: ${blur},
  vignette: ${vignette},
  grayscale: ${grayscale}
}`;
    navigator.clipboard.writeText(configString);
    setCopiedPresetCode(true);
    setTimeout(() => setCopiedPresetCode(false), 2000);
  };

  return (
    <section id="sandbox" className="py-24 bg-brand-slate relative border-t border-zinc-900">
      
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
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <ImageIcon className="h-4 w-4 text-brand-accent shrink-0" />
                <select
                  value={selectedPhoto.id}
                  onChange={(e) => {
                    const found = PHOTO_DATA.find(p => p.id === e.target.value);
                    if (found) setSelectedPhoto(found);
                  }}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-semibold px-2.5 py-1.5 rounded focus:outline-none focus:border-brand-accent transition-colors cursor-pointer w-full sm:w-auto"
                >
                  {PHOTO_DATA.map(p => (
                    <option key={p.id} value={p.id} className="bg-brand-slate text-zinc-200">{p.title}</option>
                  ))}
                </select>
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
            <div className="flex-1 my-6 relative overflow-hidden rounded-lg bg-brand-dark/40 flex items-center justify-center max-h-[50vh] sm:max-h-[60vh]">
              <div className="relative max-h-[40vh] sm:max-h-[50vh] w-full h-full flex items-center justify-center">
                {/* Visual Image */}
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  style={filterStyle}
                  className="max-h-full max-w-full object-contain rounded shadow-md sandbox-image"
                />

                {/* Warmth tint layer overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-100"
                  style={warmthOverlayStyle}
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
              <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-2">
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

              {/* Adjustment Sliders Stack */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center space-x-1.5">
                  <Sliders className="h-4 w-4 text-brand-accent" />
                  <span>Manual Adjustments</span>
                </h3>

                {/* Exposure */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-semibold">Exposure</span>
                    <span className="text-brand-accent font-mono font-bold">{(exposure > 0 ? '+' : '') + exposure} EV</span>
                  </div>
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    value={exposure}
                    onChange={(e) => setExposure(Number(e.target.value))}
                    className="w-full accent-brand-accent h-1 bg-zinc-800 rounded"
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
                    className="w-full accent-brand-accent h-1 bg-zinc-800 rounded"
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
                    className="w-full accent-brand-accent h-1 bg-zinc-800 rounded disabled:opacity-30"
                  />
                </div>

                {/* Warmth */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-semibold">Color Temp (Warmth)</span>
                    <span className="text-brand-accent font-mono font-bold">{(warmth > 0 ? '+' : '') + warmth}</span>
                  </div>
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    value={warmth}
                    onChange={(e) => setWarmth(Number(e.target.value))}
                    className="w-full accent-brand-accent h-1 bg-zinc-800 rounded"
                  />
                </div>

                {/* Blur / Soft Mist */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-300 font-semibold">Dreamy Mist (Blur)</span>
                    <span className="text-brand-accent font-mono font-bold">{blur} px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    value={blur}
                    onChange={(e) => setBlur(Number(e.target.value))}
                    className="w-full accent-brand-accent h-1 bg-zinc-800 rounded"
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
                    max="80"
                    value={vignette}
                    onChange={(e) => setVignette(Number(e.target.value))}
                    className="w-full accent-brand-accent h-1 bg-zinc-800 rounded"
                  />
                </div>

                {/* Black and White Checkbox */}
                <div className="flex items-center space-x-3 pt-2">
                  <input
                    type="checkbox"
                    id="grayscale-check"
                    checked={grayscale}
                    onChange={(e) => setGrayscale(e.target.checked)}
                    className="h-4 w-4 bg-zinc-800 border-zinc-700 rounded accent-brand-accent cursor-pointer"
                  />
                  <label htmlFor="grayscale-check" className="text-xs text-zinc-300 font-semibold select-none cursor-pointer">
                    Toggle Dramatic Monochrome (B&amp;W)
                  </label>
                </div>
              </div>

              <hr className="border-zinc-800" />

              {/* Text Overlay customizer */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center space-x-1.5">
                  <Type className="h-4 w-4 text-brand-accent" />
                  <span>Cinematic Text Overlay</span>
                </h3>

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
            </div>

            {/* Quick Actions Footer Panel */}
            <div className="pt-6 mt-6 border-t border-zinc-800 space-y-3">
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
