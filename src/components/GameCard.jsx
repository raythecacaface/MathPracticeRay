import { useState } from 'react';
import * as Icons from 'lucide-react';

// Map database strings to actual Lucide component instances
function DynamicIcon({ name, className }) {
  const IconComponent = Icons[name] || Icons.Gamepad2;
  return <IconComponent className={className} />;
}

export function GameCard({ game, isFavorite, onSelect, onToggleFavorite }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onSelect(game)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-[#09090c] border border-zinc-800 hover:border-rose-600 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-[0_0_15px_rgba(225,29,72,0.15)]"
      id={`game-card-${game.id}`}
    >
      {/* Top micro-line indicator */}
      <div className={`h-[2px] w-full bg-rose-600 transition-all duration-300 ${isHovered ? 'opacity-100 shadow-[0_0_8px_#e11d48]' : 'opacity-20'}`} />

      {/* Card Content area - Highly Dense */}
      <div className="p-3.5 flex-grow">
        <div className="flex items-start justify-between mb-3">
          {/* Icon frame matching High Density thumbnail block */}
          <div className="w-11 h-11 rounded bg-zinc-900 border border-zinc-800 group-hover:border-rose-600/40 flex items-center justify-center text-rose-500 transition-colors duration-300 relative overflow-hidden shrink-0">
            {/* Retro grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4px_4px]" />
            
            <DynamicIcon name={game.icon} className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
            
            {/* Custom Game Badge indicator */}
            {game.isCustom && (
              <span className="absolute top-0.5 right-0.5 bg-rose-600 text-[7px] text-black px-1 rounded font-mono font-black uppercase tracking-widest scale-90">
                USR
              </span>
            )}
            
            {/* Scratch Frame Indicator */}
            {game.isScratch && (
              <span className="absolute top-0.5 left-0.5 bg-yellow-400 text-[7px] text-zinc-950 px-1 rounded font-mono font-black uppercase tracking-widest scale-90">
                SCR
              </span>
            )}
          </div>

          {/* Sparkly / Favorite indicators */}
          <div className="flex items-center gap-1">
            {game.plays > 10000 && (
              <span className="text-[8px] font-black bg-rose-600 text-black px-1.5 py-0.5 rounded tracking-wider uppercase">
                HOT
              </span>
            )}
            <button
              onClick={(e) => onToggleFavorite(game.id, e)}
              className="text-zinc-500 hover:text-rose-500 p-1 rounded hover:bg-zinc-900 transition-colors z-20"
              aria-label="Toggle game in favorites"
            >
              <Icons.Heart
                size={15}
                className={`transition-all ${isFavorite ? 'fill-rose-600 text-rose-600 scale-110' : 'text-zinc-600 group-hover:text-zinc-400'}`}
              />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-sans font-bold text-sm text-zinc-100 group-hover:text-rose-500 transition-colors tracking-tight line-clamp-1">
          {game.title}
        </h3>

        {/* Description: tight density */}
        <p className="font-sans text-[11px] text-zinc-400 line-clamp-2 mt-0.5 mb-3 leading-snug">
          {game.description}
        </p>

        {/* Categories tags - Mini capsules */}
        <div className="flex flex-wrap gap-1 select-none">
          <span className="text-[9px] font-mono uppercase bg-rose-955/20 text-rose-500 border border-rose-900/30 px-2 py-0.2 rounded font-bold">
            {game.category}
          </span>
          {game.isScratch && (
            <span className="text-[9px] font-mono bg-yellow-400/10 text-yellow-500 border border-yellow-400/15 px-1.5 py-0.2 rounded font-bold">
              Sandbox
            </span>
          )}
        </div>
      </div>

      {/* Footer statistics bar */}
      <div className="bg-[#050507] border-t border-zinc-900/60 py-2 px-3.5 flex items-center justify-between text-[10px] font-mono text-zinc-500 select-none">
        <div className="flex items-center space-x-1">
          <Icons.Play size={9} className="text-rose-500" />
          <span>{game.plays.toLocaleString()} plays</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icons.Star size={9} className="text-yellow-500 fill-yellow-500" />
          <span className="text-zinc-300">{game.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
