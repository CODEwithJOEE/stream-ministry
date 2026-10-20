const NT_BOOKS = [
  "matthew",
  "mark",
  "luke",
  "john",
  "acts",
  "romans",
  "1-corinthians",
  "2-corinthians",
  "galatians",
  "ephesians",
  "philippians",
  "colossians",
  "1-thessalonians",
  "2-thessalonians",
  "1-timothy",
  "2-timothy",
  "titus",
  "philemon",
  "hebrews",
  "james",
  "1-peter",
  "2-peter",
  "1-john",
  "2-john",
  "3-john",
  "jude",
  "revelation",
];

export const loadBookData = async (religion, bookSlug) => {
  const cleanSlug = bookSlug.toLowerCase().trim();
  const cleanReligion = religion.toLowerCase().trim();
  const testament = NT_BOOKS.includes(cleanSlug) ? "nt" : "ot";

  try {
    const data = await import(
      `../data/religions/${cleanReligion}/${testament}/${cleanSlug}.json`
    );
    return data.default;
  } catch (error) {
    console.error(
      `Missing at: src/data/religions/${cleanReligion}/${testament}/${cleanSlug}.json`,
      error,
    );
    return null;
  }
};
