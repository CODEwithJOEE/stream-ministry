import React, { useState, useEffect } from "react"; // Added useState/useEffect
import { Book, Clock, ChevronRight } from "lucide-react"; // Added Clock/ChevronRight
import { recoveryVersion } from "../../data/religions/christianity";
import { useReadingProgress } from "../../utils/useReadingProgress";

export default function BookList({ onSelectBook, onResume }) {
  const [history, setHistory] = useState(null);
  const data = recoveryVersion;
  const { getReadCountForBook } = useReadingProgress();

  // Check for history on mount
  useEffect(() => {
    const saved = localStorage.getItem("lastRead");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in duration-500">
      <header className="mb-12">
        <h2 className="text-4xl font-serif font-bold text-[#1a2b3c] dark:text-gold-main mb-2 transition-colors">
          Holy Bible
        </h2>
        <p className="text-gold-rich font-medium italic">Recovery Version</p>
      </header>

      {/* RECENTLY READ SECTION */}
      {history && (
        <div className="mb-12 animate-in slide-in-from-top duration-700">
          <h3 className="text-[10px] font-bold tracking-[0.2em] text-yellow-600 uppercase mb-4">
            Continue Reading
          </h3>
          <button
            onClick={onResume}
            className="w-full md:w-auto flex items-center gap-6 p-6 bg-white dark:bg-slate-800 border border-yellow-200 dark:border-slate-700 rounded-3xl hover:shadow-md transition-all group"
          >
            <div className="p-4 bg-yellow-500 rounded-2xl text-white shadow-lg shadow-yellow-200">
              <Clock size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-yellow-700 uppercase tracking-widest mb-1">
                Last Stop
              </p>
              <h4 className="text-2xl font-serif font-bold text-stream-navy dark:text-slate-200">
                {history.book.name} {history.chapter}
                {history.verse && (
                  <span className="text-yellow-600">:{history.verse}</span>
                )}
              </h4>
            </div>
            <ChevronRight className="ml-auto text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Map through Old Testament and New Testament sections */}
      {data &&
        Object.entries(data).map(([sectionKey, books]) => (
          <section key={sectionKey} className="mb-16">
            <h3 className="text-sm font-bold tracking-[0.2em] text-yellow-600 uppercase mb-6 border-b border-yellow-100 pb-2">
              {sectionKey.replace("_", " ")}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {books.map((book) => {
                const readCount = getReadCountForBook(book.id);
                const percent = Math.round((readCount / book.chapters) * 100);

                return (
                  <button
                    key={book.id}
                    onClick={() => onSelectBook(book)}
                    className="relative overflow-hidden p-5 bg-white dark:bg-slate-800/50 border border-yellow-100 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md hover:border-yellow-500 dark:hover:border-gold-main transition-all text-left group"
                  >
                    <Book
                      className="mb-3 text-yellow-500/40 group-hover:text-yellow-500 transition-colors"
                      size={20}
                    />
                    <span className="block font-bold text-stream-navy dark:text-slate-200 leading-tight mb-1">
                      {book.name}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-tighter block mb-3">
                      {book.chapters} Chapters
                    </span>

                    {/* TINY PROGRESS BAR */}
                    {readCount > 0 && (
                      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-700">
                        <div
                          className="h-full bg-yellow-500 dark:bg-gold-main transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        ))}
    </div>
  );
}
