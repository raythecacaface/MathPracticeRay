import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RotateCw, Maximize2, Sparkles, AlertTriangle, Monitor, ExternalLink, Moon, Sun, Star } from 'lucide-react';
import { resolvePlayableUrl } from '../utils/url.js';

export function TheaterView({
  game,
  onBack,
  onIncrementPlay,
  onUpdateRating,
  hasRatedBefore,
}) {
  const [isDimmed, setIsDimmed] = useState(false);
  const [sizeMode, setSizeMode] = useState('theater'); // Default to larger "theater" mode as requested
  const [iframeKey, setIframeKey] = useState(0); // To force reload
  const [userRating, setUserRating] = useState(null);
  const [isHoveringStars, setIsHoveringStars] = useState(null);
  const iframeRef = useRef(null);

  // Trigger play count increment on launch
  useEffect(() => {
    onIncrementPlay(game.id);
  }, [game.id]);

  // Handle Fullscreen request
  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.webkitRequestFullscreen) {
        iframeRef.current.webkitRequestFullscreen();
      } else if (iframeRef.current.msRequestFullscreen) {
        iframeRef.current.msRequestFullscreen();
      }
    }
  };

  // Force Iframe reload
  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  // Submit local rating
  const handleRatingSubmit = (stars) => {
    setUserRating(stars);
    onUpdateRating(game.id, stars);
  };

  // Calculate dynamic max-width for the playing session grid
  const getContainerMaxWidth = () => {
    switch (sizeMode) {
      case 'standard': return 'max-w-4xl';
      case 'cinema': return 'max-w-6xl';
      case 'theater': return 'max-w-[1380px]';
      case 'giant': return 'max-w-full lg:px-8';
      default: return 'max-w-6xl';
    }
  };

  return (
    <div className={`transition-colors duration-500 min-h-screen pb-16 ${isDimmed ? 'bg-black' : 'bg-[#030304]'}`}>
      <div className={`${getContainerMaxWidth()} mx-auto px-4 pt-4 transition-all duration-300`}>
        {/* Top Header HUD and controls */}
        <div className="bg-[#09090c] border border-zinc-900 rounded-lg p-3 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 shadow-lg relative z-25">
          <div className="flex items-center space-x-3">
            <button
               onClick={onBack}
              className="bg-zinc-950 hover:bg-neutral-900 text-zinc-300 border border-zinc-800 hover:border-rose-600 hover:text-rose-500 p-2 rounded transition-all"
              title="Return to search"
            >
              <ArrowLeft size={14} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-sans font-black tracking-tight text-zinc-100">
                  {game.title}
                </h2>
                <span className="text-[9px] font-mono select-none px-2 py-0.5 bg-rose-955/10 border border-rose-500/20 text-rose-500 rounded font-bold uppercase tracking-wider">
                  {game.category}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 max-w-xl md:max-w-2xl line-clamp-1">
                {game.description}
              </p>
            </div>
          </div>

          {/* Quick HUD Triggers */}
          <div className="flex flex-wrap items-center gap-1.5 bg-zinc-950 p-1 rounded border border-zinc-900">
            {/* Direct Open */}
            <a
              href={resolvePlayableUrl(game.iframeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded text-xs font-mono transition-colors"
              title="Open standalone source directly in new tab"
            >
              <ExternalLink size={11} className="text-rose-500" />
              <span>Full Tap</span>
            </a>

            {/* Lights-off Mode */}
            <button
              onClick={() => setIsDimmed(!isDimmed)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-mono transition-all ${isDimmed ? 'bg-rose-600/25 text-rose-400 border border-rose-500/20' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200'}`}
              title="Dim light borders for immersive playing"
            >
              {isDimmed ? <Sun size={11} /> : <Moon size={11} />}
              <span>{isDimmed ? 'Un-Dim' : 'Dim Lights'}</span>
            </button>

            {/* Responsive Screen Size Selection Buttons */}
            <div className="flex items-center bg-zinc-950 px-1 py-1 rounded border border-zinc-905 gap-1" title="Select game layout screen size">
              <span className="text-[9px] text-zinc-500 font-mono uppercase px-1.5 font-bold">Size:</span>
              {[
                { id: 'standard', label: 'Std' },
                { id: 'cinema', label: 'Cinema' },
                { id: 'theater', label: 'Theater' },
                { id: 'giant', label: 'Giant (75vh)' }
              ].map((sz) => (
                <button
                  key={sz.id}
                  onClick={() => setSizeMode(sz.id)}
                  className={`px-2 py-1 text-[10px] font-mono rounded font-bold transition-all ${
                    sizeMode === sz.id 
                      ? 'bg-rose-600 text-black shadow-sm font-black' 
                      : 'bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>

            {/* Reload State */}
            <button
              onClick={handleReload}
              className="p-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded transition-all border border-zinc-850"
              title="Reload Frame State"
            >
              <RotateCw size={12} />
            </button>

            {/* Native Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="bg-rose-600 hover:bg-rose-700 hover:scale-102 active:scale-98 text-black font-black uppercase text-xs px-3.5 py-1.5 rounded transition-all flex items-center gap-1 shadow-lg"
              title="Go to true system fullscreen wrapper"
            >
              <Maximize2 size={11} />
              <span>Fullscreen</span>
            </button>
          </div>
        </div>

        {/* The Frame Theater Wrapper */}
        <div className="transition-all duration-500 mx-auto w-full">
          <div className={`relative rounded bg-black border border-zinc-900 hover:border-rose-600 transition-all duration-300 group shadow-2xl overflow-hidden ${
            sizeMode === 'giant' 
              ? 'h-[75vh] min-h-[550px] aspect-auto' 
              : sizeMode === 'theater'
              ? 'aspect-[16/10] w-full'
              : 'aspect-video w-full'
          }`}>
            {/* Decorative Scanlines */}
            <div className="absolute inset-0 scanlines pointer-events-none opacity-[0.03]" />

            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={resolvePlayableUrl(game.iframeUrl)}
              className="w-full h-full border-none outline-none relative z-10 bg-black"
              title={game.title}
              allow="autoplay; gamepad; fullscreen; focus-without-user-activation *"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Troubleshooting and Game Details Section */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-20">
          {/* Rating and Local Feedback Panel */}
          <div className="md:col-span-1 bg-[#09090c] border border-zinc-900 rounded p-4 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-100 flex items-center gap-1.5">
                <Sparkles size={13} className="text-rose-500 animate-pulse" />
                Player Portal Rating
              </h3>
              <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">
                Pre-configured default score is <span className="text-yellow-400 font-bold">{game.rating}</span> stars. Submit your quick review to adjust.
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-zinc-950 flex flex-col items-center">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-1.5">
                {userRating || hasRatedBefore ? 'THANK YOU FOR REVIEWING!' : 'SUBMIT STAR VOTE'}
              </span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((stars) => {
                  const active = (isHoveringStars !== null ? isHoveringStars : (userRating || game.rating)) >= stars;
                  return (
                    <button
                      key={stars}
                      onMouseEnter={() => !userRating && setIsHoveringStars(stars)}
                      onMouseLeave={() => !userRating && setIsHoveringStars(null)}
                      onClick={() => !userRating && handleRatingSubmit(stars)}
                      disabled={hasRatedBefore || userRating !== null}
                      className={`p-0.5 transition-all ${hasRatedBefore || userRating !== null ? 'cursor-default' : 'hover:scale-125'}`}
                    >
                      <Star
                        size={18}
                        className={`transition-all ${active ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-700'}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Troubleshooting Advice */}
          <div className="md:col-span-2 bg-[#09090c] border border-zinc-900 rounded p-4 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-100 flex items-center gap-1.5">
                <AlertTriangle size={13} className="text-rose-500" />
                Why does this game screen appear blank?
              </h3>
              <p className="text-[10px] text-zinc-400 mt-1 leading-relaxed">
                1. <strong>Strict School Firewall Policies</strong>: Many local content filters explicitly blacklist Scratch projects (<code className="bg-zinc-950 px-1 py-0.5 text-rose-400 text-[9px] rounded">scratch.mit.edu</code>) or custom hosting domains.
              </p>
              <p className="text-[10px] text-zinc-400 mt-0.5 leading-relaxed">
                2. <strong>Browser Context Restrictions</strong>: Embedded iframes sometimes require active permissions. To bypass school block guards, press the <strong>Full Tap</strong> button above to launch the standalone portal!
              </p>
            </div>
            <div className="text-[9px] font-mono text-zinc-500 mt-2.5 pt-2.5 border-t border-zinc-950 flex justify-between items-center bg-zinc-950/20 px-2 py-1 rounded">
              <span>SANDBOX_LEVEL_IFRAME_SECURE</span>
              <span className="text-green-500 font-bold">STATUS: RUNNING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
