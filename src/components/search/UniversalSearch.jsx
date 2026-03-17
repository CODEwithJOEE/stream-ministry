import React, { useState, useMemo } from "react";
import { Search, Music, Book, X, Hash } from "lucide-react";

export default function UniversalSearch({
  initialQuery,
  setGlobalQuery,
  allBooksData,
  hymnsList,
  globalFootnotes, // Added this to props
  onNavigate,
  onPlay,
  onClose,
}) {
  const [query, setQuery] = useState(initialQuery || "");

  const handleQueryChange = (val) => {
    setQuery(val);
    setGlobalQuery(val);
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

    // 2. SEARCH SCRIPTURE
    Object.entries(allBooksData).forEach(([slug, bookData]) => {
      if (!bookData) return;
      const bookName = bookData.metadata.book;

      if (
        bookName.toLowerCase().includes(lowerQuery) ||
        bookData.metadata.subject.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: "scripture",
          title: bookName,
          subtitle: bookData.metadata.subject,
          path: { religion: "christianity", book: slug, chapter: 1 },
        });
      }

      if (lowerQuery.length >= 4) {
        Object.entries(bookData.chapters).forEach(([chapNum, verses]) => {
          verses.forEach((verseText, vIdx) => {
            if (verseText.toLowerCase().includes(lowerQuery)) {
              searchResults.push({
                type: "verse",
                title: `${bookName} ${chapNum}:${vIdx + 1}`,
                subtitle: verseText,
                path: {
                  religion: "christianity",
                  book: slug,
                  chapter: parseInt(chapNum),
                  verse: vIdx + 1,
                },
              });
            }
          });
        });
      }
    });

    // 3. SEARCH DICTIONARY (MOVED INSIDE USEMEMO)
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

        // Compare the priority of item 'a' vs item 'b'
        return (priority[a.type] || 4) - (priority[b.type] || 4);
      })
      .slice(0, 15);
  }, [query, allBooksData, hymnsList, globalFootnotes]); // Added globalFootnotes to dependencies

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-yellow-100 flex flex-col max-h-[70vh]">
        <div className="p-4 border-b border-slate-100 flex items-center gap-4">
          <Search className="text-yellow-600" size={20} />
          <input
            autoFocus
            className="flex-1 outline-none text-lg font-serif"
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

        {/* Results Area */}
        <div className="overflow-y-auto p-2 flex-1">
          {results.length > 0 ? (
            results.map((res, idx) => {
              // Logic to show section headers
              const showHeader =
                idx === 0 || results[idx - 1].type !== res.type;
              const headerLabel = {
                scripture: "Scripture",
                verse: "Verses",
                dictionary: "Dictionary",
                hymn: "Worship & Hymns",
              }[res.type];

              return (
                <React.Fragment key={idx}>
                  {showHeader && (
                    <div className="px-4 pt-4 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                      {headerLabel}
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (res.type === "dictionary") return;
                      res.type === "hymn"
                        ? onPlay(res.data)
                        : onNavigate(res.path);
                      onClose();
                    }}
                    className="w-full text-left p-4 hover:bg-yellow-50 rounded-2xl flex items-start gap-4 transition-colors group"
                  >
                    {/* ... keep your existing icon and text div here ... */}
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
                      <h4 className="font-bold text-slate-800 group-hover:text-yellow-700">
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
            // Show this if they typed enough but nothing was found
            <div className="p-10 text-center text-slate-400 italic">
              No matches found for "{query}"
            </div>
          ) : (
            // Show this if they haven't typed enough yet
            <div className="p-10 text-center text-slate-300 text-sm">
              Type at least 2 characters to search...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
