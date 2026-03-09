import React from "react";
import { Music, Play } from "lucide-react";
import { hymnConnections } from "../../data/hymnConnections";

export default function HymnMatcher({ religion, book, chapter, onPlay }) {
  // Logic: Find hymns that match the current religion AND (specific chapter OR general religion tag)
  const currentTag = `${religion}-${book}-${chapter}`.toLowerCase();

  const matchedHymns = hymnConnections.filter(
    (hymn) =>
      hymn.tags.includes(currentTag) ||
      hymn.tags.includes(`${religion}-general`),
  );

  if (matchedHymns.length === 0) return null;

  return (
    <div className="mt-12 p-6 bg-white rounded-2xl border border-stream-teal/20 shadow-sm animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center space-x-2 mb-4">
        <Music className="text-stream-teal" size={20} />
        <h3 className="font-bold text-stream-navy">Hymns for this Chapter</h3>
      </div>

      <div className="space-y-3">
        {matchedHymns.map((hymn) => (
          <button
            key={hymn.id}
            onClick={() => onPlay(hymn)}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-stream-teal/5 transition-colors border border-transparent hover:border-stream-teal/10"
          >
            <div className="flex flex-col text-left">
              <span className="font-medium text-sm text-stream-navy">
                {hymn.title}
              </span>
              <span className="text-xs text-gray-400 capitalize">
                {religion} Tradition
              </span>
            </div>
            <Play size={16} className="text-stream-teal" fill="currentColor" />
          </button>
        ))}
      </div>
    </div>
  );
}
