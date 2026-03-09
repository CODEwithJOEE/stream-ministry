export const dailySchedule = [
  {
    id: "sun-1",
    title: "The Tree of Life",
    verseRef: {
      religion: "christianity",
      book: "genesis",
      chapter: 2,
      verse: 9,
    },
    versePreview: "And Jehovah God caused to grow... the tree of life.",
    // Corrected ID to match hymnConnections.js
    hymn: { id: "ns-181", title: "God's Economy and His Eternal Plan" },
    message: "God's original intention was for man to eat of the tree of life.",
  },
  {
    id: "mon-1",
    title: "The Divine Origin",
    verseRef: {
      religion: "christianity",
      book: "genesis",
      chapter: 1,
      verse: 1,
    },
    versePreview: "In the beginning God created the heavens and the earth.",
    // Link to the same file for now so it doesn't buffer/crash
    hymn: { id: "ns-181", title: "God's Economy and His Eternal Plan" },
    message: "Focus on God as the source of all things today.",
  },
  {
    id: "tue-1",
    title: "The Light Shines",
    verseRef: {
      religion: "christianity",
      book: "genesis",
      chapter: 1,
      verse: 3,
    },
    versePreview: "And God said, Let there be light; and there was light.",
    hymn: { id: "ns-181", title: "God's Economy and His Eternal Plan" },
    message: "God's first act in restoration is the shining of light.",
  },
  {
    id: "wed-1",
    title: "The Image of God",
    verseRef: {
      religion: "christianity",
      book: "genesis",
      chapter: 1,
      verse: 26,
    },
    versePreview: "Let us make man in our image, according to our likeness...",
    hymn: { id: "ns-181", title: "The Vessel of Honor" },
    message: "You were created as a vessel to contain and express God.",
  },
];

// 2. THE FUNCTION (Picks the card based on the current day)
export const getTodaysStream = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)

  // This picks the item from the list based on the day of the week.
  return dailySchedule[dayOfWeek % dailySchedule.length];
};
