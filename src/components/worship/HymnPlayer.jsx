import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Music,
  Loader2,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
} from "lucide-react";

export default function HymnPlayer({ activeHymn, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    setIsPlaying(true);
    // Auto-expand if a new song starts
    setIsMinimized(false);
  }, [activeHymn?.id]);

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
    // MAIN CONTAINER: Added scale and shadow transition
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMinimized ? "translate-y-0" : "translate-y-0"}`}
    >
      <div className="max-w-xl mx-auto mb-4 md:mb-8 px-4 md:px-6">
        <div
          className={`bg-white/95 backdrop-blur-xl border border-yellow-200 rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMinimized ? "shadow-lg scale-95" : "shadow-2xl scale-100"}`}
        >
          <div
            className="p-4 md:p-6 cursor-pointer flex items-center justify-between"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative">
                {/* Corrected the template literal below */}
                <div
                  className={`p-2 md:p-3 bg-yellow-500 rounded-2xl text-white shadow-lg transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMinimized ? "scale-90" : "scale-100"}`}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Music size={18} />
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <h4 className="font-bold text-stream-navy text-sm md:text-lg leading-tight truncate max-w-[140px] sm:max-w-none">
                  {activeHymn.title}
                </h4>
                {/* Cross-fade status text */}
                <div className="relative h-4 overflow-hidden mt-0.5 md:mt-1">
                  <p
                    className={`absolute top-0 left-0 text-[10px] text-yellow-700 font-bold uppercase tracking-widest transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMinimized ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}`}
                  >
                    {activeHymn.category}
                  </p>
                  <span
                    className={`absolute top-0 left-0 text-[10px] text-yellow-600 font-bold flex items-center gap-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMinimized ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                  >
                    {isPlaying ? "NOW PLAYING" : "PAUSED"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              {/* Fade in/out the Play/Pause shortcut */}
              <div
                className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMinimized ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
              >
                {!isLoading && (
                  <button
                    onClick={togglePlay}
                    className="p-2 bg-yellow-50 text-yellow-600 rounded-full hover:bg-yellow-100 transition-colors mr-1"
                  >
                    {isPlaying ? (
                      <Pause size={16} fill="currentColor" />
                    ) : (
                      <Play size={16} fill="currentColor" />
                    )}
                  </button>
                )}
              </div>

              <button
                className={`p-2 text-slate-400 hover:text-yellow-600 transition-transform duration-700 ${isMinimized ? "rotate-180" : "rotate-0"}`}
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

          {/* TRANSITION CONTAINER: Added max-height and padding transition */}
          <div
            className={`px-6 pb-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMinimized ? "max-h-0 pt-0 opacity-0 overflow-hidden" : "max-h-32 pt-0 opacity-100"}`}
          >
            <div className="relative group">
              <audio
                ref={audioRef}
                key={activeHymn.id}
                controls
                autoPlay
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onCanPlay={() => setIsLoading(false)}
                onWaiting={() => setIsLoading(true)}
                className="w-full h-12 accent-yellow-600"
                src={activeHymn.audioUrl}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
