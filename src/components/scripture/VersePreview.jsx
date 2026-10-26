import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const hoverTimeout = useRef(null);
  const triggerRef = useRef(null);

  const handleMouseEnter = () => {
    // Delay showing the tooltip by 300ms
    hoverTimeout.current = setTimeout(async () => {
      // 1. Calculate where to put the tooltip
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();

        // Position it below the link, but keep it inside the screen
        let leftPos = rect.left;
        // If it's too close to the right edge, shift it left
        if (leftPos + 300 > window.innerWidth) {
          leftPos = window.innerWidth - 310;
        }
        // If it's too close to the left edge, shift it right
        if (leftPos < 10) leftPos = 10;

        setPosition({
          top: rect.bottom + 8, // 8px below the link
          left: leftPos,
        });
      }

      setIsVisible(true);

      // 2. Fetch the verses if we haven't already
      if (verses.length === 0) {
        setIsLoading(true);
        try {
          const res = await fetch("/search-index.json");
          const index = await res.json();

          const bookData = index.find((b) => b.slug === bookSlug);
          if (bookData) {
            const chapterData = bookData.chapters[chapter.toString()];
            if (chapterData) {
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
    <>
      <span
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsVisible(false)} // Hide on mobile tap
      >
        {children}
      </span>

      {/* RENDER THE TOOLTIP IN A PORTAL */}
      {isVisible &&
        createPortal(
          <div
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            className="fixed z-[9999] w-[300px] bg-white dark:bg-slate-800 border border-yellow-200 dark:border-slate-700 shadow-2xl rounded-2xl p-4 animate-in fade-in zoom-in duration-200 cursor-default"
            onMouseEnter={() => clearTimeout(hoverTimeout.current)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-2 mb-2 border-b border-yellow-100 dark:border-slate-700 pb-2">
              <BookOpen size={14} className="text-gold-main" />
              <span className="text-[10px] font-bold text-gold-rich dark:text-gold-main uppercase tracking-widest">
                {bookSlug.replace(/-/g, " ")} {chapter}:{startVerse}
                {endVerse && endVerse !== startVerse ? `-${endVerse}` : ""}
              </span>
            </div>

            <div className="max-h-[250px] overflow-y-auto pr-2 reader-scrollbar">
              {isLoading ? (
                <p className="text-xs text-slate-400 italic animate-pulse">
                  Loading verses...
                </p>
              ) : verses.length > 0 ? (
                <div className="space-y-2">
                  {verses.map((v) => (
                    <p
                      key={v.v}
                      className="text-sm font-serif text-slate-700 dark:text-slate-300 leading-relaxed whitespace-normal break-words"
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
          </div>,
          document.body,
        )}
    </>
  );
}
