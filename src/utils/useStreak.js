// src/utils/useStreak.js
import { useState, useEffect } from "react";

export const useStreak = () => {
  const [streak, setStreak] = useState(0);
  const [hasReadToday, setHasReadToday] = useState(false);

  // Helper to get today's date as YYYY-MM-DD
  const getTodayString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

  // Helper to get yesterday's date as YYYY-MM-DD
  const getYesterdayString = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
  };

  useEffect(() => {
    const savedStreak = parseInt(localStorage.getItem("bibleStreak")) || 0;
    const lastReadDate = localStorage.getItem("lastStreakDate");
    const today = getTodayString();
    const yesterday = getYesterdayString();

    setStreak(savedStreak);
    setHasReadToday(lastReadDate === today);

    // If they haven't read today, but their last read was yesterday, keep the streak alive (but they need to read today to keep it).
    // If their last read was before yesterday, we should reset the streak to 0 visually until they read today.
    if (
      lastReadDate !== today &&
      lastReadDate !== yesterday &&
      lastReadDate !== null
    ) {
      setStreak(0); // Streak broken, but we don't save 0 until they actually read.
    }
  }, []);

  const recordReading = () => {
    const today = getTodayString();
    const lastReadDate = localStorage.getItem("lastStreakDate");

    if (lastReadDate === today) {
      // Already read today, do nothing
      return;
    }

    let newStreak = streak;

    if (lastReadDate === getYesterdayString()) {
      // Read yesterday, so increase streak
      newStreak += 1;
    } else {
      // Missed a day (or first time), reset to 1
      newStreak = 1;
    }

    setStreak(newStreak);
    setHasReadToday(true);
    localStorage.setItem("bibleStreak", newStreak.toString());
    localStorage.setItem("lastStreakDate", today);
  };

  return { streak, hasReadToday, recordReading };
};
