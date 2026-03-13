import React, { useState, useEffect } from "react";
import BookList from "./components/scripture/BookList";
import ScriptureReader from "./components/scripture/ScriptureReader";
import BookOverview from "./components/scripture/BookOverview";
import DailyStreamCard from "./components/layout/DailyStreamCard";
import HymnPlayer from "./components/worship/HymnPlayer";
import { loadBookData } from "./utils/fetchScripture";
import { getDailyContent } from "./utils/dailyLogic";
import "./styles/celestial.css";
import lampstandImg from "./assets/lampstand.png";
import { Search, X, BookOpen, Music } from "lucide-react";
import { christianHymns } from "./data/religions/christianity/hymnConnections";
import PlaylistGallery from "./components/worship/PlaylistGallery";

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

  const dailyStream = getDailyContent();

  useEffect(() => {
    if (!selectedVerse) window.scrollTo(0, 0);
  }, [view, selectedChapter, selectedVerse]);

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
    const data = await loadBookData(targetReligion, ref.book);

    if (data) {
      setLoadedBookData(data);
      setSelectedReligion(targetReligion);
      setSelectedBook({ id: ref.book });
      setSelectedChapter(ref.chapter || 1);
      setSelectedVerse(ref.verse || null);
      setSearchQuery("");
      setView("reader");
    }
  };

  const filteredNotes = Object.entries(globalFootnotes).filter(
    ([word, note]) => {
      const query = searchQuery.toLowerCase();
      return (
        word.toLowerCase().includes(query) ||
        note.text.toLowerCase().includes(query)
      );
    },
  );

  return (
    <div className="new-jerusalem-bg selection:bg-yellow-200 min-h-screen">
      <div className="divine-center-glow" />
      <img src={lampstandImg} alt="" className="lampstand-watermark" />

      <div className="relative z-10">
        {/* 1. TOP NAVIGATION & HEADER */}
        <header className="pt-10 pb-6 px-6 text-center bg-white/40 backdrop-blur-sm sticky top-0 z-50 border-b border-yellow-100/50">
          <h1
            className="text-4xl md:text-6xl font-serif font-bold text-stream-navy mb-2 tracking-tighter cursor-pointer"
            onClick={() => {
              setView("books");
              setSearchQuery("");
            }}
          >
            Stream Ministry
          </h1>

          {/* RESTORED SUBTITLE */}
          <p className="text-[10px] font-bold text-gold-rich uppercase tracking-[0.3em] mb-4">
            Holy Bible • Recovery Version
          </p>

          {/* WORD / WORSHIP TOGGLE */}
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => setView("books")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all ${
                ["books", "reader", "overview"].includes(view)
                  ? "bg-yellow-500 text-white shadow-lg shadow-yellow-200"
                  : "bg-white/80 text-slate-400 hover:text-yellow-600 border border-yellow-100"
              }`}
            >
              <BookOpen size={16} /> Word
            </button>
            <button
              onClick={() => setView("worship")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all ${
                view === "worship"
                  ? "bg-yellow-500 text-white shadow-lg shadow-yellow-200"
                  : "bg-white/80 text-slate-400 hover:text-yellow-600 border border-yellow-100"
              }`}
            >
              <Music size={16} /> Worship
            </button>
          </div>

          <div className="max-w-md mx-auto relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-rich/50"
              size={18}
            />
            <input
              type="text"
              placeholder="Search Dictionary..."
              className="w-full bg-white/90 border border-yellow-100 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:border-gold-rich shadow-sm font-serif italic text-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setView(e.target.value.length > 0 ? "search" : "books");
              }}
            />
          </div>
        </header>

        {/* 2. MAIN CONTENT AREA */}
        <main className="px-6 pt-10 pb-40 max-w-6xl mx-auto">
          {view === "search" && (
            <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
              {filteredNotes.map(([word, note]) => (
                <div
                  key={word}
                  className="bg-white p-6 rounded-2xl border border-yellow-100 shadow-sm mb-4"
                >
                  <h4 className="text-xl font-bold text-yellow-900 mb-2">
                    {word}
                  </h4>
                  <p className="text-slate-700 italic font-serif">
                    {note.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {view === "worship" && (
            <PlaylistGallery
              hymns={christianHymns}
              onPlay={(hymn) => setActiveHymn(hymn)}
              onNavigate={handleManualNav}
              onBack={() => setView("books")}
            />
          )}

          {view === "books" && (
            <>
              <DailyStreamCard
                data={dailyStream}
                onRead={handleManualNav}
                onPlay={(streamHymn) => setActiveHymn(streamHymn)}
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
              onNavigate={handleManualNav}
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
              onPlay={setActiveHymn}
            />
          )}
        </main>

        {/* 3. MUSIC PLAYER - FIXED AT BOTTOM */}
        {activeHymn && (
          <div className="fixed bottom-6 left-0 right-0 z-[60] px-4 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-md mx-auto shadow-2xl">
              <HymnPlayer
                activeHymn={activeHymn}
                onClose={() => setActiveHymn(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
