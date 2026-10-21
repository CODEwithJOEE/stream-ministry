// src/utils/useHighlights.js
import { useState, useEffect } from "react";

export const useHighlights = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [highlights, setHighlights] = useState({});

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bibleBookmarks");
    const savedHighlights = localStorage.getItem("bibleHighlights");

    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedHighlights) setHighlights(JSON.parse(savedHighlights));
  }, []);

  const toggleBookmark = (bookSlug, chapter, verseNum, text) => {
    const id = `${bookSlug}-${chapter}-${verseNum}`;
    setBookmarks((prev) => {
      let updated;
      if (prev.some((bm) => bm.id === id)) {
        updated = prev.filter((bm) => bm.id !== id);
      } else {
        updated = [
          ...prev,
          { id, bookSlug, chapter, verseNum, text, date: Date.now() },
        ];
      }
      localStorage.setItem("bibleBookmarks", JSON.stringify(updated));
      return updated;
    });
  };

  const setHighlight = (bookSlug, chapter, verseNum, color) => {
    const id = `${bookSlug}-${chapter}-${verseNum}`;
    setHighlights((prev) => {
      const updated = { ...prev };
      if (!color) {
        delete updated[id]; // Remove highlight if color is null
      } else {
        updated[id] = color;
      }
      localStorage.setItem("bibleHighlights", JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (bookSlug, chapter, verseNum) => {
    const id = `${bookSlug}-${chapter}-${verseNum}`;
    return bookmarks.some((bm) => bm.id === id);
  };

  const getHighlight = (bookSlug, chapter, verseNum) => {
    const id = `${bookSlug}-${chapter}-${verseNum}`;
    return highlights[id] || null;
  };

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    setHighlight,
    getHighlight,
  };
};
