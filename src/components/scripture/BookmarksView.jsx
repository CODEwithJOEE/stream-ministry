import React from "react";
import { Bookmark, ArrowLeft, BookOpen } from "lucide-react";
import { useHighlights } from "../../utils/useHighlights";

export default function BookmarksView({ onNavigate, onBack }) {
  const { bookmarks } = useHighlights();

  // Sort bookmarks by most recently added
  const sortedBookmarks = [...bookmarks].sort((a, b) => b.date - a.date);

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in duration-500 pb-24">
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={onBack}
          className="text-slate-500 dark:text-slate-400 hover:text-yellow-700 dark:hover:text-gold-main flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-serif font-bold text-stream-navy dark:text-gold-main">
          My Bookmarks
        </h2>
      </div>

      {sortedBookmarks.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-yellow-100 dark:border-slate-800">
          <Bookmark
            size={48}
            className="mx-auto text-yellow-200 dark:text-slate-700 mb-4"
          />
          <p className="text-slate-500 dark:text-slate-400 font-serif italic">
            You haven't bookmarked any verses yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedBookmarks.map((bm) => (
            <button
              key={bm.id}
              onClick={() =>
                onNavigate({
                  religion: "christianity",
                  book: bm.bookSlug,
                  chapter: bm.chapter,
                  verse: bm.verseNum,
                })
              }
              className="text-left w-full p-6 bg-white dark:bg-slate-900 rounded-2xl border border-yellow-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-yellow-400 dark:hover:border-gold-main transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gold-main opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-gold-rich dark:text-gold-main uppercase tracking-widest">
                  {bm.bookSlug.replace(/-/g, " ")} {bm.chapter}:{bm.verseNum}
                </span>
              </div>

              <p className="text-slate-700 dark:text-slate-300 font-serif leading-relaxed italic line-clamp-3">
                "{bm.text}"
              </p>

              <div className="mt-4 flex items-center text-xs font-bold text-yellow-600 dark:text-gold-main">
                <BookOpen size={14} className="mr-1" /> Read in context
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
