import { useState, useEffect, useRef } from 'react';
import { EyeOff, ShieldCheck, Keyboard, Play, Settings, Plus, LayoutGrid, Share2, HelpCircle, Info, Calculator, TrendingUp, BarChart3, FileText, Sparkles } from 'lucide-react';

export function PanicDisguise({
  isArmed,
  onDeactivate,
  activeDisguise,
  customTitle,
}) {
  // --- Google Docs State ---
  const [typedText, setTypedText] = useState(
    '# AP Calculus II - Limits and Continuity Notes\n\n## Section 1: Definition of a Limit\nLet f(x) be a function defined on an open interval containing c (except possibly at c) and let L be a real number. The statement:\n\nlim (x → c) f(x) = L\n\nmeans that for each ε > 0 there exists a δ > 0 such that for all x:\n0 < |x - c| < δ  =>  |f(x) - L| < ε.\n\n### Key Theorems:\n1. Squeeze Theorem: If g(x) <= f(x) <= h(x) and the limits of g(x) and h(x) as x approaches c are equal to L, then the limit of f(x) as x approaches c is also L.\n2. Intermediate Value Theorem (IVT): If f is continuous on [a, b] and u is any value strictly between f(a) and f(b), then there exists at least one c in [a, b] such that f(c) = u.'
  );

  // --- Google Slides State ---
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideshowMode, setSlideshowMode] = useState(false);
  const [slides, setSlides] = useState([
    {
      title: 'Trigonometric Properties & Analysis',
      subtitle: 'Advanced Algebra II • Module 4 Presentation',
      bullets: [
        'Fundamental identities connect sine, cosine, and tangent values in all quadrants.',
        'Standard unit circle definitions assign coordinates x = cos(θ) and y = sin(θ).',
        'Symmetry functions: sin(-θ) = -sin(θ) [odd] and cos(-θ) = cos(θ) [even].',
        'Double-angle theorems: sin(2θ) = 2sin(θ)cos(θ) and cos(2θ) = cos²(θ) - sin²(θ).'
      ]
    },
    {
      title: 'Unit Circle Transformations',
      subtitle: 'Visualizing Periodic Amplitudes and Phase Shifts',
      bullets: [
        'The general sine equation is modeled by y = A sin(B(x - C)) + D.',
        'Parameter A represents the physical amplitude (vertical stretching/compression factor).',
        'Parameter B governs the period length, where Period = 2π / |B|.',
        'Parameter C dictates horizontal offset (phase shift) and D dictates vertical translation.'
      ]
    },
    {
      title: 'Practical Application - Waves',
      subtitle: 'Real-world Physics & Trigonometry Integration',
      bullets: [
        'Alternating current (AC) voltage profiles follow pure model sinusoidal waves oscillating at 60Hz.',
        'Ocean tide elevation modeling uses superimposed sine curves to predict water depth.',
        'Acoustics and sound waves propagate matching secondary compression sinusoidal patterns.',
        'Light wavelengths determine colors in the visible spectrum through sinusoidal frequencies.'
      ]
    }
  ]);

  // --- Google Sheets State ---
  const [selectedCell, setSelectedCell] = useState('B2');
  const [sheetData, setSheetData] = useState({
    // Initial data mapping
    A1: 'Unit ID',    B1: 'Chapter Topic',         C1: 'Problems Solved', D1: 'Score %',  E1: 'Progress Status',
    A2: 'UNIT-01',    B2: 'Linear Equations',        C2: '45',              D2: '94.5',     E2: 'Mastered',
    A3: 'UNIT-02',    B3: 'Quadratic Systems',      C3: '60',              D3: '88.0',     E3: 'Passed',
    A4: 'UNIT-03',    B4: 'Trigonometric Idents',    C4: '55',              D4: '92.5',     E4: 'Passed',
    A5: 'UNIT-04',    B5: 'Exponential Decay',      C5: '38',              D5: '85.0',     E5: 'Passed',
    A6: 'UNIT-05',    B6: 'Complex Vectors',         C6: '12',              D6: '74.0',     E6: 'In Progress',
    A7: 'UNIT-06',    B7: 'Rational Geometry',       C7: '0',               D7: '0.0',      E7: 'Unassigned',
    A8: 'SUM',        B8: 'Total Completed Core',    C8: '210',             D8: '86.8',     E8: 'Eligible',
  });

  // --- GeoGebra / Math Grapher State ---
  const [equations, setEquations] = useState([
    { id: 1, text: 'f(x) = sin(x)', color: '#10b981', visible: true },
    { id: 2, text: 'g(x) = x^2 - 3', color: '#3b82f6', visible: true },
    { id: 3, text: 'h(x) = 1.5x + 1', color: '#f43f5e', visible: true }
  ]);
  const [activeInputId, setActiveInputId] = useState(1);
  const [mathGridZoom, setMathGridZoom] = useState(35); // Pixels per math unit

  // Interactive sheet cell input editing
  const handleCellChange = (val) => {
    setSheetData(prev => ({
      ...prev,
      [selectedCell]: val
    }));
  };

  // Keyboard shortcut listener to disarm
  useEffect(() => {
    if (!isArmed) return;

    const handleKeyDown = (e) => {
      // Escape restores the math platform back/forth
      if (e.key === 'Escape') {
        e.preventDefault();
        setSlideshowMode(false);
        onDeactivate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isArmed, onDeactivate]);

  if (!isArmed) return null;

  // Render SVG paths for mathematical graphing based on user formulas
  const generateGraphPath = (equationText, color) => {
    const width = 550;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Evaluate standard coordinates
    const points = [];
    for (let screenX = 0; screenX <= width; screenX += 2) {
      // Convert screen coordinate to math coordinate
      const mathX = (screenX - centerX) / mathGridZoom;
      let mathY = 0;

      // Parsing keywords
      const expr = equationText.toLowerCase().replace(/\s+/g, '');
      if (expr.includes('sin')) {
        mathY = Math.sin(mathX);
      } else if (expr.includes('cos')) {
        mathY = Math.cos(expr.includes('2x') || expr.includes('2*x') ? mathX * 2 : mathX);
      } else if (expr.includes('tan')) {
        mathY = Math.tan(mathX);
      } else if (expr.includes('x^2') || expr.includes('x²')) {
        // e.g. "x^2 - 3" or "0.5x^2"
        let scale = 1;
        if (expr.startsWith('0.5')) scale = 0.5;
        if (expr.startsWith('2')) scale = 2;
        let offset = 0;
        if (expr.includes('-3')) offset = -3;
        else if (expr.includes('+3')) offset = 3;
        else if (expr.includes('-2')) offset = -2;
        else if (expr.includes('-4')) offset = -4;
        mathY = scale * (mathX * mathX) + offset;
      } else if (expr.includes('x^3') || expr.includes('x³')) {
        mathY = Math.pow(mathX, 3) * 0.2;
      } else {
        // Linear equation parsing "1.5x + 1"
        let slope = 1;
        let intercept = 0;
        if (expr.includes('1.5x')) slope = 1.5;
        else if (expr.includes('2x')) slope = 2;
        else if (expr.includes('0.5x')) slope = 0.5;
        else if (expr.includes('-x')) slope = -1;

        if (expr.includes('+1')) intercept = 1;
        else if (expr.includes('+2')) intercept = 2;
        else if (expr.includes('-2')) intercept = -2;
        else if (expr.includes('+3')) intercept = 3;
        else if (expr.includes('-1')) intercept = -1;

        mathY = slope * mathX + intercept;
      }

      // Convert math coordinate back to screen canvas coordinate
      const screenY = centerY - (mathY * mathGridZoom);
      
      // Limit excessive limits to avoid huge vectors
      if (screenY >= -50 && screenY <= height + 50) {
        points.push(`${screenX},${screenY}`);
      }
    }

    if (points.length === 0) return '';
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#f9fbfd] text-[#1f1f1f] font-sans overflow-y-auto select-text">
      
      {/* 1. MOCK GOOGLE DOCS MASK */}
      {activeDisguise === 'google-docs' && (
        <div className="flex flex-col min-h-screen">
          <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between select-none">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-10 bg-blue-600 rounded flex flex-col justify-between p-1 text-white text-[8px] font-bold">
                <div className="w-1/2 h-0.5 bg-white"></div>
                <div className="w-3/4 h-0.5 bg-white"></div>
                <div className="w-3/4 h-0.5 bg-white"></div>
                <div className="w-2/3 h-0.5 bg-white"></div>
                <div className="h-2 bg-blue-400 mt-2 text-[5px] flex items-center justify-center">MATH</div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800 text-sm">
                    {customTitle || 'Limits and Continuity Formula Sheet'}
                  </span>
                  <span className="text-xs text-gray-400">Saved to Drive</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-0.5">
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">File</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Edit</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">View</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Insert</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Format</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Tools</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Extensions</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Help</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <ShieldCheck size={14} className="text-green-600" /> All edits saved
              </span>
              <button
                onClick={onDeactivate}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs py-1.5 px-3 rounded font-medium flex items-center gap-1 transition-colors"
              >
                <EyeOff size={14} /> Resume Portal
              </button>
            </div>
          </div>

          <div className="bg-[#f0f4f9] border-b border-gray-200 px-4 py-1.5 flex items-center space-x-4 text-xs select-none">
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded font-mono">100%</span>
            <span className="h-4 w-px bg-gray-300"></span>
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded font-bold">B</span>
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded italic">I</span>
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded underline">U</span>
            <span className="h-4 w-px bg-gray-300"></span>
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded font-serif">Georgia</span>
            <span className="h-4 w-px bg-gray-300"></span>
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded">Normal text</span>
          </div>

          <div className="bg-[#f9fbfd] flex-grow p-8 flex justify-center">
            <div className="w-[812px] min-h-[1056px] bg-white shadow-md border border-gray-200 p-16 relative">
              <textarea
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                className="w-full h-full resize-none border-none outline-none text-base text-gray-800 leading-relaxed font-serif bg-transparent focus:ring-0"
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <div className="absolute top-4 right-4 text-xs text-gray-300 select-none">
                Page 1 of 1
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MOCK GOOGLE SLIDES MASK (New!) */}
      {activeDisguise === 'google-slides' && (
        <div className="flex flex-col min-h-screen bg-[#f9edf9] select-none text-gray-800">
          {slideshowMode ? (
            /* Slideshow Fullscreen Simulation */
            <div className="fixed inset-0 bg-[#1c1c1c] z-50 flex flex-col justify-between p-6">
              <div className="flex-grow flex items-center justify-center p-4">
                <div className="aspect-video w-full max-w-5xl bg-white rounded-lg shadow-2xl p-12 relative flex flex-col justify-between border border-zinc-700 animate-fade-in">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amber-600 font-bold">
                      {slides[activeSlide].subtitle || 'Trigonometry Presentation'}
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                      {slides[activeSlide].title}
                    </h1>
                    <div className="h-1 w-20 bg-amber-500 my-4" />
                    
                    <ul className="space-y-3.5 mt-8 text-sm sm:text-base text-slate-700 font-sans select-text">
                      {slides[activeSlide].bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-amber-500 mt-1">✦</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                    <span>Topic Study: Mathpracticeforray</span>
                    <span>Slide {activeSlide + 1} of {slides.length}</span>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 max-w-lg mx-auto flex items-center justify-between w-full text-zinc-300 text-xs">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
                    disabled={activeSlide === 0}
                    className="px-2.5 py-1 bg-zinc-900 disabled:opacity-40 rounded hover:bg-zinc-800 text-white font-mono"
                  >
                    ◀ Prev
                  </button>
                  <span className="font-mono">Slide {activeSlide + 1} / {slides.length}</span>
                  <button 
                    onClick={() => setActiveSlide(prev => Math.min(slides.length - 1, prev + 1))}
                    disabled={activeSlide === slides.length - 1}
                    className="px-2.5 py-1 bg-zinc-900 disabled:opacity-40 rounded hover:bg-zinc-800 text-white font-mono"
                  >
                    Next ▶
                  </button>
                </div>
                <button 
                  onClick={() => setSlideshowMode(false)}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded"
                >
                  Exit Slideshow (ESC)
                </button>
              </div>
            </div>
          ) : (
            /* Normal Slides Editor Mode */
            <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
              {/* Slides Header Row */}
              <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Google Slides Icon */}
                  <div className="w-8 h-8 bg-amber-500 rounded p-1 flex flex-col justify-between text-white font-bold select-none">
                    <span className="text-[12px] leading-none ml-1">■</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800 text-sm">
                        {customTitle || 'Mathpracticeforray - Slide Presentation Deck'}
                      </span>
                      <span className="text-xs text-gray-400">Saved to Cloud</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-500 mt-0.5">
                      <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">File</span>
                      <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Edit</span>
                      <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">View</span>
                      <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Insert</span>
                      <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Format</span>
                      <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Slide</span>
                      <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Arrange</span>
                      <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Tools</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSlideshowMode(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs rounded-l font-bold border-r border-gray-200 shadow-sm"
                  >
                    <Play size={12} className="text-amber-600 fill-amber-600" /> Slideshow
                  </button>
                  <button
                    onClick={onDeactivate}
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs py-1.5 px-3 rounded font-bold transition-colors shadow-sm"
                  >
                    <EyeOff size={13} /> Close
                  </button>
                </div>
              </div>

              {/* Toolbar */}
              <div className="bg-[#f0f4f9] border-b border-gray-200 px-4 py-1 flex items-center space-x-3.5 text-xs select-none">
                <span className="cursor-pointer hover:bg-gray-200 px-1.5 py-0.5 rounded font-mono">16:9</span>
                <span className="h-4 w-px bg-gray-300"></span>
                <span className="cursor-pointer hover:bg-gray-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Plus size={11} /> New Slide
                </span>
                <span className="h-4 w-px bg-gray-300"></span>
                <span className="cursor-pointer hover:bg-gray-200 px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">Background</span>
                <span className="cursor-pointer hover:bg-gray-200 px-2 py-0.5 rounded">Layout</span>
                <span className="cursor-pointer hover:bg-gray-200 px-2 py-0.5 rounded">Theme</span>
                <span className="cursor-pointer hover:bg-gray-00 px-2 py-0.5 rounded">Transition</span>
              </div>

              {/* Working Interface with Sidebar */}
              <div className="flex flex-1 overflow-hidden h-[calc(100vh-85px)]">
                {/* Thumbnails Sidebar */}
                <div className="w-44 bg-white border-r border-gray-200 p-2 overflow-y-auto space-y-3">
                  {slides.map((slide, sIdx) => (
                    <div 
                      key={sIdx}
                      onClick={() => setActiveSlide(sIdx)}
                      className={`cursor-pointer p-1.5 rounded transition-all flex flex-col gap-1 border-2 ${activeSlide === sIdx ? 'border-amber-500 bg-amber-50/50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="text-[9px] font-mono font-bold text-gray-400">Slide {sIdx + 1}</div>
                      <div className="aspect-video bg-zinc-50 border border-gray-200 rounded p-1 flex flex-col justify-between overflow-hidden">
                        <div className="text-[7px] font-bold text-gray-800 leading-tight truncate">{slide.title}</div>
                        <div className="w-full bg-slate-200 h-[2px] mt-0.5 rounded"></div>
                        <div className="w-3/4 bg-slate-200 h-[2px] mt-0.5 rounded"></div>
                        <div className="text-[5px] text-gray-400 text-right mt-1 font-semibold">16:9</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-grow bg-[#f1f3f4] p-8 overflow-auto flex items-center justify-center">
                  <div className="aspect-video w-full max-w-4xl bg-white shadow-lg border border-gray-300 p-10 flex flex-col justify-between relative rounded">
                    <div>
                      {/* Interactive slide fields */}
                      <input
                        type="text"
                        className="w-full text-2xl font-extrabold text-gray-900 border-b border-transparent hover:border-gray-200 focus:border-amber-500 focus:ring-0 outline-none pb-1 bg-transparent"
                        value={slides[activeSlide].title}
                        onChange={(e) => {
                          const updated = [...slides];
                          updated[activeSlide].title = e.target.value;
                          setSlides(updated);
                        }}
                        placeholder="Click to add title"
                      />
                      
                      <input
                        type="text"
                        className="w-full text-xs text-amber-600 font-bold uppercase mt-1 border-b border-transparent hover:border-gray-200 focus:border-amber-500 focus:ring-0 outline-none pb-0.5 bg-transparent"
                        value={slides[activeSlide].subtitle || ''}
                        onChange={(e) => {
                          const updated = [...slides];
                          updated[activeSlide].subtitle = e.target.value;
                          setSlides(updated);
                        }}
                        placeholder="Click to add subtitle"
                      />

                      <div className="h-0.5 w-16 bg-amber-400 my-4" />

                      <div className="space-y-2.5 mt-4 text-xs font-serif text-gray-700 bg-transparent">
                        {slides[activeSlide].bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-1">
                            <span className="text-amber-500 mt-1 shrink-0">✦</span>
                            <textarea
                              className="w-full bg-transparent resize-none border-b border-transparent hover:border-gray-200 focus:border-amber-500 outline-none text-xs focus:ring-0 select-text"
                              value={bullet}
                              rows={1}
                              onChange={(e) => {
                                const updated = [...slides];
                                updated[activeSlide].bullets[bIdx] = e.target.value;
                                setSlides(updated);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                      <span>Mathpracticeforray Presentations</span>
                      <span>Editing Slide {activeSlide + 1}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. MOCK GOOGLE SHEETS MASK (New!) */}
      {activeDisguise === 'google-sheets' && (
        <div className="flex flex-col min-h-screen bg-white select-none text-gray-700 font-sans">
          {/* Header Row */}
          <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Google Sheets Icon */}
              <div className="w-8 h-8 bg-green-600 rounded p-1 flex items-center justify-center text-white font-extrabold select-none">
                <span className="text-base">田</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800 text-sm">
                    {customTitle || 'Mathpracticeforray Calculus Homework Ledger'}
                  </span>
                  <span className="text-xs text-gray-400">All changes saved offline</span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-0.5">
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">File</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Edit</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">View</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Insert</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Format</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Data</span>
                  <span className="hover:bg-gray-100 px-1 rounded cursor-pointer">Tools</span>
                </div>
              </div>
            </div>

            <button
              onClick={onDeactivate}
              className="flex items-center gap-1 px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs py-1.5 px-3 rounded font-bold transition-colors shadow-sm"
            >
              <EyeOff size={13} /> Close Sheet
            </button>
          </div>

          {/* Quick spreadsheet buttons */}
          <div className="bg-[#f0f4f9] border-b border-gray-200 px-4 py-1.5 flex items-center space-x-3 text-xs">
            <span className="font-bold text-gray-500 cursor-pointer p-0.5 hover:bg-gray-200">100%</span>
            <span className="h-4 w-px bg-gray-300"></span>
            <span className="cursor-pointer hover:bg-gray-200 px-1 py-0.5 rounded">$</span>
            <span className="cursor-pointer hover:bg-gray-200 px-1 py-0.5 rounded">%</span>
            <span className="cursor-pointer hover:bg-gray-200 px-1 py-0.5 rounded">.00</span>
            <span className="h-4 w-px bg-gray-300"></span>
            <span className="font-bold px-1 py-0.5 rounded hover:bg-gray-200 text-gray-600 bg-gray-100">B</span>
            <span className="italic px-1 py-0.5 rounded hover:bg-gray-200 text-gray-500">I</span>
            <span className="line-through px-1 py-0.5 rounded hover:bg-gray-200 text-gray-500">S</span>
          </div>

          {/* Formula Bar */}
          <div className="bg-white border-b border-gray-200 px-4 py-1.5 flex items-center font-mono text-xs">
            <div className="bg-gray-100 border border-gray-300 text-gray-600 px-2 py-0.5 rounded mr-2 font-bold min-w-[32px] text-center select-text">
              {selectedCell}
            </div>
            <span className="text-gray-400 mr-2">fx</span>
            <input
              type="text"
              className="flex-grow border border-gray-200 focus:border-green-600 rounded px-2 py-0.5 outline-none select-text"
              value={sheetData[selectedCell] || ''}
              onChange={(e) => handleCellChange(e.target.value)}
            />
          </div>

          {/* Spreadsheet Table Sheet */}
          <div className="flex-grow overflow-auto p-4 bg-gray-100">
            <div className="bg-white shadow border border-gray-200 max-w-6xl mx-auto rounded overflow-hidden">
              <table className="w-full border-collapse text-left font-mono text-[11px] text-zinc-800">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 select-none">
                    <th className="w-10 px-2 py-1.5 text-center bg-gray-100 text-gray-500 font-bold border-r border-gray-200"></th>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((col) => (
                      <th key={col} className="w-40 px-3 py-1.5 font-bold tracking-wide text-gray-500 text-center border-r border-gray-200 uppercase bg-gray-100/50">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((row) => (
                    <tr key={row} className="border-b border-gray-150 hover:bg-green-50/10">
                      <td className="bg-gray-50 text-gray-400 text-center font-bold font-mono py-1.5 border-r border-gray-200 select-none">
                        {row}
                      </td>
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((col) => {
                        const cellKey = `${col}${row}`;
                        const isSelected = selectedCell === cellKey;
                        const cellValue = sheetData[cellKey] || '';
                        
                        return (
                          <td 
                            key={col} 
                            onClick={() => setSelectedCell(cellKey)}
                            className={`px-3 py-1.5 border-r border-gray-200 cursor-cell transition-all font-mono select-text truncate max-w-[150px] relative ${isSelected ? 'outline outline-2 outline-green-600 bg-green-50/30' : ''}`}
                          >
                            <span>{cellValue}</span>
                            {isSelected && (
                              <span className="absolute bottom-[-1px] right-[-1px] w-1.5 h-1.5 bg-green-700 outline outline-1 outline-white rounded-sm"></span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Tabs banner */}
            <div className="bg-white border-t border-gray-200 px-6 py-2 flex items-center space-x-4 text-xs font-mono select-none mt-2 shadow-sm rounded max-w-6xl mx-auto">
              <span className="text-gray-400 font-bold text-[10px]">TAB:</span>
              <span className="bg-green-50 text-green-700 font-bold border-b-2 border-green-700 px-3 py-1 cursor-pointer">
                Calculus Grades
              </span>
              <span className="text-gray-400 hover:text-black py-1 cursor-pointer">
                Practice Formulas
              </span>
              <span className="text-gray-400 hover:text-black py-1 cursor-pointer">
                AP Quiz Stats
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. MOCK GEOGEBRA GRAPHING CALCULATOR (New!) */}
      {activeDisguise === 'geogebra' && (
        <div className="flex flex-col min-h-screen bg-[#fafbff] text-slate-800 select-none">
          {/* Header Bar */}
          <div className="bg-[#613cbc] text-white p-3 px-6 flex items-center justify-between shadow-md select-none">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 bg-white text-[#613cbc] rounded-full flex items-center justify-center font-black text-xs font-mono shadow-inner border border-white">
                G
              </div>
              <div>
                <span className="font-extrabold text-sm tracking-wide">GeoGebra Graphing Calculator</span>
                <span className="text-[10px] block opacity-80 leading-none">mathpracticeforray edition</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMathGridZoom(prev => Math.min(80, prev + 5))}
                className="px-2 py-1 bg-[#5331a6] text-white rounded text-xs"
                title="Zoom in graph grid"
              >
                ＋
              </button>
              <button
                onClick={() => setMathGridZoom(prev => Math.max(15, prev - 5))}
                className="px-2 py-1 bg-[#5331a6] text-white rounded text-xs mr-3"
                title="Zoom out graph grid"
              >
                －
              </button>
              <button
                onClick={onDeactivate}
                className="bg-white hover:bg-slate-100 text-[#613cbc] font-bold text-xs px-4 py-1.5 rounded transition-colors flex items-center gap-1.5 shadow"
              >
                <EyeOff size={13} /> Exit Graph
              </button>
            </div>
          </div>

          {/* Interface split panes */}
          <div className="flex-1 flex overflow-hidden flex-col md:flex-row h-[calc(100vh-53px)]">
            {/* Left Panes - Equation list */}
            <div className="w-full md:w-80 bg-white border-r border-[#dfdfdf] flex flex-col justify-between">
              <div>
                <div className="p-3 border-b border-[#ececec] flex items-center justify-between bg-slate-50/50">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Algebra input feed</span>
                  <Calculator size={14} className="text-[#613cbc]" />
                </div>

                <div className="p-3 space-y-4 overflow-y-auto">
                  {equations.map((eq) => {
                    const isActive = activeInputId === eq.id;
                    return (
                      <div 
                        key={eq.id}
                        className={`p-2.5 rounded-lg border transition-all ${isActive ? 'bg-[#f4f1fb] border-[#baa9e6] shadow-sm' : 'border-[#ececec] hover:bg-slate-50'}`}
                        onClick={() => setActiveInputId(eq.id)}
                      >
                        <div className="flex items-center space-x-2 mb-1.5">
                          {/* Visibility Circle button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const updated = equations.map(item => item.id === eq.id ? { ...item, visible: !item.visible } : item);
                              setEquations(updated);
                            }}
                            className="w-3.5 h-3.5 rounded-full border border-[#2d2d2d] flex items-center justify-center cursor-pointer hover:scale-105"
                            style={{ 
                              backgroundColor: eq.visible ? eq.color : 'transparent',
                              borderColor: eq.color
                            }}
                            title="Toggle mathematical plot rendering"
                          >
                            {eq.visible && <span className="w-1 h-1 bg-white rounded-full"></span>}
                          </button>
                          
                          <span className="text-[10px] font-mono text-zinc-400 font-bold font-semibold uppercase">Equation {eq.id}</span>
                        </div>

                        {/* Editable formula field */}
                        <input
                          type="text"
                          className="w-full bg-white border border-gray-200 outline-none text-xs px-2.5 py-1 rounded font-mono select-text text-zinc-800"
                          value={eq.text}
                          onChange={(e) => {
                            const updated = equations.map(item => item.id === eq.id ? { ...item, text: e.target.value } : item);
                            setEquations(updated);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Info alert */}
                <div className="p-4 mx-3 bg-[#f2e6ff]/30 border border-[#baa9e4]/30 rounded-lg text-[11px] text-indigo-800 mt-2">
                  <span className="font-bold block mb-1">💡 Real-time Graphing engine</span>
                  Type inputs like <strong className="font-mono">sin(x)</strong>, <strong className="font-mono">cos(x)</strong>, <strong className="font-mono">x^2 - 3</strong>, or <strong className="font-mono">1.5x + 1</strong> to watch the coordinate curves react dynamically.
                </div>
              </div>

              {/* GeoGebra logo footer badge */}
              <div className="p-3.5 bg-slate-50 border-t border-[#ececec] text-[9px] font-semibold tracking-wider text-slate-400 text-center font-mono">
                MATHPRACTICEFORRAY GRAPHING COMPILER
              </div>
            </div>

            {/* Right Pane - SVG plotting grid */}
            <div className="flex-grow bg-[#fafbff] p-4 flex items-center justify-center relative overflow-hidden">
              <div className="relative bg-white border border-[#dfdfdf] rounded-xl shadow-md w-full max-w-2xl overflow-hidden aspect-[11/8]">
                {/* SVG plot */}
                <svg className="w-full h-full relative z-10 select-none bg-white">
                  {/* Grid Lines */}
                  {(() => {
                    const lines = [];
                    const width = 550;
                    const height = 400;
                    const centerX = width / 2;
                    const centerY = height / 2;

                    // Vertical lines
                    for (let x = centerX; x < width; x += mathGridZoom) {
                      lines.push(<line key={`v1-${x}`} x1={x} y1={0} x2={x} y2={height} stroke="#eaeaea" strokeWidth="1" />);
                    }
                    for (let x = centerX - mathGridZoom; x > 0; x -= mathGridZoom) {
                      lines.push(<line key={`v2-${x}`} x1={x} y1={0} x2={x} y2={height} stroke="#eaeaea" strokeWidth="1" />);
                    }

                    // Horizontal lines
                    for (let y = centerY; y < height; y += mathGridZoom) {
                      lines.push(<line key={`h1-${y}`} x1={0} y1={y} x2={width} y2={y} stroke="#eaeaea" strokeWidth="1" />);
                    }
                    for (let y = centerY - mathGridZoom; y > 0; y -= mathGridZoom) {
                      lines.push(<line key={`h2-${y}`} x1={0} y1={y} x2={width} y2={y} stroke="#eaeaea" strokeWidth="1" />);
                    }

                    return lines;
                  })()}

                  {/* Draw Axis */}
                  <line x1={0} y1={200} x2={550} y2={200} stroke="#595959" strokeWidth="1.5" />
                  <line x1={275} y1={0} x2={275} y2={400} stroke="#595959" strokeWidth="1.5" />

                  {/* Axis numerical labellers */}
                  {[...Array(14).keys()].map((val) => {
                    const offset = val - 7;
                    if (offset === 0) return null;
                    const pX = 275 + (offset * mathGridZoom);
                    return (
                      <g key={`num-x-${val}`}>
                        <circle cx={pX} cy={200} r="2" fill="#595959" />
                        <text x={pX - 4} y={212} fontSize="9" fill="#8c8c8c" fontFamily="monospace">{offset}</text>
                      </g>
                    );
                  })}
                  {[...Array(10).keys()].map((val) => {
                    const offset = val - 5;
                    if (offset === 0) return null;
                    const pY = 200 - (offset * mathGridZoom);
                    return (
                      <g key={`num-y-${val}`}>
                        <circle cx={275} cy={pY} r="2" fill="#595959" />
                        <text x={282} y={pY + 3} fontSize="9" fill="#8c8c8c" fontFamily="monospace">{offset}</text>
                      </g>
                    );
                  })}

                  <text x="535" y="193" fontSize="10" fontWeight="bold" fill="#595959" fontFamily="monospace">x</text>
                  <text x="285" y="15" fontSize="10" fontWeight="bold" fill="#595959" fontFamily="monospace">y</text>
                  <circle cx={275} cy={200} r="3" fill="#613cbc" />

                  {/* Draw equation plots */}
                  {equations.map((eq) => {
                    if (!eq.visible || !eq.text.trim()) return null;
                    const path = generateGraphPath(eq.text, eq.color);
                    return (
                      <path 
                        key={eq.id}
                        d={path}
                        fill="none"
                        stroke={eq.color}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </svg>

                {/* Grid Overlay information badge */}
                <span className="absolute bottom-2.5 left-3.5 z-20 bg-slate-900/85 text-white py-1 px-2.5 text-[9px] font-mono rounded tracking-tight shadow">
                  Viewing Grid Scale: 1 unit ≈ {mathGridZoom}px
                </span>
                <span className="absolute top-2.5 right-3.5 z-20 bg-white shadow py-1 px-2 px-2 border border-slate-200 text-[#613cbc] text-[9px] uppercase font-bold rounded">
                  🟢 Vector Engine Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. KHAN ACADEMY MOCK */}
      {activeDisguise === 'khan-academy' && (
        <div className="flex flex-col min-h-screen bg-[#0a2540] text-white">
          <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-green-400 font-bold text-lg tracking-wide">
                <span className="text-xl">🏆</span>
                <span>khanacademy.org</span>
              </div>
              <div className="text-sm text-gray-300 space-x-4 hidden md:flex">
                <span className="hover:underline cursor-pointer">Courses</span>
                <span className="hover:underline cursor-pointer">Search</span>
                <span className="hover:underline cursor-pointer">Donate</span>
              </div>
            </div>
            <button
              onClick={onDeactivate}
              className="bg-green-600 hover:bg-green-700 text-white font-medium text-xs px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
            >
              <EyeOff size={14} /> Back to dashboard
            </button>
          </div>

          <div className="max-w-4xl mx-auto px-6 py-12 flex-grow">
            <div className="bg-[#113154] border border-[#1b3f68] rounded-xl p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <span className="bg-yellow-500/10 text-yellow-400 p-1.5 rounded-lg border border-yellow-500/20 text-xs font-bold">
                  ADVANCED MATH
                </span>
                <span className="text-sm text-gray-400">Unit 4: Integrals and Derivatives</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight mb-4 text-white">
                Computing the Definite Integral using Riemann Sums
              </h1>
              <p className="text-gray-300 mb-8 leading-relaxed">
                A Riemann sum is an approximation of the area under a curve by dividing that area into multiple geometric shapes (such as rectangles or trapezoids). By taking the limit as the partition size approaches zero, the Riemann sum converges precisely to the definite integral.
              </p>

              <div className="bg-[#0c233c] p-6 rounded-lg font-mono border border-[#143457] text-gray-200 mb-8 whitespace-pre-wrap overflow-x-auto">
                {`∫[a, b] f(x) dx = lim (n → ∞) ∑[i=1, n] f(x_i*) Δx\n\nWhere:\n- Δx = (b - a) / n\n- x_i* represents the evaluation point in the i-th subinterval [x_{i-1}, x_i]`}
              </div>

              <div className="border-t border-gray-800 pt-6">
                <span className="text-xs text-green-400 block mb-2 font-semibold">SUCCESS: 4/4 QUESTIONS CORRECT</span>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. CANVAS LMS MOCK */}
      {activeDisguise === 'canvas' && (
        <div className="flex flex-col min-h-screen bg-[#fafafa] text-gray-800">
          <div className="bg-[#121212] text-white h-12 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4 flex-wrap">
              <span className="font-bold text-red-500 text-lg">canvas</span>
              <span className="text-xs bg-red-600/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">LMS Mobile-Link</span>
              <span className="text-sm font-medium text-gray-300">Dashboard</span>
            </div>
            <button
              onClick={onDeactivate}
              className="bg-red-600 hover:bg-red-700 text-white font-medium text-xs px-3 py-1 rounded transition-colors flex items-center gap-1"
            >
              <EyeOff size={13} /> Exit LMS
            </button>
          </div>

          <div className="flex flex-1 flex-col md:flex-row">
            <div className="w-full md:w-20 bg-[#2d3b45] text-white flex flex-row md:flex-col items-center justify-around md:justify-start md:py-6 md:space-y-6 text-[10px] py-2 md:space-x-0 space-x-2">
              <div className="flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 cursor-pointer">
                <span className="text-lg">👤</span>
                <span>Account</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-red-400 font-bold md:border-l-4 md:border-red-500 w-full">
                <span className="text-lg">📋</span>
                <span>Dashboard</span>
              </div>
              <div className="flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 cursor-pointer">
                <span className="text-lg">📚</span>
                <span>Courses</span>
              </div>
              <div className="flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 cursor-pointer">
                <span className="text-lg">📅</span>
                <span>Calendar</span>
              </div>
              <div className="flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 cursor-pointer">
                <span className="text-lg">📥</span>
                <span>Inbox</span>
              </div>
            </div>

            <div className="flex-1 p-6 md:p-8 bg-[#f5f5f5] overflow-y-auto">
              <h1 className="text-2xl font-light text-gray-700 mb-6 border-b border-gray-200 pb-3">Dashboard</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-28 bg-emerald-600 p-4 text-white flex flex-col justify-end">
                    <span className="font-bold text-lg select-text">BIO 204: Cellular Biology</span>
                    <span className="text-xs opacity-75">FALL 2026</span>
                  </div>
                  <div className="p-4 space-y-2 text-xs text-gray-500">
                    <p className="hover:underline cursor-pointer">📄 Syllabus - Mitosis & Meiosis</p>
                    <p className="hover:underline cursor-pointer">🔔 Announcement: Lab exam scheduled on 05/28</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-28 bg-blue-600 p-4 text-white flex flex-col justify-end">
                    <span className="font-bold text-lg select-text">ENG 101: Rhetoric and Writing</span>
                    <span className="text-xs opacity-75">FALL 2026</span>
                  </div>
                  <div className="p-4 space-y-2 text-xs text-gray-500">
                    <p className="hover:underline cursor-pointer">📁 Analytical Essay #2 Feedback</p>
                    <p className="hover:underline cursor-pointer">📢 Peer Review Groups for Novella draft</p>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-28 bg-amber-600 p-4 text-white flex flex-col justify-end">
                    <span className="font-bold text-lg select-text">MATH 151: Calculus I</span>
                    <span className="text-xs opacity-75">FALL 2026</span>
                  </div>
                  <div className="p-4 space-y-2 text-xs text-gray-500">
                    <p className="hover:underline cursor-pointer">🗒️ Limits and Derivatives Homework</p>
                    <p className="hover:underline cursor-pointer">⏰ Practice Exam: Midterm Review Set</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start space-x-3">
                <span className="text-blue-500 text-lg">💡</span>
                <div>
                  <h4 className="font-bold text-blue-800 text-xs">To Do Assignments</h4>
                  <p className="text-blue-700 text-xs mt-0.5">You have 3 graded quizzes closing this sunday. Ensure you prepare in advance!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Escaper indicator bar at bottom right */}
      <div className="fixed bottom-3 right-3 bg-black/85 text-white rounded-lg py-1.5 text-[10px] px-3 font-mono border border-zinc-800 flex items-center gap-1.5 select-none shadow-xl z-[999999]">
        <Keyboard size={12} className="text-rose-500" />
        <span>Press <span className="bg-zinc-900 border border-zinc-800 text-rose-500 px-1 py-0.2 rounded font-bold">ESC</span> to disable camouflage</span>
      </div>
    </div>
  );
}
