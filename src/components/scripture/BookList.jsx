import React from "react";
import { Book } from "lucide-react";
// We only keep the Christianity data
import { recoveryVersion } from "../../data/religions/christianity";

export default function BookList({ onSelectBook }) {
  // Since we are only doing Christian now, we use recoveryVersion directly
  const data = recoveryVersion;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in duration-500">
      <header className="mb-12">
        <h2 className="text-4xl font-serif font-bold text-stream-navy mb-2">
          Holy Bible
        </h2>
        <p className="text-gold-rich font-medium italic">Recovery Version</p>
      </header>

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
