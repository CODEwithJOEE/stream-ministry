export const loadBookData = async (religion, bookSlug) => {
  try {
    const cleanSlug = bookSlug.toLowerCase().replace(/\./g, "").trim();
    const cleanReligion = religion.toLowerCase().trim();

    // 1. UPDATED: Added hyphens to match your filenames in image_6d3e56.png
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

    // 2. Determine the subfolder
    const testament = ntBooks.includes(cleanSlug) ? "nt" : "ot";

    // 3. Vite dynamic import
    const data = await import(
      `../data/religions/${cleanReligion}/${testament}/${cleanSlug}.json`
    );

    return data.default;
  } catch (error) {
    // Corrected the console log to show you the EXACT path it tried to reach
    console.error(
      `Fetch failed for: ${bookSlug}. Check if file exists in the ${ntBooks.includes(bookSlug) ? "nt" : "ot"} folder.`,
    );
    return null;
  }
};
