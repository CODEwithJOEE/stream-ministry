import React from "react";
import { Play, BookOpen, Sun } from "lucide-react";
import { getTodaysStream } from "../../data/dailyStream";

export default function DailyStreamCard({ onRead, onPlay }) {
  const stream = getTodaysStream();

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-stream-navy to-[#0a1520] p-8 text-white shadow-2xl border border-white/10 mb-12">
      {/* Background Accent */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-yellow-500 mb-6">
          <Sun size={18} className="animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]">
            Morning Stream
          </span>
        </div>

        <h2 className="text-3xl font-serif font-bold mb-3 italic">
          {stream.title}
        </h2>
        <p className="text-blue-100/70 text-sm mb-6 leading-relaxed max-w-md">
          "{stream.versePreview}"
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onRead(stream.verseRef)}
            className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95"
          >
            <BookOpen size={16} /> Read Word
          </button>

          <button
            onClick={() => onPlay(stream.hymn)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full text-sm font-bold backdrop-blur-sm transition-all"
          >
            <Play size={16} /> Listen: {stream.hymn.title}
          </button>
        </div>
      </div>
    </div>
  );
}
