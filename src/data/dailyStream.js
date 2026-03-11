// src/data/dailyStream.js

export const dailySchedule = [
  {
    id: "sun-1",
    title: "The Tree of Life",
    category: "God's Intention",
    author: "Moses",
    verseRef: {
      religion: "christianity",
      book: "genesis",
      chapter: 2,
      verse: 9,
    },
    versePreview: "And Jehovah God caused to grow... the tree of life.",
    hymn: { id: "ns-181", title: "God's Economy and His Eternal Plan" },
    message:
      "God's original intention was for man to eat of the tree of life to receive His life.",
    exercise:
      "Today, take a moment to tell the Lord: 'Lord, I choose You as my tree of life.'",
  },
  {
    id: "mon-1",
    title: "The Divine Origin",
    category: "Creation",
    author: "Moses",
    verseRef: {
      religion: "christianity",
      book: "genesis",
      chapter: 1,
      verse: 1,
    },
    versePreview: "In the beginning God created the heavens and the earth.",
    hymn: { id: "ns-28", title: "God Has Called Us for His Purpose" },
    message:
      "Everything begins with God. Focus on Him as the source of your strength today.",
    exercise:
      "Acknowledge God in your first decision today, no matter how small.",
  },
  {
    id: "tue-1",
    title: "The Light Shines",
    category: "Restoration",
    author: "Moses",
    verseRef: {
      religion: "christianity",
      book: "genesis",
      chapter: 1,
      verse: 3,
    },
    versePreview: "And God said, Let there be light; and there was light.",
    hymn: { id: "ns-181", title: "God's Economy and His Eternal Plan" },
    message:
      "God's first act in restoration is the shining of light into our darkness.",
    exercise:
      "Ask the Lord to shine into any part of your day where you feel confused.",
  },
  {
    id: "wed-1",
    title: "The Image of God",
    category: "Man's Purpose",
    author: "Moses",
    verseRef: {
      religion: "christianity",
      book: "genesis",
      chapter: 1,
      verse: 26,
    },
    versePreview: "Let us make man in our image, according to our likeness...",
    hymn: { id: "ns-132", title: "I'm Your Vessel" },
    message:
      "You were created as a vessel to contain, express, and represent God.",
    exercise:
      "Remind yourself: 'I am a vessel made for God's expression today.'",
  },
  {
    id: "thu-1",
    title: "Christ Our Offering",
    category: "The Offerings",
    author: "Moses",
    verseRef: {
      religion: "christianity",
      book: "leviticus",
      chapter: 1,
      verse: 2,
    },
    versePreview: "When any one of you brings an offering to Jehovah...",
    hymn: { id: "ns-190", title: "Lord Thou art all the offerings" },
    message:
      "Christ is the reality of every offering that brings us into God's presence.",
    exercise:
      "Pray: 'Lord, I take You as my peace offering in all my situations today.'",
  },
  {
    id: "fri-1",
    title: "The Year of Jubilee",
    category: "Liberty",
    author: "Moses",
    verseRef: {
      religion: "christianity",
      book: "leviticus",
      chapter: 25,
      verse: 10,
    },
    versePreview:
      "And you shall sanctify the fiftieth year and proclaim liberty...",
    hymn: { id: "ns-191", title: "This is the Year of Jubilee" },
    message:
      "In Christ, we are returned to our lost heritage and family. We are free!",
    exercise:
      "Sing or hum a song of thanks for the freedom you have in Christ.",
  },
  {
    id: "sat-1",
    title: "A Holy Priesthood",
    category: "Service",
    author: "Moses",
    verseRef: {
      religion: "christianity",
      book: "leviticus",
      chapter: 8,
      verse: 30,
    },
    versePreview:
      "And Moses took some of the anointing oil... and sprinkled it...",
    hymn: { id: "ns-190", title: "Lord Thou art all the offerings" },
    message:
      "We are anointed with the Spirit to serve God in His presence today.",
    exercise:
      "Spend 5 minutes in quiet prayer, simply being in the Lord's presence.",
  },
];

export const getTodaysStream = () => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)
  return dailySchedule[dayOfWeek];
};
