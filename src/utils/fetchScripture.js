/**
 * Dynamically loads a book's JSON data with OT/NT folder support
 */
export const loadBookData = async (religion, bookSlug) => {
  try {
    const cleanSlug = bookSlug.toLowerCase().replace(/\./g, "").trim();
    const cleanReligion = religion.toLowerCase().trim();

    // 1. Define which books belong to the New Testament
    const ntBooks = [
      "matthew",
      "mark",
      "luke",
      "john",
      "acts",
      "romans",
      "1corinthians",
      "2corinthians",
      "galatians",
      "ephesians",
      "philippians",
      "colossians",
      "1thessalonians",
      "2thessalonians",
      "1timothy",
      "2timothy",
      "titus",
      "philemon",
      "hebrews",
      "james",
      "1peter",
      "2peter",
      "1john",
      "2john",
      "3john",
      "jude",
      "revelation",
    ];

    // 2. Determine the subfolder
    const testament = ntBooks.includes(cleanSlug) ? "nt" : "ot";

    // 3. Vite dynamic import with the new subfolder path
    const data = await import(
      `../data/religions/${cleanReligion}/${testament}/${cleanSlug}.json`
    );

    return data.default;
  } catch (error) {
    console.error(
      `File Missing at: src/data/religions/${religion}/[ot|nt]/${bookSlug}.json`,
    );
    return null;
  }
};
