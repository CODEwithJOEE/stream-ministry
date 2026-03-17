import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Music,
  Loader2,
  ChevronDown,
  Play,
  Pause,
  SkipForward,
  SkipBack,
} from "lucide-react";

// Added 'hymnsList' and 'onPlay' to your props
export default function HymnPlayer({
  activeHymn,
  hymnsList = [],
  onClose,
  onPlay,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  // Find the index of the current song for navigation logic
  const currentIndex = hymnsList.findIndex((h) => h.id === activeHymn?.id);

  useEffect(() => {
    setIsLoading(true);
    setIsPlaying(true);
    setIsMinimized(false);
  }, [activeHymn?.id]);

  const playNext = (e) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentIndex + 1) % hymnsList.length;
    // This calls setActiveHymn in App.jsx
    onPlay(hymnsList[nextIndex]);
  };

  const playPrevious = (e) => {
    if (e) e.stopPropagation();
    const prevIndex = (currentIndex - 1 + hymnsList.length) % hymnsList.length;
    onPlay(hymnsList[prevIndex]);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!activeHymn) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
      <div className="max-w-xl mx-auto mb-4 md:mb-8 px-4 md:px-6">
        <div
          className={`bg-white/95 backdrop-blur-xl border border-yellow-200 rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMinimized ? "shadow-lg scale-95" : "shadow-2xl scale-100"
          }`}
        >
          <div
            className="p-4 md:p-6 cursor-pointer flex items-center justify-between gap-4"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              {" "}
              {/* Added flex-1 min-w-0 */}
              <div className="relative flex-shrink-0">
                {" "}
                {/* Added flex-shrink-0 */}
                <div className="p-2 md:p-3 bg-yellow-500 rounded-2xl text-white shadow-lg">
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Music size={18} />
                  )}
                </div>
              </div>
              {/* TITLE SECTION WITH SCROLL */}
              <div className="flex flex-col min-w-0 overflow-hidden">
                <div className="relative overflow-hidden whitespace-nowrap">
                  <h4
                    className={`font-bold text-stream-navy text-sm md:text-lg leading-tight inline-block ${activeHymn.title.length > 20 ? "animate-marquee" : ""}`}
                  >
                    <span>{activeHymn.title}</span>
                    {/* Increased the gap between loops to 2rem (ml-16) */}
                    {activeHymn.title.length > 20 && (
                      <span className="ml-16">{activeHymn.title}</span>
                    )}
                  </h4>
                </div>
                {/* Category - now hidden only when minimized to save vertical space */}
                {!isMinimized && (
                  <p className="text-[10px] text-yellow-700 font-bold uppercase tracking-widest truncate">
                    {activeHymn.category}
                  </p>
                )}
              </div>
            </div>

            {/* CONTROLS SECTION */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              {/* Skip Back: Now ALWAYS visible */}
              <button
                onClick={playPrevious}
                className="p-2 text-slate-400 hover:text-yellow-600 transition-colors"
              >
                <SkipBack size={18} fill="currentColor" />
              </button>

              {/* Main Play/Pause: Always visible */}
              {!isLoading && (
                <button
                  onClick={togglePlay}
                  className="p-2 bg-yellow-50 text-yellow-600 rounded-full hover:bg-yellow-100 transition-colors"
                >
                  {isPlaying ? (
                    <Pause size={18} fill="currentColor" />
                  ) : (
                    <Play size={18} fill="currentColor" />
                  )}
                </button>
              )}

              {/* Skip Forward: Now ALWAYS visible */}
              <button
                onClick={playNext}
                className="p-2 text-slate-400 hover:text-yellow-600 transition-colors"
              >
                <SkipForward size={18} fill="currentColor" />
              </button>

              <button
                className={`p-2 text-slate-400 transition-transform duration-700 ${isMinimized ? "rotate-180" : "rotate-0"}`}
              >
                <ChevronDown size={20} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div
            className={`px-6 pb-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isMinimized
                ? "max-h-0 opacity-0 overflow-hidden"
                : "max-h-32 opacity-100"
            }`}
          >
            <audio
              ref={audioRef}
              key={activeHymn.id}
              controls
              autoPlay
              onEnded={() => playNext()} // AUTO-PLAY NEXT LOGIC
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onCanPlay={() => setIsLoading(false)}
              onWaiting={() => setIsLoading(true)}
              className="w-full h-12 accent-yellow-600"
              src={activeHymn.audioUrl || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
