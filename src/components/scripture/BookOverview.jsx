import React, { useState } from "react";
import {
  ArrowLeft,
  History,
  User,
  MapPin,
  Clock,
  Search,
  Play,
} from "lucide-react";
// REMOVED: judaismHymns import to fix the 404 error
import { christianHymns } from "../../data/religions/christianity/hymnConnections";

export default function BookOverview({
  bookData,
  onSelectChapter,
  onBack,
  onPlayHymn,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!bookData || !bookData.metadata) return null;

  const { metadata } = bookData;

  // Filter hymns specifically for the current Christian book
  const suggestedHymns = christianHymns.filter((h) =>
    h.relatedBooks.includes(metadata.book.toLowerCase()),
  );

  const chapters = [...Array(metadata.totalChapters)].map((_, i) => i + 1);
  const filteredChapters = chapters.filter((num) =>
    num.toString().includes(searchTerm),
  );

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      {/* Back Button */}
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

      {/* Book Title */}
      <h2 className="text-6xl font-serif font-bold text-stream-navy mb-2 tracking-tight">
        {metadata.book}
      </h2>
      <div className="h-1 w-20 bg-yellow-500 mb-10 rounded-full" />

      {/* Historical Information Card */}
      <div className="bg-white rounded-3xl border border-yellow-200 p-8 md:p-10 shadow-sm mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
        <h3 className="text-yellow-600 font-bold uppercase tracking-[0.2em] text-xs mb-8">
          Historical Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-sm">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <User className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-0.5">Author</p>
              <p className="text-stream-navy font-bold text-base">
                {metadata.author}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <History className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-0.5">
                Time of Writing
              </p>
              <p className="text-stream-navy font-bold text-base">
                {metadata.timeOfWriting}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <MapPin className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-0.5">
                Place of Writing
              </p>
              <p className="text-stream-navy font-bold text-base">
                {metadata.placeOfWriting}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-gray-400 font-medium mb-0.5">
                Time Period Covered
              </p>
              <p className="text-stream-navy font-bold text-base">
                {metadata.timePeriodCovered}
              </p>
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

      {/* Related Hymns */}
      <div className="mb-12">
        <h3 className="text-yellow-600 font-bold uppercase tracking-widest text-xs mb-6">
          Related Hymns
        </h3>
        <div className="space-y-3">
          {suggestedHymns.map((hymn) => (
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
          ))}
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
