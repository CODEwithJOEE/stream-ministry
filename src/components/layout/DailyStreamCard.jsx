import React from "react";
import { Play, BookOpen, Sun, Sparkles, User } from "lucide-react";

// We now accept 'data' as a prop instead of importing the old static function
export default function DailyStreamCard({ data, onRead, onPlay }) {
  // Guard clause: if App.jsx hasn't generated the random content yet, show nothing
  if (!data) return null;

  // Helper to make book names look nice (e.g., "leviticus" -> "Leviticus")
  const formatBook = (slug) =>
    slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-stream-navy to-[#0a1520] p-8 md:p-10 text-white shadow-2xl border border-white/10 mb-12 animate-in fade-in duration-700">
      {/* Background Accent Decor */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative z-10">
        {/* Category Header */}
        <div className="flex items-center gap-2 text-yellow-500 mb-4">
          <Sun size={18} className="animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.3em]">
            {data.category || "Daily Manna"}
          </span>
        </div>

        {/* Title & Author */}
        <div className="mb-6">
          <h2 className="text-4xl font-serif font-bold mb-2 italic tracking-tight leading-tight">
            {data.title}
          </h2>
          <div className="flex items-center gap-2 text-yellow-500/60 text-[10px] font-bold uppercase tracking-widest">
            <span className="w-6 h-[1px] bg-yellow-500/30"></span>
            <User size={12} className="inline" />
            <span>By {data.author || "The Spirit"}</span>
          </div>
        </div>

        {/* Verse Quote Box */}
        <div className="bg-white/5 border-l-4 border-yellow-500/50 p-5 rounded-r-2xl mb-6 italic font-serif text-lg text-blue-100/80">
          "{data.versePreview}"
          <div className="mt-2 text-[10px] font-bold text-yellow-500/80 not-italic uppercase tracking-[0.2em]">
            — {formatBook(data.verseRef.book)} {data.verseRef.chapter}:
            {data.verseRef.verse}
          </div>
        </div>

        {/* Main Message Text */}
        <p className="text-blue-50/90 text-lg mb-8 leading-relaxed font-light">
          {data.message}
        </p>

        {/* Spiritual Exercise Section */}
        {data.exercise && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl mb-10 flex gap-4 items-start">
            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500 shrink-0 shadow-inner">
              <Sparkles size={16} />
            </div>
            <div>
              <h5 className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-1">
                Daily Exercise
              </h5>
              <p className="text-blue-50 text-sm italic leading-snug">
                {data.exercise}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onRead(data.verseRef)}
            className="flex-1 flex items-center justify-center gap-3 bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-4 rounded-2xl text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-yellow-900/20"
          >
            <BookOpen size={18} /> Read Word
          </button>

          <button
            onClick={() => onPlay(data.hymn)}
            className="flex-1 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-sm font-bold backdrop-blur-sm transition-all border border-white/10"
          >
            <Play size={18} fill="currentColor" /> Listen: {data.hymn.title}
          </button>
        </div>
      </div>
    </div>
  );
}
