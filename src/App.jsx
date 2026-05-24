import { useState, useEffect } from 'react';
import { 
  Gamepad2, Search, Shuffle, ShieldCheck, Heart, 
  Trash2, ShieldAlert, BadgePlus, EyeOff, Trophy,
  Play, Star
} from 'lucide-react';
import * as Icons from 'lucide-react';
import defaultGames from './games.json';
import { GameCard } from './components/GameCard.jsx';
import { TheaterView } from './components/TheaterView.jsx';
import { PanicDisguise } from './components/PanicDisguise.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';

const ALL_CATEGORIES = [
  'All', 'Favorites', 'Arcade', 'Puzzle', 'Action', 'Retro', 'Simulator', 'Adventure', 'Custom'
];

export default function App() {
  // Core database states
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ratedGames, setRatedGames] = useState([]);
  const [lastPlayedId, setLastPlayedId] = useState(null);

  // Navigation / Search / Visual Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [runningGame, setRunningGame] = useState(null);

  // Modals & Panels visibility
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Tactical Camouflage / Stealth configurations
  const [isDisguiseArmed, setIsDisguiseArmed] = useState(false);
  const [disguiseType, setDisguiseType] = useState('google-docs');
  const [customTabName, setCustomTabName] = useState('Calculus II Continuity Notes');


  // Initialize title and merge default presets with local user-injected feeds on load
  useEffect(() => {
    document.title = 'Mathpracticeforray';

    // 1. Initialize custom games from Local Storage
    const localCustomStr = localStorage.getItem('unblocked_custom_games');
    let customList = [];
    if (localCustomStr) {
      try {
        customList = JSON.parse(localCustomStr);
      } catch (e) {
        console.error('Failed reading custom unblocked games database', e);
      }
    }

    // 2. Load custom rating tracks & play counts from local storage as increments
    const localPlaysStr = localStorage.getItem('unblocked_plays_hud');
    let playsRecord = {};
    if (localPlaysStr) {
      try {
        playsRecord = JSON.parse(localPlaysStr);
      } catch (e) {
        console.error(e);
      }
    }

    const localRatingsStr = localStorage.getItem('unblocked_ratings_voted');
    let ratingsRecord = {};
    if (localRatingsStr) {
      try { ratingsRecord = JSON.parse(localRatingsStr); } catch (e) {}
    }

    // Combine preset games and custom games, patching custom counts if they exist in state maps
    const enrichedPresets = defaultGames.map((g) => ({
      ...g,
      plays: playsRecord[g.id] !== undefined ? playsRecord[g.id] : g.plays,
      rating: ratingsRecord[g.id] !== undefined ? ratingsRecord[g.id] : g.rating,
    }));

    const enrichedCustoms = customList.map((g) => ({
      ...g,
      plays: playsRecord[g.id] !== undefined ? playsRecord[g.id] : 0,
      rating: ratingsRecord[g.id] !== undefined ? ratingsRecord[g.id] : 5.0,
    }));

    setGames([...enrichedPresets, ...enrichedCustoms]);

    // 3. Load favorites list
    const localFavsStr = localStorage.getItem('unblocked_favorites');
    if (localFavsStr) {
      try {
        setFavorites(JSON.parse(localFavsStr));
      } catch (e) {
        console.error(e);
      }
    }

    // 4. Load list of already rated items
    const localRatedKeys = localStorage.getItem('unblocked_already_rated_keys');
    if (localRatedKeys) {
      try {
        setRatedGames(JSON.parse(localRatedKeys));
      } catch (e) {}
    }

    // 5. Load last played game ID
    const savedLastPlayed = localStorage.getItem('mathpractice_last_played');
    if (savedLastPlayed) {
      setLastPlayedId(savedLastPlayed);
    }
  }, []);

  // Global browser shortcut observer (Escape triggers instant school-safe camouflage)
  useEffect(() => {
    const handleGlobalKeys = (e) => {
      // Escape triggers stealth mode dynamically
      if (e.key === 'Escape' && !isDisguiseArmed) {
        e.preventDefault();
        armDisguise();
      }
    };

    window.addEventListener('keydown', handleGlobalKeys);
    return () => window.removeEventListener('keydown', handleGlobalKeys);
  }, [isDisguiseArmed, disguiseType, customTabName]);

  // Tab Title & Favicon replacement triggers
  const armDisguise = () => {
    setIsDisguiseArmed(true);
    
    // Choose appropriate title
    if (disguiseType === 'google-docs') {
      document.title = `${customTabName || 'Calculus II Continuity Notes'} - Google Docs`;
    } else if (disguiseType === 'google-slides') {
      document.title = `${customTabName || 'Calculus Review Limits Sheet'} - Google Slides`;
    } else if (disguiseType === 'google-sheets') {
      document.title = `${customTabName || 'Calculus Homework Ledger'} - Google Sheets`;
    } else if (disguiseType === 'geogebra') {
      document.title = 'GeoGebra Graphing Calculator - Free Online Math Tool';
    } else if (disguiseType === 'khan-academy') {
      document.title = 'Riemann Sums Definite Integral | Lesson | Khan Academy';
    } else {
      document.title = 'Canvas Student Dashboard - Fall 2026 Course Links';
    }

    // Hijack Favicon
    let faviconLink = document.querySelector("link[rel~='icon']");
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(faviconLink);
    }
    
    // Save previous state for recovery
    window._savedPrevIcon = faviconLink.href;

    if (disguiseType === 'google-docs') {
      faviconLink.href = 'https://ssl.gstatic.com/docs/documents/images/kix-favicon-2023q4.ico';
    } else if (disguiseType === 'google-slides') {
      faviconLink.href = 'https://ssl.gstatic.com/docs/presentations/images/slides-favicon-2023q4.ico';
    } else if (disguiseType === 'google-sheets') {
      faviconLink.href = 'https://ssl.gstatic.com/docs/spreadsheets/images/spreadsheets-favicon-2023q4.ico';
    } else if (disguiseType === 'geogebra') {
      faviconLink.href = 'https://www.geogebra.org/favicon.ico';
    } else if (disguiseType === 'khan-academy') {
      faviconLink.href = 'https://www.khanacademy.org/favicon.ico';
    } else {
      faviconLink.href = 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e05d5730a8.ico';
    }
  };

  const disarmDisguise = () => {
    setIsDisguiseArmed(false);
    document.title = 'Mathpracticeforray';
    
    let faviconLink = document.querySelector("link[rel~='icon']");
    if (faviconLink && window._savedPrevIcon) {
      faviconLink.href = window._savedPrevIcon;
    } else if (faviconLink) {
      faviconLink.href = '/favicon.ico';
    }
  };


  // Toggle user game favorite state
  const handleToggleFavorite = (gameId, e) => {
    e.stopPropagation(); // Avoid triggering card selected
    let updated;
    if (favorites.includes(gameId)) {
      updated = favorites.filter((id) => id !== gameId);
    } else {
      updated = [...favorites, gameId];
    }
    setFavorites(updated);
    localStorage.setItem('unblocked_favorites', JSON.stringify(updated));
  };

  // Handle game select actions
  const handleSelectGame = (game) => {
    setRunningGame(game);
    setLastPlayedId(game.id);
    localStorage.setItem('mathpractice_last_played', game.id);
  };

  // Run random game utility
  const handlePlayRandom = () => {
    if (games.length === 0) return;
    const randomIndex = Math.floor(Math.random() * games.length);
    handleSelectGame(games[randomIndex]);
  };

  // Add custom unblocked game URL
  const handleAddCustomGame = (newGamePayload) => {
    const freshGame = {
      ...newGamePayload,
      plays: 0,
      rating: 5.0,
    };

    // Save locally
    const localCustomStr = localStorage.getItem('unblocked_custom_games');
    let list = [];
    if (localCustomStr) {
      try { list = JSON.parse(localCustomStr); } catch (e) {}
    }
    const updatedList = [freshGame, ...list];
    localStorage.setItem('unblocked_custom_games', JSON.stringify(updatedList));

    // Append to live context
    setGames((prev) => [freshGame, ...prev]);
    setSelectedCategory('Custom'); // Scroll viewport direct to customs
  };

  // Delete/Clear dynamic custom games
  const handleDeleteCustomGame = (gameId, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this custom game?')) return;

    const localCustomStr = localStorage.getItem('unblocked_custom_games');
    let list = [];
    if (localCustomStr) {
      try { list = JSON.parse(localCustomStr); } catch (e) {}
    }
    const updatedList = list.filter((g) => g.id !== gameId);
    localStorage.setItem('unblocked_custom_games', JSON.stringify(updatedList));

    // Remove from running state
    setGames((prev) => prev.filter((g) => g.id !== gameId));
    
    // Clear favorites state
    if (favorites.includes(gameId)) {
      const updatedFavs = favorites.filter((id) => id !== gameId);
      setFavorites(updatedFavs);
      localStorage.setItem('unblocked_favorites', JSON.stringify(updatedFavs));
    }
  };

  // Real-time custom statistics triggers
  const handleIncrementPlayCount = (gameId) => {
    // Increment count
    const localPlaysStr = localStorage.getItem('unblocked_plays_hud');
    let playsRecord = {};
    if (localPlaysStr) {
      try { playsRecord = JSON.parse(localPlaysStr); } catch (e) {}
    }

    const currentCount = playsRecord[gameId] !== undefined ? playsRecord[gameId] : 0;
    playsRecord[gameId] = currentCount + 1;
    localStorage.setItem('unblocked_plays_hud', JSON.stringify(playsRecord));

    // Update state to increment live counts
    setGames((prev) => 
      prev.map((g) => {
        if (g.id === gameId) {
          return { ...g, plays: g.plays + 1 };
        }
        return g;
      })
    );
  };

  // Update game star rating (user submits custom feedback)
  const handleUpdateGameRating = (gameId, stars) => {
    const updatedRated = [...ratedGames, gameId];
    setRatedGames(updatedRated);
    localStorage.setItem('unblocked_already_rated_keys', JSON.stringify(updatedRated));

    // Increment records
    const localRatingsStr = localStorage.getItem('unblocked_ratings_voted');
    let ratingsRecord = {};
    if (localRatingsStr) {
      try { ratingsRecord = JSON.parse(localRatingsStr); } catch (e) {}
    }

    // Blend vote linearly
    const originalGame = games.find((g) => g.id === gameId);
    if (!originalGame) return;

    const currentRating = originalGame.rating;
    const blended = Number(((currentRating * 9 + stars) / 10).toFixed(1)); // Custom blended vote ratio
    ratingsRecord[gameId] = blended;
    localStorage.setItem('unblocked_ratings_voted', JSON.stringify(ratingsRecord));

    setGames((prev) => 
      prev.map((g) => {
        if (g.id === gameId) {
          return { ...g, rating: blended };
        }
        return g;
      })
    );
  };

  // Calculate live cumulative playing dashboard statistics
  const totalLibraryPlays = games.reduce((acc, curr) => acc + curr.plays, 0);
  const userAddedCount = games.filter((g) => g.isCustom).length;

  // Resolve last played game details from loaded inventory list
  const lastPlayedGame = games.find((g) => g.id === lastPlayedId);

  // Quick helper to draw dynamic Lucide icons inside last played
  function LastPlayedIcon({ name, className }) {
    const IconComponent = Icons[name] || Gamepad2;
    return <IconComponent className={className} />;
  }

  // Filter and compute active query lists
  const filteredGames = games.filter((g) => {
    // Category check
    if (selectedCategory === 'Favorites') {
      if (!favorites.includes(g.id)) return false;
    } else if (selectedCategory === 'Custom') {
      if (!g.isCustom) return false;
    } else if (selectedCategory !== 'All') {
      if (g.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
    }

    // Text query search match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchDesc = g.description.toLowerCase().includes(q);
      const matchCat = g.category.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchCat;
    }

    return true;
  });

  return (
    <div className="bg-[#030304] text-zinc-100 font-sans min-h-screen relative overflow-x-hidden selection:bg-rose-600 selection:text-black">
      {/* Background Cybernetic glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-rose-955/20 via-transparent to-transparent pointer-events-none blur-3xl z-0" />
      
      {/* Tactical camouflaged invisible screen overlay */}
      <PanicDisguise 
        isArmed={isDisguiseArmed} 
        onDeactivate={disarmDisguise} 
        activeDisguise={disguiseType}
        customTitle={customTabName}
      />

      {/* Main Container */}
      <div className="relative z-10">
        {/* Play Active game container wrapper */}
        {runningGame ? (
          <TheaterView 
            game={runningGame}
            onBack={() => setRunningGame(null)}
            onIncrementPlay={handleIncrementPlayCount}
            onUpdateRating={handleUpdateGameRating}
            hasRatedBefore={ratedGames.includes(runningGame.id)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            
            {/* Upper Interactive Dashboard Banner - high density esports portal */}
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-zinc-900 select-none">
              <div className="flex items-center space-x-3">
                {/* Visual Esports Logo Badge */}
                <div className="w-12 h-12 bg-rose-600 rounded flex items-center justify-center text-black font-black shadow-md hover:scale-102 transition-transform duration-200">
                  <Gamepad2 size={26} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase">
                      MATHPRACTICEFOR<span className="text-rose-600">RAY</span>
                    </h1>
                    <span className="hidden sm:inline bg-rose-955/20 text-rose-500 border border-rose-500/30 px-1.5 py-0.2 rounded font-mono font-black text-[9px] tracking-widest uppercase animate-pulse">
                      PORTAL ARMED
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Zero latency direct iframe algebra and calculus simulator portal for Ray with quick camouflage parachute switches.
                  </p>

                </div>
              </div>

              {/* Action Toolbar Header */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Random game trigger */}
                <button
                  onClick={handlePlayRandom}
                  className="bg-zinc-950 hover:bg-neutral-900 border border-zinc-855 hover:border-rose-600 text-zinc-300 hover:text-rose-500 text-xs py-2 px-3.5 rounded font-mono transition-all duration-200 flex items-center gap-1.5 shadow"
                >
                  <Shuffle size={13} className="text-rose-500" />
                  <span>Random Draft</span>
                </button>

                {/* Camouflage configuration quick widget */}
                <div className="bg-zinc-950 border border-zinc-900 py-1.5 px-3 rounded flex items-center space-x-2 text-xs text-zinc-400">
                  <ShieldCheck size={13} className="text-green-500" />
                  <span className="font-mono text-[11px]">Camouflage:</span>
                  <select
                    className="bg-transparent text-rose-500 font-bold focus:outline-none cursor-pointer text-[11px]"
                    value={disguiseType}
                    onChange={(e) => setDisguiseType(e.target.value)}
                  >
                    <option className="bg-[#09090c] text-zinc-300" value="google-docs">Google Docs</option>
                    <option className="bg-[#09090c] text-zinc-300" value="google-slides">Google Slides</option>
                    <option className="bg-[#09090c] text-zinc-300" value="google-sheets">Google Sheets</option>
                    <option className="bg-[#09090c] text-zinc-300" value="khan-academy">Khan Academy</option>
                    <option className="bg-[#09090c] text-zinc-300" value="canvas">Canvas LMS</option>
                    <option className="bg-[#09090c] text-zinc-300" value="geogebra">GeoGebra Math</option>
                  </select>

                </div>

                {/* Add custom file direct embed trigger */}
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-rose-600 hover:bg-rose-700 hover:scale-101 active:scale-99 text-black text-xs font-black uppercase py-2 px-3.5 rounded transition-all shadow-md flex items-center gap-1.5"
                >
                  <BadgePlus size={13} />
                  <span>Inject Iframe</span>
                </button>
              </div>
            </header>

            {/* Last Played Game Section */}
            {lastPlayedGame && (
              <div className="bg-[#09090c] border border-zinc-900 rounded p-4 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 select-none mb-6 relative overflow-hidden group">
                {/* Ambient glow accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 rounded-full pointer-events-none blur-2xl group-hover:bg-rose-600/10 transition-all duration-300" />
                
                <div className="flex items-center space-x-3.5 z-10 w-full md:w-auto">
                  {/* Thumbnail / Icon slot */}
                  <div className="w-10 h-10 rounded bg-[#121216] border border-zinc-900 group-hover:border-rose-500/40 flex items-center justify-center text-rose-500 relative overflow-hidden shrink-0 transition-all duration-300">
                    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4px_4px]" />
                    {lastPlayedGame.game_image_icon ? (
                      <img 
                        src={lastPlayedGame.game_image_icon} 
                        alt={`${lastPlayedGame.title} Icon`} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover relative z-10 transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <div style={{ display: lastPlayedGame.game_image_icon ? 'none' : 'block' }} className="relative z-10">
                      <LastPlayedIcon name={lastPlayedGame.icon} className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-rose-500 font-bold block mb-0.5">
                      ✦ RESUME SESSION - LAST PLAYED
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-white tracking-tight leading-none">{lastPlayedGame.title}</h2>
                      <span className="text-[9px] font-mono text-zinc-400 bg-zinc-950 px-1.5 py-0.2 border border-zinc-900 rounded font-bold uppercase">{lastPlayedGame.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 z-10 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-3.5 text-right font-mono text-[10px] text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-yellow-500 fill-yellow-500" />
                      <span>{lastPlayedGame.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Play size={10} className="text-rose-500" />
                      <span>{lastPlayedGame.plays.toLocaleString()} plays</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectGame(lastPlayedGame)}
                    className="bg-zinc-950 hover:bg-rose-600 hover:text-black border border-zinc-855 hover:border-rose-600 text-zinc-300 text-xs py-1.5 px-4 rounded font-mono font-bold transition-all duration-250 shadow flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play size={11} className="fill-current" />
                    <span>Instant Resume</span>
                  </button>
                </div>
              </div>
            )}

            {/* Core Grid layouts */}
            <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
              
              {/* Left Column (Search, Settings & Info Panel) */}
              <div className="lg:col-span-1 space-y-4 select-none">
                
                {/* Instant Search Bar */}
                <div className="bg-[#09090c] border border-zinc-900 rounded p-4 shadow-md">
                  <h3 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-black flex items-center justify-between">
                    <span>Search Library</span>
                    <Search size={11} className="text-rose-500" />
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Dodge, Pacman, Retro..."
                      className="w-full bg-[#121216] border border-zinc-900 focus:border-rose-600 rounded px-3 py-2 pl-9 text-xs text-zinc-100 placeholder-zinc-700 outline-none transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-zinc-700 w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Dashboard Profile Metrics Radar */}
                <div className="bg-[#09090c] border border-zinc-900 rounded p-4 shadow-md">
                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-3.5 font-black flex items-center gap-1.5 border-b border-zinc-955 pb-2">
                    <Trophy size={12} className="text-rose-500" />
                    Portal Stats HUD
                  </h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-mono py-0.5 border-b border-zinc-955/40">
                      <span className="text-zinc-500">Verified Portals</span>
                      <span className="text-zinc-200 font-bold">{games.length} units</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-0.5 border-b border-zinc-955/40">
                      <span className="text-zinc-500">Telemetry Plays</span>
                      <span className="text-zinc-200 font-bold">{totalLibraryPlays.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-0.5 border-b border-zinc-955/40">
                      <span className="text-zinc-500">Custom Injected</span>
                      <span className="text-rose-500 font-bold">{userAddedCount} index</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono py-0.5">
                      <span className="text-zinc-500">Favorites pinned</span>
                      <span className="text-yellow-500 font-bold flex items-center gap-1">
                        <Heart size={9} className="fill-yellow-500 text-yellow-500" />
                        {favorites.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Emergency Camouflage Tactical Guide */}
                <div className="bg-[#09090c] border border-zinc-900 bg-gradient-to-br from-rose-955/5 to-transparent rounded p-4 shadow-md relative overflow-hidden">
                  <h3 className="text-[10px] font-mono text-rose-500 uppercase tracking-widest mb-2 font-black flex items-center gap-1.5">
                    <ShieldAlert size={14} className="text-rose-500" />
                    Teacher\'s Radar Guard
                  </h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
                    Instantly mask your school gaming tab under an incredibly detailed, customizable educational page with editable notes typing.
                  </p>

                  <div className="bg-[#121216] border border-zinc-900 p-2.5 rounded font-mono text-[10px] text-zinc-400 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span>Tactical Hotkey:</span>
                      <span className="bg-rose-955/20 border border-rose-500/20 text-rose-500 font-bold px-1.5 py-0.2 rounded font-sans tracking-wide">ESC KEY</span>
                    </div>
                    <div className="mt-1 pb-1 border-t border-zinc-955 pt-1.5 flex flex-col gap-1">
                      <label className="text-[9px] text-zinc-500 uppercase font-semibold">Custom Doc/Slide Title:</label>
                      <input
                        type="text"
                        className="bg-zinc-950 text-xs text-zinc-300 px-2 py-1 rounded outline-none border border-zinc-900 focus:border-rose-600 text-[11px]"
                        value={customTabName}
                        onChange={(e) => setCustomTabName(e.target.value)}
                        placeholder="e.g. Science Homework"
                      />

                    </div>
                  </div>

                  <button
                    onClick={armDisguise}
                    className="w-full bg-zinc-950 hover:bg-zinc-900 text-rose-500 hover:text-rose-400 font-mono text-[11px] border border-zinc-90 w-full hover:border-rose-600 transition-colors py-2 rounded mt-3 font-bold flex items-center justify-center gap-1.5"
                  >
                    <EyeOff size={11} />
                    <span>Test Stealth Mask</span>
                  </button>
                </div>
              </div>

              {/* Right Columns (Categories and Games Deck) */}
              <div className="lg:col-span-3 space-y-4">
                
                {/* Horizontal Category Pill Selector Grid */}
                <div className="bg-[#09090c] border border-zinc-900 rounded p-2 shadow-sm relative z-10 select-none overflow-x-auto">
                  <div className="flex space-x-1.5 shrink-0 min-w-max px-0.5">
                    {ALL_CATEGORIES.map((category) => {
                      const isActive = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`font-mono text-[11px] px-3.5 py-1.5 rounded transition-all font-semibold border ${isActive ? 'bg-rose-955/20 text-rose-500 border-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.1)] font-bold' : 'bg-[#030304] text-zinc-400 hover:text-zinc-200 border-zinc-900 hover:border-zinc-800'}`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Search query feedback title */}
                {(searchQuery || selectedCategory !== 'All') && (
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 select-none pb-0 bg-zinc-950/20 px-3 py-1.5 rounded border border-zinc-900">
                    <span className="flex items-center gap-1">
                      <span>Filter Active:</span>
                      <strong className="text-zinc-300 bg-zinc-900 px-1.5 py-0.2 rounded uppercase">{selectedCategory}</strong>
                      {searchQuery && (
                        <>
                          <span>containing</span>
                          <strong className="text-zinc-300 bg-zinc-900 px-1.5 py-0.2 rounded">"{searchQuery}"</strong>
                        </>
                      )}
                    </span>
                    <span>Found {filteredGames.length} portals</span>
                  </div>
                )}

                {/* Main Games Grid List */}
                {filteredGames.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredGames.map((game) => (
                      <div key={game.id} className="relative">
                        <GameCard 
                          game={game}
                          isFavorite={favorites.includes(game.id)}
                          onSelect={handleSelectGame}
                          onToggleFavorite={handleToggleFavorite}
                        />

                        {/* Custom created game delete utility */}
                        {game.isCustom && (
                          <button
                            onClick={(e) => handleDeleteCustomGame(game.id, e)}
                            className="absolute bottom-10 right-3.5 bg-zinc-950/90 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 p-1 rounded border border-zinc-900 hover:border-rose-500/20 transition-all z-20"
                            title="Delete custom game link from browser storage"
                          >
                            <Trash2 size={11} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#09090c] border border-dashed border-zinc-900 rounded py-12 px-4 text-center select-none">
                    <ShieldAlert size={32} className="text-rose-500 mx-auto mb-3 animate-bounce" />
                    <h3 className="font-sans font-bold text-sm text-zinc-200">
                      No Unblocked Matches Located
                    </h3>
                    <p className="text-[11px] text-zinc-500 max-w-sm mx-auto mt-0.5 leading-relaxed">
                      We couldn\'t locate any games meeting your current query. Try adjusting your search keyword, choosing the default category, or inject a custom game link!
                    </p>
                    <div className="mt-4 flex justify-center gap-1.5 text-xs">
                      <button
                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                        className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-white px-3 py-1.5 rounded text-[11px] font-mono transition-colors"
                      >
                        Reset Search Filters
                      </button>
                      <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-rose-600 hover:bg-rose-700 text-black font-black uppercase px-3.5 py-1.5 rounded text-[11px] transition-colors shadow"
                      >
                        Inject Custom Link
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        )}
      </div>

      {/* Inject New game dynamic trigger popup */}
      <AddGameModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddCustomGame}
      />
    </div>
  );
}
