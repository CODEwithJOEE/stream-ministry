export const loadBookData = async (religion, bookSlug) => {
  try {
    // Ensure slug matches your filenames exactly (e.g., "1-corinthians")
    const cleanSlug = bookSlug.toLowerCase().trim();
    const cleanReligion = religion.toLowerCase().trim();

    // List MUST match the exact cleanSlugs used in filenames
    const ntBooks = [
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

    // Determine subfolder
    const testament = ntBooks.includes(cleanSlug) ? "nt" : "ot";

    // Dynamic import using Vite syntax
    const data = await import(
      `../data/religions/${cleanReligion}/${testament}/${cleanSlug}.json`
    );

    return data.default;
  } catch (error) {
    console.error(
      `Missing at: src/data/religions/${religion}/${ntBooks?.includes(bookSlug) ? "nt" : "ot"}/${bookSlug}.json`,
    );
    return null;
  }
};
