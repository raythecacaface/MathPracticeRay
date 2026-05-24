import { useState } from 'react';
import { X, Sparkles, AlertCircle, Bookmark } from 'lucide-react';

const CATEGORY_CHOICES = ['Arcade', 'Puzzle', 'Simulator', 'Action', 'Retro', 'Adventure', 'Custom'];
const ICON_CHOICES = [
  { value: 'Gamepad2', label: 'Classic Gamepad 🎮' },
  { value: 'Grid', label: 'Puzzle Grid 🔲' },
  { value: 'Flame', label: 'Elemental Sandbox 🔥' },
  { value: 'Hexagon', label: 'Geometric Block ⬡' },
  { value: 'Activity', label: 'Dynamic Flap 📈' },
  { value: 'CircleDot', label: 'Arcade Maze 🟡' },
  { value: 'Rocket', label: 'Vector Spaceship 🚀' },
  { value: 'ShieldAlert', label: 'Defense Cannon 🛡️' },
];

export function AddGameModal({ isOpen, onClose, onAddGame }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Custom');
  const [description, setDescription] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('Gamepad2');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Field Validations
    if (!title.trim()) {
      setFormError('Game Title is required.');
      return;
    }
    if (!iframeUrl.trim()) {
      setFormError('Iframe Embedding Source URL is required.');
      return;
    }

    // Direct url validation
    if (!iframeUrl.startsWith('http://') && !iframeUrl.startsWith('https://')) {
      setFormError('Embed link must start with http:// or https://');
      return;
    }

    // Auto-enrich Scratch URLs if the user just pastes standard project URLs instead of embeds
    let finalizedUrl = iframeUrl;
    if (iframeUrl.includes('scratch.mit.edu/projects/') && !iframeUrl.includes('/embed/')) {
      const match = iframeUrl.match(/projects\/(\d+)/);
      if (match && match[1]) {
        finalizedUrl = `https://scratch.mit.edu/projects/embed/${match[1]}/`;
      }
    }

    // Submit Custom Game callback
    onAddGame({
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      description: description.trim() || 'A user-crafted unblocked custom game entry.',
      iframeUrl: finalizedUrl,
      icon: selectedIcon,
      isCustom: true,
      isScratch: finalizedUrl.includes('scratch.mit.edu'),
    });

    // Reset Form
    setTitle('');
    setCategory('Custom');
    setDescription('');
    setIframeUrl('');
    setSelectedIcon('Gamepad2');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xs p-4 animate-fadeIn">
      <div 
        className="bg-[#09090c] border border-rose-600 rounded-lg w-full max-w-md overflow-hidden shadow-[0_0_25px_rgba(225,29,72,0.15)] relative"
        id="add-game-modal"
      >
        {/* Decorative Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

        {/* Modal Top Banner */}
        <div className="bg-[#0e0e12] border-b border-zinc-90 w-full px-5 py-3 flex items-center justify-between relative z-10 select-none">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-rose-500 w-4 h-4 animate-pulse" />
            <span className="font-sans font-black text-sm uppercase tracking-wider text-zinc-100">
              Inject Custom Emulator Source
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-rose-500 p-1 rounded hover:bg-zinc-900 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Modal Inputs Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 relative z-10">
          {formError && (
            <div className="bg-rose-500/10 border border-rose-500/20 p-2.5 rounded flex items-start space-x-2 text-rose-400 text-[11px]">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
              Game Title or Alias
            </label>
            <input
              type="text"
              placeholder="e.g. Minecraft 2D Prototype"
              className="w-full bg-[#121216] border border-zinc-900 focus:border-rose-600 rounded px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-700 outline-none transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={40}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
                Category Group
              </label>
              <select
                className="w-full bg-[#121216] border border-zinc-900 focus:border-rose-600 rounded px-2.5 py-1.5 text-xs text-zinc-100 outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_CHOICES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
                Visual Icon / Avatar
              </label>
              <select
                className="w-full bg-[#121216] border border-zinc-900 focus:border-rose-600 rounded px-2.5 py-1.5 text-xs text-zinc-100 outline-none"
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
              >
                {ICON_CHOICES.map((choice) => (
                  <option key={choice.value} value={choice.value}>
                    {choice.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
              Iframe Embedding Source Link (HTTPS Only)
            </label>
            <input
              type="url"
              placeholder="e.g. https://play2048.co/ or Scratch Link"
              className="w-full bg-[#121216] border border-zinc-900 focus:border-rose-600 rounded px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-700 outline-none transition-all"
              value={iframeUrl}
              onChange={(e) => setIframeUrl(e.target.value)}
              required
            />
            <p className="text-[9px] text-zinc-500 font-sans mt-0.5">
              Friendly Hint: Standard Scratch paths are auto-corrected!
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
              Brief Narrative / Description (Optional)
            </label>
            <textarea
              placeholder="Provide hints, keys, controls or cheat codes..."
              className="w-full h-14 bg-[#121216] border border-zinc-900 focus:border-rose-600 rounded px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-700 outline-none transition-all resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={120}
            />
          </div>

          {/* Action Footer Button */}
          <div className="pt-2.5 border-t border-zinc-950 flex justify-end gap-2 text-xs select-none">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 hover:bg-zinc-900 border border-zinc-900 text-zinc-400 hover:text-white rounded transition-colors font-medium text-[11px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 hover:scale-102 active:scale-98 text-black font-black uppercase tracking-wider px-4 py-1.5 rounded transition-all shadow-md flex items-center gap-1.5 text-[11px]"
            >
              <Bookmark size={11} />
              <span>Add to Feed</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
