// src/utils/dailyLogic.js
import { hymnConnections } from "../data/hymnConnections";

export const getDailyContent = () => {
  // Use the current date string (YYYY-MM-DD) as a seed
  const today = new Date().toISOString().split("T")[0];

  // A simple pseudo-random generator based on the date string
  const seed = today.split("-").reduce((acc, char) => acc + parseInt(char), 0);

  // For this example, we pick from the Hymn list first,
  // then use that hymn's tag to find the scripture
  const dailyHymn = hymnConnections[seed % hymnConnections.length];

  return {
    date: today,
    hymn: dailyHymn,
    // Extract the scripture reference from the hymn's tag
    // e.g., "christianity-psalms-23" -> { religion: "christianity", book: "psalms", chapter: 23 }
    ref: {
      religion: dailyHymn.tags[0].split("-")[0],
      book: dailyHymn.tags[0].split("-")[1],
      chapter: dailyHymn.tags[0].split("-")[2] || 1,
    },
  };
};
