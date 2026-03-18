import React, { useState } from "react";
import {
  ArrowLeft,
  History,
  User,
  MapPin,
  Clock,
  Search,
  Play,
  BookOpen,
} from "lucide-react";
import { christianHymns } from "../../data/religions/christianity/hymnConnections";

export default function BookOverview({
  bookData,
  onSelectChapter,
  onBack,
  onPlayHymn,
  onNavigate, // Passed from App.jsx to handle scripture links
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!bookData || !bookData.metadata) return null;

  const { metadata } = bookData;

  // In BookOverview.jsx

  const handleSearchLinkClick = (fullRef) => {
    // Matches "Deut. 31:9" or "Deut. 24"
    const match = fullRef.match(/([1-3]?\s?[A-Z][a-z.]+)\s(\d+)(?::(\d+))?/i);

    if (match) {
      const [_, bookPart, chap, verse] = match;

      const bookMap = {
        gen: "genesis",
        exo: "exodus",
        lev: "leviticus",
        num: "numbers",
        deut: "deuteronomy",
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
        job: "job",
        psa: "psalms",
        prov: "proverbs",
        eccl: "ecclesiastes",
        ss: "songofsongs",
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

      onNavigate({
        religion: "christianity",
        book: mappedSlug,
        chapter: parseInt(chap, 10),
        verse: verse ? parseInt(verse, 10) : 1, // If no verse, default to 1
      });
    }
  };

  const renderTextWithLinks = (text) => {
    if (!text) return "";

    // FIXED REGEX: Uses a non-capturing group (?:) for the colon/verse
    // so that split() only captures the full reference string.
    const refRegex = /\(([1-3]?\s?[A-Z][a-z.]+\s\d+(?::\d+)?)\)/g;

    return text.split(refRegex).map((part, i) => {
      if (i % 2 === 1) {
        return (
          <button
            key={i}
            onClick={() => handleSearchLinkClick(part)}
            className="text-yellow-700 font-bold hover:underline bg-yellow-100/60 px-1.5 py-0.5 rounded mx-0.5 inline-flex items-center transition-all whitespace-nowrap"
          >
            <BookOpen size={12} className="mr-1" />
            {part}
          </button>
        );
      }
      return part;
    });
  };

  // Filter hymns using a "slugified" comparison
  const suggestedHymns = christianHymns.filter((h) => {
    const currentBookSlug = metadata.book
      .toLowerCase()
      .replace(/\s+/g, "-") // Turn "1 Samuel" into "1-samuel"
      .trim();

    return h.relatedBooks.includes(currentBookSlug);
  });

  const chapters = [...Array(metadata.totalChapters)].map((_, i) => i + 1);
  const filteredChapters = chapters.filter((num) =>
    num.toString().includes(searchTerm),
  );

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <button
        onClick={onBack}
        className="flex items-center text-yellow-700 mb-8 hover:text-yellow-600 font-medium transition-colors group"
      >
        <ArrowLeft
          size={18}
          className="mr-2 group-hover:-translate-x-1 transition-transform"
        />
        Back to Books
      </button>

      <h2 className="text-6xl font-serif font-bold text-stream-navy mb-2 tracking-tight">
        {metadata.book}
      </h2>
      <div className="h-1 w-20 bg-yellow-500 mb-10 rounded-full" />

      <div className="bg-white rounded-3xl border border-yellow-200 p-8 md:p-10 shadow-sm mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
        <h3 className="text-yellow-600 font-bold uppercase tracking-[0.2em] text-xs mb-8">
          Historical Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-sm">
          {/* Author */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <User className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-0.5">Author</p>
              <div className="text-stream-navy font-bold text-base leading-relaxed">
                {renderTextWithLinks(metadata.author)}
              </div>
            </div>
          </div>

          {/* Time of Writing */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <History className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-0.5">
                Time of Writing
              </p>
              <div className="text-stream-navy font-bold text-base leading-relaxed">
                {renderTextWithLinks(metadata.timeOfWriting)}
              </div>
            </div>
          </div>

          {/* Place of Writing */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <MapPin className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-0.5">
                Place of Writing
              </p>
              <div className="text-stream-navy font-bold text-base leading-relaxed">
                {/* ADD THE RENDER FUNCTION HERE */}
                {renderTextWithLinks(metadata.placeOfWriting)}
              </div>
            </div>
          </div>

          {/* Time Period Covered */}
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-0.5">
                Time Period Covered
              </p>
              <div className="text-stream-navy font-bold text-base leading-relaxed">
                {renderTextWithLinks(metadata.timePeriodCovered)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-yellow-100">
          <p className="text-yellow-600 font-bold text-xs uppercase tracking-[0.2em] mb-4">
            Subject
          </p>
          <p className="text-stream-navy text-2xl font-serif leading-relaxed italic font-medium">
            {metadata.subject}
          </p>
        </div>
      </div>

      {/* Related Hymns Section */}
      <div className="mb-12">
        <h3 className="text-yellow-600 font-bold uppercase tracking-widest text-xs mb-6">
          Related Hymns
        </h3>
        <div className="space-y-3">
          {suggestedHymns.length > 0 ? (
            suggestedHymns.map((hymn) => (
              <button
                key={hymn.id}
                onClick={() => onPlayHymn(hymn)}
                className="w-full flex items-center justify-between p-4 bg-yellow-50/50 border border-yellow-100 rounded-xl hover:bg-yellow-50 transition-colors group"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform">
                    <Play size={16} fill="currentColor" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-stream-navy">{hymn.title}</p>
                    <p className="text-xs text-yellow-700">{hymn.category}</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-yellow-600/50">
                  #{hymn.id}
                </span>
              </button>
            ))
          ) : (
            <p className="text-gray-400 italic text-sm">
              No hymns connected to this book yet.
            </p>
          )}
        </div>
      </div>

      {/* Chapter Selection */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h3 className="text-2xl font-bold text-stream-navy">
          Select a Chapter
        </h3>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-600/50"
            size={18}
          />
          <input
            type="number"
            placeholder="Go to chapter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-yellow-200 rounded-full focus:outline-none w-full md:w-48 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-10 gap-3">
        {filteredChapters.map((chapterNum) => (
          <button
            key={chapterNum}
            onClick={() => onSelectChapter(chapterNum)}
            className="aspect-square flex items-center justify-center rounded-2xl border border-yellow-100 bg-white text-stream-navy hover:bg-yellow-500 hover:text-white transition-all font-bold text-lg"
          >
            {chapterNum}
          </button>
        ))}
      </div>
    </div>
  );
}
