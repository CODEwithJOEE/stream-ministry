/**
 * Dynamically loads a book's JSON data
 */
export const loadBookData = async (religion, bookSlug) => {
  try {
    // 1. Clean the slug
    const cleanSlug = bookSlug.toLowerCase().replace(/\./g, "").trim();
    const cleanReligion = religion.toLowerCase().trim();

    // 2. Vite dynamic import
    // Note: The path must be relative to THIS file (fetchScripture.js)
    const data = await import(
      `../data/religions/${cleanReligion}/${cleanSlug}.json`
    );

    return data.default;
  } catch (error) {
    // Improved error message to tell you EXACTLY where the computer is looking
    console.error(
      `File Missing! Check this path: src/data/religions/${religion}/${bookSlug}.json`,
    );
    return null;
  }
};
