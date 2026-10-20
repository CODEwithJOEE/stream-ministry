// src/utils/useReadingProgress.js
import { useState, useEffect } from "react";

export const useReadingProgress = () => {
  const [readChapters, setReadChapters] = useState([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("bibleReadProgress");
    if (saved) {
      try {
        setReadChapters(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
  }, []);

  // Toggle a chapter as read/unread
  const toggleChapterRead = (bookSlug, chapterNum) => {
    const chapterId = `${bookSlug}-${chapterNum}`;
    setReadChapters((prev) => {
      let newProgress;
      if (prev.includes(chapterId)) {
        // If already read, unmark it (allow users to correct mistakes)
        newProgress = prev.filter((id) => id !== chapterId);
      } else {
        // If not read, add it
        newProgress = [...prev, chapterId];
      }
      localStorage.setItem("bibleReadProgress", JSON.stringify(newProgress));
      return newProgress;
    });
  };

  // Check if a specific chapter is read
  const isChapterRead = (bookSlug, chapterNum) => {
    return readChapters.includes(`${bookSlug}-${chapterNum}`);
  };

  // Get count of read chapters for a specific book
  const getReadCountForBook = (bookSlug) => {
    return readChapters.filter((id) => id.startsWith(`${bookSlug}-`)).length;
  };

  return { toggleChapterRead, isChapterRead, getReadCountForBook };
};
