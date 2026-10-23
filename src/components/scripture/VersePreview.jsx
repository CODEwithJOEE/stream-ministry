import React, { useState, useEffect, useRef } from "react";
import { BookOpen } from "lucide-react";

export default function VersePreview({
  children,
  bookSlug,
  chapter,
  startVerse,
  endVerse,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [verses, setVerses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    // Delay showing the tooltip by 300ms so it doesn't pop up accidentally
    hoverTimeout.current = setTimeout(async () => {
      setIsVisible(true);

      if (verses.length === 0) {
        setIsLoading(true);
        try {
          const res = await fetch("/search-index.json");
          const index = await res.json();

          const bookData = index.find((b) => b.slug === bookSlug);
          if (bookData) {
            const chapterData = bookData.chapters[chapter.toString()];
            if (chapterData) {
              // Filter out only the verses in the range
              const requestedVerses = chapterData.filter(
                (v) =>
                  v.v >= parseInt(startVerse) &&
                  v.v <= parseInt(endVerse || startVerse),
              );
              setVerses(requestedVerses);
            }
          }
        } catch (err) {
          console.error("Failed to fetch preview", err);
        } finally {
          setIsLoading(false);
        }
      }
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setIsVisible(false);
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isVisible && (
        <div className="absolute top-full left-0 mt-2 w-72 md:w-80 bg-white dark:bg-slate-800 border border-yellow-200 dark:border-slate-700 shadow-2xl rounded-2xl p-4 z-[100] animate-in fade-in zoom-in duration-200 cursor-default">
          <div className="flex items-center gap-2 mb-2 border-b border-yellow-100 dark:border-slate-700 pb-2">
            <BookOpen size={14} className="text-gold-main" />
            <span className="text-[10px] font-bold text-gold-rich dark:text-gold-main uppercase tracking-widest">
              {bookSlug.replace(/-/g, " ")} {chapter}:{startVerse}
              {endVerse && endVerse !== startVerse ? `-${endVerse}` : ""}
            </span>
          </div>

          <div className="max-h-48 overflow-y-auto pr-2 reader-scrollbar">
            {isLoading ? (
              <p className="text-xs text-slate-400 italic animate-pulse">
                Loading verses...
              </p>
            ) : verses.length > 0 ? (
              <div className="space-y-2">
                {verses.map((v) => (
                  <p
                    key={v.v}
                    className="text-sm font-serif text-slate-700 dark:text-slate-300 leading-relaxed"
                  >
                    <span className="text-[10px] font-bold text-yellow-600 mr-1">
                      {v.v}
                    </span>
                    {v.t}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Verses not found in index.
              </p>
            )}
          </div>
        </div>
      )}
    </span>
  );
}
