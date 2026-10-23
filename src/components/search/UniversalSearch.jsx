import React, { useState, useMemo, useEffect } from "react";
import { Search, Music, Book, X, Hash, History, Trash2 } from "lucide-react";

export default function UniversalSearch({
  initialQuery,
  setGlobalQuery,
  hymnsList,
  globalFootnotes,
  onNavigate,
  onPlay,
  onClose,
}) {
  const [query, setQuery] = useState(initialQuery || "");

  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchIndex, setSearchIndex] = useState([]);
  const [isIndexLoading, setIsIndexLoading] = useState(true);

  // Fetch the lightweight search index on mount
  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const res = await fetch("/search-index.json");
        const data = await res.json();
        setSearchIndex(data);
      } catch (error) {
        console.error("Failed to load search index:", error);
      } finally {
        setIsIndexLoading(false);
      }
    };
    fetchIndex();
  }, []);

  const handleQueryChange = (val) => {
    setQuery(val);
    setGlobalQuery(val);
  };

  // ADD THIS FUNCTION: Save to history
  const saveToHistory = (searchTerm) => {
    const cleanTerm = searchTerm.trim();
    if (cleanTerm.length < 2) return;

    setSearchHistory((prev) => {
      // Remove if it already exists, then add to the front, then slice to keep only 5
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== cleanTerm.toLowerCase(),
      );
      const updated = [cleanTerm, ...filtered].slice(0, 5);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  // ADD THIS FUNCTION: Clear history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  // ADD THIS FUNCTION: Remove a specific search term
  const removeHistoryItem = (e, termToRemove) => {
    e.stopPropagation(); // Prevents the click from triggering the search
    setSearchHistory((prev) => {
      const updated = prev.filter((item) => item !== termToRemove);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];

    const searchResults = [];
    const lowerQuery = query.toLowerCase();

    // 1. SEARCH HYMNS
    hymnsList.forEach((hymn) => {
      if (
        hymn.title.toLowerCase().includes(lowerQuery) ||
        hymn.category.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: "hymn",
          id: hymn.id,
          title: hymn.title,
          subtitle: `Hymn - ${hymn.category}`,
          data: hymn,
        });
      }
    });

    // 2. SEARCH SCRIPTURE FROM GLOBAL INDEX
    searchIndex.forEach((book) => {
      // Search Book Name / Subject
      if (
        book.bookName.toLowerCase().includes(lowerQuery) ||
        book.subject.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: "scripture",
          title: book.bookName,
          subtitle: book.subject,
          path: { religion: "christianity", book: book.slug, chapter: 1 },
        });
      }

      // Search Verses (only if query is 4+ chars to save performance)
      if (lowerQuery.length >= 4) {
        Object.entries(book.chapters).forEach(([chapNum, verses]) => {
          verses.forEach((verse) => {
            if (verse.t.toLowerCase().includes(lowerQuery)) {
              searchResults.push({
                type: "verse",
                title: `${book.bookName} ${chapNum}:${verse.v}`,
                subtitle: verse.t,
                path: {
                  religion: "christianity",
                  book: book.slug,
                  chapter: parseInt(chapNum),
                  verse: verse.v,
                },
              });
            }
          });
        });
      }
    });

    // 3. SEARCH DICTIONARY
    if (globalFootnotes) {
      Object.entries(globalFootnotes).forEach(([word, note]) => {
        if (
          word.toLowerCase().includes(lowerQuery) ||
          note.text.toLowerCase().includes(lowerQuery)
        ) {
          searchResults.push({
            type: "dictionary",
            title: word,
            subtitle: note.text,
            data: note,
          });
        }
      });
    }

    return searchResults
      .sort((a, b) => {
        const priority = { scripture: 1, verse: 1, dictionary: 2, hymn: 3 };
        return (priority[a.type] || 4) - (priority[b.type] || 4);
      })
      .slice(0, 15);
  }, [query, searchIndex, hymnsList, globalFootnotes]);

  // ADD THE EFFECT HERE (Below the useMemo)
  useEffect(() => {
    if (query.trim().length < 3) return;

    const timer = setTimeout(() => {
      if (results.length > 0) {
        saveToHistory(query);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [query, results]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-yellow-100 dark:border-slate-700 flex flex-col max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-100 flex items-center gap-4">
          <Search className="text-yellow-600" size={20} />
          <input
            autoFocus
            className="flex-1 outline-none text-lg font-serif bg-transparent text-slate-800 dark:text-slate-200"
            placeholder="Search books, verses, or hymns..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="overflow-y-auto p-2 flex-1">
          {isIndexLoading && query.trim().length >= 2 ? (
            <div className="p-10 text-center text-slate-400 italic animate-pulse">
              Loading global index...
            </div>
          ) : results.length > 0 ? (
            results.map((res, idx) => {
              const showHeader =
                idx === 0 || results[idx - 1].type !== res.type;
              const headerLabel = {
                scripture: "Scripture",
                verse: "Verses",
                dictionary: "Dictionary",
                hymn: "Worship & Hymns",
              }[res.type];

              const isClickable = res.type !== "dictionary";

              return (
                <React.Fragment key={idx}>
                  {showHeader && (
                    <div className="px-4 pt-4 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                      {headerLabel}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (!isClickable) return;
                      saveToHistory(query);
                      res.type === "hymn"
                        ? onPlay(res.data)
                        : onNavigate(res.path);
                      onClose();
                    }}
                    disabled={!isClickable}
                    className={`w-full text-left p-4 rounded-2xl flex items-start gap-4 transition-colors group ${
                      isClickable
                        ? "hover:bg-yellow-50 dark:hover:bg-slate-800"
                        : "cursor-default opacity-60"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg mt-1 ${
                        res.type === "hymn"
                          ? "bg-blue-50 text-blue-600"
                          : res.type === "dictionary"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {res.type === "hymn" ? (
                        <Music size={18} />
                      ) : res.type === "dictionary" ? (
                        <Hash size={18} />
                      ) : (
                        <Book size={18} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-yellow-700 dark:group-hover:text-gold-main">
                        {res.title}
                      </h4>
                      <p className="text-sm text-slate-500 truncate italic font-serif">
                        {res.subtitle}
                      </p>
                    </div>
                  </button>
                </React.Fragment>
              );
            })
          ) : query.trim().length >= 2 ? (
            <div className="p-10 text-center text-slate-400 italic">
              No matches found for "{query}"
            </div>
          ) : (
            // Show Search History when query is empty
            <div className="p-4">
              {searchHistory.length > 0 ? (
                <>
                  <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                      Recent Searches
                    </span>
                    <button
                      onClick={clearHistory}
                      className="text-[10px] text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={12} /> Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {searchHistory.map((term, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleQueryChange(term)}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-yellow-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <History
                            size={16}
                            className="text-slate-300 group-hover:text-gold-main transition-colors"
                          />
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            {term}
                          </span>
                        </div>

                        {/* SMALL X BUTTON TO REMOVE SPECIFIC ITEM */}
                        <button
                          onClick={(e) => removeHistoryItem(e, term)}
                          className="p-1 text-slate-300 hover:text-red-500 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Remove from history"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-6 text-center text-slate-300 text-sm italic">
                  Type at least 2 characters to search...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
