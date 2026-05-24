import { useState, useEffect } from 'react';
import { EyeOff, ShieldCheck, Keyboard } from 'lucide-react';

export function PanicDisguise({
  isArmed,
  onDeactivate,
  activeDisguise,
  customTitle,
}) {
  const [typedText, setTypedText] = useState(
    '# AP European History - Chapter 12 Notes\n\n## Section 1: The Industrial Revolution\nThe development of steam power, starting in Great Britain in the mid-18th century, profoundly altered the infrastructure of global manufacturing. Mechanization replaced traditional cottage industries, leading to mass urbanization and a rapid restructuring of socioeconomic classes.\n\n### Key Milestones:\n1. Thomas Newcomen designs the first atmospheric steam engine (1712).\n2. James Watt optimizes the design, drastically reducing coal usage (1776).\n3. Eli Whitney invents the cotton gin, accelerating textile supply chains (1793).\n\n## Section 2: Demographic Shifts\nAs factory jobs congregated in metropolitan hubs, millions migrated from agrarian fields to inner-cities. This unprecedented high-density living spurred infrastructural crises and eventually inspired the rise of regulatory health and labor laws.'
  );

  // Keyboard shortcut listener to disarm
  useEffect(() => {
    if (!isArmed) return;

    const handleKeyDown = (e) => {
      // Any press of Escape restores the unblocked portal
      if (e.key === 'Escape') {
        e.preventDefault();
        onDeactivate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isArmed, onDeactivate]);

  if (!isArmed) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-[#f9fbfd] text-[#1f1f1f] font-sans overflow-y-auto select-text select-all">
      {activeDisguise === 'google-docs' && (
        <div className="flex flex-col min-h-screen">
          {/* Mock Google Docs Ribbon UI */}
          <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between select-none">
            <div className="flex items-center space-x-3">
              {/* Fake Google Doc Icon */}
              <div className="w-9 h-11 bg-blue-600 rounded flex flex-col justify-between p-1 text-white text-[8px] font-bold">
                <div className="w-1/2 h-0.5 bg-white"></div>
                <div className="w-3/4 h-0.5 bg-white"></div>
                <div className="w-3/4 h-0.5 bg-white"></div>
                <div className="w-2/3 h-0.5 bg-white"></div>
                <div className="h-2 bg-blue-400 mt-2 text-[5px] flex items-center justify-center">DOCS</div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800 text-sm">
                    {customTitle || 'AP Euro History - Chapter 12 Notes'}
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
                <ShieldCheck size={14} className="text-green-600" /> All changes synced
              </span>
              <button
                onClick={onDeactivate}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs py-1.5 px-3 rounded font-medium flex items-center gap-1 transition-colors"
                title="Exit disguise mode"
              >
                <EyeOff size={14} /> Resume Library
              </button>
            </div>
          </div>

          {/* Quick Toolbar */}
          <div className="bg-[#f0f4f9] border-b border-gray-200 px-4 py-1.5 flex items-center space-x-4 text-xs select-none">
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded">100%</span>
            <span className="h-4 w-px bg-gray-300"></span>
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded font-bold">B</span>
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded italic">I</span>
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded underline">U</span>
            <span className="h-4 w-px bg-gray-300"></span>
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded">Arial</span>
            <span className="h-4 w-px bg-gray-300"></span>
            <span className="cursor-pointer hover:bg-gray-200 p-1 rounded">Normal text</span>
          </div>

          {/* The Document Area */}
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

      {activeDisguise === 'khan-academy' && (
        <div className="flex flex-col min-h-screen bg-[#0a2540] text-white select-none">
          {/* Khan Academy Mock Header */}
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

              {/* Mock Formula card */}
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

      {activeDisguise === 'canvas' && (
        <div className="flex flex-col min-h-screen bg-[#fafafa] text-gray-800">
          {/* Canvas mock navbar */}
          <div className="bg-[#121212] text-white h-12 flex items-center justify-between px-4 select-none">
            <div className="flex items-center space-x-4">
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

          <div className="flex flex-1">
            {/* Sidebar nav */}
            <div className="w-20 bg-[#2d3b45] text-white flex flex-col items-center py-6 space-y-6 text-[10px] select-none">
              <div className="flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 cursor-pointer">
                <span className="text-lg">👤</span>
                <span>Account</span>
              </div>
              <div className="flex flex-col items-center space-y-1 text-red-400 font-bold border-l-4 border-red-500 w-full">
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

            {/* Main dashboard content */}
            <div className="flex-1 p-8 bg-[#f5f5f5] overflow-y-auto">
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

              {/* Action notice for student */}
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

      {/* Arm-helper bar at bottom that reveals how to get back */}
      <div className="fixed bottom-3 right-3 bg-black/85 text-white rounded-lg py-1 text-[10px] px-2.5 font-mono border border-zinc-800 flex items-center gap-1.5 select-none shadow-xl">
        <Keyboard size={12} className="text-rose-500" />
        <span>Press <span className="bg-zinc-900 border border-zinc-800 text-rose-500 px-1 py-0.2 rounded font-bold">ESC</span> to disable camouflage</span>
      </div>
    </div>
  );
}
