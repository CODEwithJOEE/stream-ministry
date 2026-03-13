import React, { useState } from "react";
import {
  Music,
  Play,
  BookOpen,
  Headphones,
  ArrowLeft,
  Search,
  X,
} from "lucide-react";

export default function PlaylistGallery({ hymns, onPlay, onNavigate, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Filter logic: search by title, category, or related books
  const filteredHymns = hymns.filter((hymn) => {
    const search = searchTerm.toLowerCase();
    return (
      hymn.title.toLowerCase().includes(search) ||
      hymn.category?.toLowerCase().includes(search) ||
      hymn.relatedBooks?.some((book) => book.toLowerCase().includes(search))
    );
  });

  // 2. Group the FILTERED hymns
  const categories = filteredHymns.reduce((acc, hymn) => {
    const cat = hymn.category || "General Ministry";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(hymn);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#fdfcf8] pb-40 animate-in fade-in duration-700">
      {/* HEADER with Search */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-yellow-100 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center text-xs font-bold text-yellow-700 hover:underline"
            >
              <ArrowLeft size={14} className="mr-1" /> BACK
            </button>
            <h1 className="text-2xl font-serif font-bold text-stream-navy">
              Worship Library
            </h1>
            <Headphones size={24} className="text-yellow-200" />
          </div>

          {/* SEARCH BAR */}
          <div className="relative max-w-md mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
              size={18}
            />
            <input
              type="text"
              placeholder="Filter by title, book, or theme..."
              className="w-full bg-slate-50 border border-yellow-50 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {Object.keys(categories).length > 0 ? (
          Object.entries(categories).map(([category, items]) => (
            <section key={category} className="mb-12">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center">
                <span className="w-8 h-[1px] bg-yellow-200 mr-3"></span>
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((hymn) => (
                  <div
                    key={hymn.id}
                    className="group bg-white border border-yellow-100 p-6 rounded-[2rem] hover:shadow-xl transition-all duration-500"
                  >
                    <div className="flex justify-between mb-4">
                      <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                        <Music size={18} />
                      </div>
                      <button
                        onClick={() => onPlay(hymn)}
                        className="bg-stream-navy text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Play size={14} fill="currentColor" />
                      </button>
                    </div>
                    <h3 className="font-bold text-stream-navy mb-4 leading-tight">
                      {hymn.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {hymn.relatedBooks?.map((book) => (
                        <button
                          key={book}
                          onClick={() =>
                            onNavigate({
                              religion: "christianity",
                              book,
                              chapter: 1,
                            })
                          }
                          className="text-[9px] font-bold px-2 py-1 bg-slate-50 text-slate-400 rounded-lg hover:bg-yellow-100 hover:text-yellow-700 transition-colors"
                        >
                          {book.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 italic">
              No hymns found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
