import React, { useState, useEffect } from "react"; // Added useState/useEffect
import { Book, Clock, ChevronRight } from "lucide-react"; // Added Clock/ChevronRight
import { recoveryVersion } from "../../data/religions/christianity";

export default function BookList({ onSelectBook, onResume }) {
  const [history, setHistory] = useState(null);
  const data = recoveryVersion;

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
        <h2 className="text-4xl font-serif font-bold text-stream-navy mb-2">
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
            className="w-full md:w-auto flex items-center gap-6 p-6 bg-gradient-to-r from-yellow-50 to-white border border-yellow-200 rounded-3xl hover:shadow-md transition-all group"
          >
            <div className="p-4 bg-yellow-500 rounded-2xl text-white shadow-lg shadow-yellow-200">
              <Clock size={24} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-yellow-700 uppercase tracking-widest mb-1">
                Last Stop
              </p>
              <h4 className="text-2xl font-serif font-bold text-stream-navy">
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
              {books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => onSelectBook(book)}
                  className="p-5 bg-white border border-yellow-100 rounded-xl shadow-sm hover:shadow-md hover:border-yellow-500 transition-all text-left group"
                >
                  <Book
                    className="mb-3 text-yellow-500/40 group-hover:text-yellow-500 transition-colors"
                    size={20}
                  />
                  <span className="block font-bold text-stream-navy leading-tight">
                    {book.name}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-tighter">
                    {book.chapters} Chapters
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
