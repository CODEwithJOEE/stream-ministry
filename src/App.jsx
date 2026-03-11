import React, { useState, useEffect } from "react";
import BookList from "./components/scripture/BookList";
import ScriptureReader from "./components/scripture/ScriptureReader";
import BookOverview from "./components/scripture/BookOverview";
import DailyStreamCard from "./components/layout/DailyStreamCard";
import HymnPlayer from "./components/worship/HymnPlayer";
import { loadBookData } from "./utils/fetchScripture";
import "./styles/celestial.css";
import lampstandImg from "./assets/lampstand.png";
import { Search, X, BookOpen, ArrowLeft } from "lucide-react";
import { christianHymns } from "./data/religions/christianity/hymnConnections";

export default function App() {
  const [view, setView] = useState("books");
  const [selectedReligion, setSelectedReligion] = useState("christianity");
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [loadedBookData, setLoadedBookData] = useState(null);
  const [activeHymn, setActiveHymn] = useState(null);
  const [globalFootnotes, setGlobalFootnotes] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // AUTO-SCROLL TO TOP ON VIEW CHANGE
  useEffect(() => {
    if (!selectedVerse) window.scrollTo(0, 0);
  }, [view, selectedChapter]);

  // FETCH GLOBAL FOOTNOTES
  useEffect(() => {
    const fetchGlobalNotes = async () => {
      try {
        const response = await fetch("/data/footnotes.json");
        if (!response.ok) throw new Error("Global footnotes not found");
        const data = await response.json();
        setGlobalFootnotes(data);
      } catch (error) {
        console.error("Error loading global footnotes:", error);
      }
    };
    fetchGlobalNotes();
  }, []);

  const handleBookSelect = async (book) => {
    const data = await loadBookData(selectedReligion, book.id);
    setSelectedBook(book);
    setLoadedBookData(data);
    setView("overview");
  };

  const handleManualNav = async (ref) => {
    const targetReligion = ref.religion || "christianity";
    // 1. Fetch the data FIRST
    const data = await loadBookData(targetReligion, ref.book);

    if (data) {
      // 2. Only update states if data was successfully found
      setLoadedBookData(data);
      setSelectedReligion(targetReligion);
      setSelectedBook({ id: ref.book });
      setSelectedChapter(ref.chapter || 1);
      setSelectedVerse(ref.verse || null);
      setSearchQuery("");

      // 3. Switch the view LAST
      setView("reader");
    } else {
      console.error("Could not find book data for:", ref.book);
      // Optional: alert("Scripture not found");
    }
  };

  // This is correctly placed! It will update whenever searchQuery changes.
  const filteredNotes = Object.entries(globalFootnotes).filter(
    ([word, note]) => {
      const query = searchQuery.toLowerCase();
      return (
        word.toLowerCase().includes(query) ||
        note.text.toLowerCase().includes(query)
      );
    },
  );

  const renderSearchLinks = (text) => {
    const refRegex = /\(([1-3]?\s?[A-Z][a-z.]+\s\d+)(?::\d+(?:-\d+)?)?\)/g;
    return text.split(refRegex).map((part, i) => {
      if (i % 2 === 1) {
        return (
          <button
            key={i}
            onClick={() => handleSearchLinkClick(part)}
            className="text-yellow-700 font-bold hover:underline bg-yellow-100/80 px-1.5 py-0.5 rounded-md border border-yellow-200/50 mx-0.5 inline-flex items-center transition-all hover:scale-105"
          >
            <BookOpen size={10} className="mr-1" /> {part}
          </button>
        );
      }
      return part;
    });
  };

  const handleSearchLinkClick = (part) => {
    const match = part.match(/([1-3]?\s?[A-Z][a-z.]+)\s(\d+)(?::(\d+))?/i);
    if (match) {
      const [_, bookPart, chap, verse] = match;

      const bookMap = {
        // Pentateuch
        gen: "genesis",
        exo: "exodus",
        lev: "leviticus",
        num: "numbers",
        deut: "deuteronomy",
        // History
        josh: "joshua",
        judg: "judges",
        ruth: "ruth",
        "1sam": "1-samuel",
        "2sam": "2-samuel",
        "1kings": "1-kings",
        "2kings": "2-kings",
        "1chron": "1-chronicles",
        "2chron": "2-chronicles",
        ezra: "ezra",
        neh: "nehemiah",
        esth: "esther",
        // Poetry
        job: "job",
        psa: "psalms",
        prov: "proverbs",
        eccl: "ecclesiastes",
        ss: "songofsongs",
        // Prophets
        isa: "isaiah",
        jer: "jeremiah",
        lam: "lamentations",
        ezek: "ezekiel",
        dan: "daniel",
        hos: "hosea",
        joel: "joel",
        amos: "amos",
        obad: "obadiah",
        jonah: "jonah",
        mic: "micah",
        nah: "nahum",
        hab: "habakkuk",
        zeph: "zephaniah",
        hag: "haggai",
        zech: "zechariah",
        mal: "malachi",
        // New Testament (Updated to match your filenames)
        mat: "matthew",
        matt: "matthew",
        mark: "mark",
        luke: "luke",
        john: "john",
        acts: "acts",
        rom: "romans",
        "1cor": "1-corinthians",
        "2cor": "2-corinthians",
        gal: "galatians",
        eph: "ephesians",
        phil: "philippians",
        col: "colossians",
        "1thes": "1-thessalonians",
        "2thes": "2-thessalonians",
        "1tim": "1-timothy",
        "2tim": "2-timothy",
        tit: "titus",
        philem: "philemon",
        heb: "hebrews",
        james: "james",
        "1pet": "1-peter",
        "2pet": "2-peter",
        "1john": "1-john",
        "2john": "2-john",
        "3john": "3-john",
        jude: "jude",
        rev: "revelation",
      };

      const cleanBookPart = bookPart
        .toLowerCase()
        .replace(/\./g, "")
        .replace(/\s/g, "")
        .trim();

      const mappedSlug = bookMap[cleanBookPart] || cleanBookPart;

      handleManualNav({
        religion: "christianity",
        book: mappedSlug,
        chapter: parseInt(chap, 10),
        verse: verse ? parseInt(verse, 10) : 1,
      });
    }
  };

  return (
    <div className="new-jerusalem-bg selection:bg-yellow-200 min-h-screen">
      <div className="divine-center-glow" />
      <img src={lampstandImg} alt="" className="lampstand-watermark" />

      <div className="relative z-10">
        <header className="py-16 px-6 text-center">
          <h1
            className="text-6xl font-serif font-bold text-stream-navy mb-2 tracking-tighter lampstand-glow cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => {
              setView("books");
              setSearchQuery("");
              setSelectedBook(null); // Clear selected book
              setLoadedBookData(null);
            }}
          >
            Stream Ministry
          </h1>

          <div className="max-w-md mx-auto mt-6 mb-4 relative">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-rich/50"
                size={20}
              />
              <input
                type="text"
                placeholder="Search Dictionary (e.g. Life, Spirit...)"
                className="w-full bg-white/80 border-2 border-yellow-100 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-gold-rich focus:bg-white shadow-sm font-serif italic"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setView(e.target.value.length > 0 ? "search" : "books");
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setView("books");
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          <p className="text-gold-rich font-bold tracking-[0.4em] uppercase text-[10px]">
            Holy Bible • Recovery Version
          </p>
        </header>

        <main className="px-6 pb-24 max-w-6xl mx-auto">
          {view === "search" && (
            <div className="max-w-2xl mx-auto py-10 animate-in fade-in duration-500">
              {/* Search Result Mapping Here */}
              {filteredNotes.map(([word, note]) => (
                <div
                  key={word}
                  className="bg-white p-6 rounded-2xl border border-yellow-100 shadow-sm mb-4"
                >
                  <h4 className="text-xl font-bold text-yellow-900 mb-2">
                    {word}
                  </h4>
                  <div className="text-slate-700 italic font-serif">
                    {renderSearchLinks(note.text)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "books" && (
            <>
              <DailyStreamCard
                onRead={handleManualNav}
                onPlay={(streamHymn) => {
                  // This looks for the ID from dailySchedule inside your full hymnConnections list
                  const fullHymn = christianHymns.find(
                    (h) => h.id === streamHymn.id,
                  );
                  if (fullHymn) {
                    setActiveHymn(fullHymn); // Opens your new smooth player
                  } else {
                    setActiveHymn(christianHymns[0]); // Fallback
                  }
                }}
              />
              <BookList
                religion="christianity"
                onSelectBook={handleBookSelect}
              />
            </>
          )}

          {view === "overview" && (
            <BookOverview
              bookData={loadedBookData}
              onSelectChapter={(chap) => {
                setSelectedChapter(chap);
                setSelectedVerse(null);
                setView("reader");
              }}
              onBack={() => setView("books")}
              onPlayHymn={setActiveHymn}
              onNavigate={handleManualNav} // This is crucial!
            />
          )}

          {view === "reader" && (
            <ScriptureReader
              globalFootnotes={globalFootnotes}
              religion={selectedReligion}
              bookSlug={selectedBook?.id}
              chapter={selectedChapter}
              initialVerse={selectedVerse}
              bookData={loadedBookData}
              onBack={() => setView("overview")}
              onNavigate={handleManualNav}
            />
          )}
        </main>

        <HymnPlayer
          activeHymn={activeHymn}
          onClose={() => setActiveHymn(null)}
        />
      </div>
    </div>
  );
}
