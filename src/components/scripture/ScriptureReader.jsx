import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Info,
  BookOpen,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ScriptureReader({
  religion,
  bookSlug,
  chapter,
  initialVerse,
  bookData,
  globalFootnotes,
  onBack,
  onNavigate,
}) {
  const [activeFootnote, setActiveFootnote] = useState(null);
  const verseRefs = useRef({});

  if (!bookData || !bookData.chapters) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdfcf8]">
        <div className="w-12 h-12 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin mb-4"></div>
        <p className="text-yellow-700 font-serif italic">Opening the Word...</p>
      </div>
    );
  }

  const chapterText = bookData.chapters[chapter.toString()];
  const totalChapters = Object.keys(bookData.chapters).length;

  // Scroll to Verse Logic
  useEffect(() => {
    if (initialVerse && verseRefs.current[initialVerse]) {
      const timer = setTimeout(() => {
        verseRefs.current[initialVerse].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        const el = verseRefs.current[initialVerse];
        el.classList.add("bg-yellow-100/50", "ring-2", "ring-yellow-200");
        setTimeout(() => {
          el.classList.remove("bg-yellow-100/50", "ring-2", "ring-yellow-200");
        }, 3000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [initialVerse, chapter, bookSlug]);

  const getNoteForWord = (word, vNum) => {
    const cleanWord = word
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    const verseNotes =
      bookData.footnotes?.[chapter.toString()]?.[vNum.toString()] || [];
    const specificNote = verseNotes.find(
      (n) => n.word.toLowerCase() === cleanWord,
    );

    if (specificNote) return specificNote;

    if (globalFootnotes) {
      const globalKey = Object.keys(globalFootnotes).find(
        (key) => key.toLowerCase() === cleanWord,
      );
      if (globalKey) {
        return {
          word: globalKey,
          text: globalFootnotes[globalKey].text,
          id: globalFootnotes[globalKey].id || "global",
        };
      }
    }
    return null;
  };

  const handleCrossReference = (refString) => {
    const match = refString.match(/([1-3]?\s?[A-Z][a-z.]+)\s(\d+)(?::(\d+))?/i);
    if (!match) return;

    const [_, bookPart, targetChapter, targetVerse] = match;
    const bookMap = {
      gen: "genesis",
      john: "john",
      eph: "ephesians",
      rev: "revelation",
      col: "colossians",
      psa: "psalms",
      isa: "isaiah",
      mat: "matthew",
      rom: "romans",
      heb: "hebrews",
      gal: "galatians",
      phil: "philippians",
    };

    const cleanBookPart = bookPart
      .toLowerCase()
      .replace(/\s/g, "")
      .replace(".", "");
    const mappedSlug = bookMap[cleanBookPart] || cleanBookPart;

    onNavigate({
      religion,
      book: mappedSlug,
      chapter: parseInt(targetChapter),
      verse: targetVerse ? parseInt(targetVerse) : 1,
    });
    setActiveFootnote(null);
  };

  const renderTextWithLinks = (text) => {
    const refRegex = /\(([1-3]?\s?[A-Z][a-z.]+\s\d+)(?::\d+(?:-\d+)?)?\)/g;
    const parts = text.split(refRegex);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <button
          key={i}
          onClick={() => handleCrossReference(part)}
          className="text-yellow-700 font-bold hover:underline bg-yellow-100/80 px-1 rounded mx-0.5 inline-flex items-center"
        >
          <BookOpen size={10} className="mr-1" /> {part}
        </button>
      ) : (
        part // Ensure this is here so the regular text actually shows up!
      ),
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fdfcf8] selection:bg-yellow-200">
      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-500 ${activeFootnote ? "md:mr-80" : ""}`}
      >
        {/* Sticky Sub-Header */}
        <div className="sticky top-0 z-30 bg-[#fdfcf8]/90 backdrop-blur-md border-b border-yellow-100 px-6 py-3 flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-yellow-700 flex items-center text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-2" /> {bookData.metadata.book}
          </button>
          <span className="font-serif italic font-bold text-stream-navy uppercase tracking-widest text-sm">
            Chapter {chapter}
          </span>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        <div className="max-w-2xl mx-auto py-12 px-6">
          <div className="space-y-8">
            {chapterText &&
              chapterText.map((verse, vIdx) => {
                const vNum = vIdx + 1;
                return (
                  <div
                    key={vIdx}
                    ref={(el) => (verseRefs.current[vNum] = el)}
                    className="group relative flex items-start space-x-6 p-2 rounded-2xl transition-all duration-500"
                  >
                    <span className="text-[11px] font-bold text-yellow-600/40 mt-2 min-w-[20px] text-right">
                      {vNum}
                    </span>
                    <p
                      className={`text-xl leading-[1.8] font-serif text-slate-800 ${vNum === 1 ? "first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-stream-navy" : ""}`}
                    >
                      {verse.split(" ").map((word, wIdx) => {
                        const note = getNoteForWord(word, vNum);
                        return note ? (
                          <button
                            key={wIdx}
                            onClick={() => setActiveFootnote(note)}
                            className="text-slate-900 border-b-2 border-yellow-200/60 hover:bg-yellow-100 transition-colors cursor-help px-0.5 hover:glow-text"
                          >
                            {word}{" "}
                          </button>
                        ) : (
                          <span key={wIdx}>{word} </span>
                        );
                      })}
                    </p>
                  </div>
                );
              })}
          </div>

          {/* CHAPTER NAVIGATION FOOTER */}
          <div className="mt-20 pt-10 border-t border-yellow-100 flex justify-between items-center">
            <button
              disabled={chapter <= 1}
              onClick={() =>
                onNavigate({ religion, book: bookSlug, chapter: chapter - 1 })
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-200 text-sm font-bold transition-all ${chapter <= 1 ? "opacity-20 cursor-not-allowed" : "hover:bg-yellow-50 text-yellow-800"}`}
            >
              <ChevronLeft size={18} /> Prev
            </button>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">
              Chapter {chapter} of {totalChapters}
            </span>
            <button
              disabled={chapter >= totalChapters}
              onClick={() =>
                onNavigate({ religion, book: bookSlug, chapter: chapter + 1 })
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-200 text-sm font-bold transition-all ${chapter >= totalChapters ? "opacity-20 cursor-not-allowed" : "hover:bg-yellow-50 text-yellow-800"}`}
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* FOOTNOTE SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full bg-white border-l border-yellow-100 shadow-2xl transition-transform duration-500 z-50 w-full md:w-80 ${
          activeFootnote ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {activeFootnote && (
          <div className="p-8 h-full flex flex-col footnote-enter">
            {" "}
            {/* ADDED CLASS HERE */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-bold text-gold-rich uppercase tracking-[0.3em]">
                Study Note {activeFootnote.id}
              </span>
              <button
                onClick={() => setActiveFootnote(null)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <h3 className="text-3xl font-serif font-bold text-stream-navy mb-6">
              {activeFootnote.word}
            </h3>
            <div className="flex-1 overflow-y-auto">
              <div className="text-slate-700 leading-relaxed text-md italic font-serif bg-yellow-50/50 p-6 rounded-3xl border border-yellow-100/50">
                {renderTextWithLinks(activeFootnote.text)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
