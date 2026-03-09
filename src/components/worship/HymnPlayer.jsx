import React, { useState, useEffect, useRef } from "react";
import { X, Music, Loader2 } from "lucide-react";

export default function HymnPlayer({ activeHymn, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  // Reset loading state whenever a new hymn is selected
  useEffect(() => {
    setIsLoading(true);
  }, [activeHymn?.id]);

  if (!activeHymn) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-full duration-500">
      <div className="max-w-xl mx-auto mb-8 px-6">
        <div className="bg-white/95 backdrop-blur-xl border border-yellow-200 shadow-2xl rounded-3xl p-6 relative overflow-hidden">
          {/* Subtle Progress Bar Background */}
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-100/30" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-3 bg-yellow-500 rounded-2xl text-white shadow-lg shadow-yellow-200">
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Music size={20} />
                  )}
                </div>
                {/* Visual pulse effect while loading */}
                {isLoading && (
                  <div className="absolute inset-0 bg-yellow-400 rounded-2xl animate-ping opacity-20" />
                )}
              </div>

              <div>
                <h4 className="font-bold text-stream-navy text-lg leading-tight">
                  {activeHymn.title}
                </h4>
                <p className="text-xs text-yellow-700 font-bold uppercase tracking-widest flex items-center gap-2">
                  {activeHymn.category}
                  {isLoading && (
                    <span className="lowercase font-normal italic text-slate-400">
                      — buffering...
                    </span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="relative group">
            <audio
              ref={audioRef}
              key={activeHymn.id}
              controls
              autoPlay
              onCanPlay={() => setIsLoading(false)} // Hides spinner when ready
              onWaiting={() => setIsLoading(true)} // Shows spinner if connection drops
              className="w-full h-12 accent-yellow-600 custom-audio-player"
              src={activeHymn.audioUrl}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </div>
  );
}
