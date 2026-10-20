// generate-search-index.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const BASE_DIR = path.join(
  __dirname,
  "src",
  "data",
  "religions",
  "christianity",
);
const searchIndex = [];

// Helper to process a directory
const processTestament = (testament) => {
  const dirPath = path.join(BASE_DIR, testament);
  if (!fs.existsSync(dirPath)) return;

  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".json"));

  files.forEach((file) => {
    const slug = file.replace(".json", "");
    const filePath = path.join(dirPath, file);
    const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Only extract the metadata and the pure verse text to keep the index small
    const bookName = rawData.metadata.book;
    const subject = rawData.metadata.subject || "";
    const chapters = {};

    Object.entries(rawData.chapters).forEach(([chapNum, verses]) => {
      chapters[chapNum] = verses.map((verse, index) => ({
        v: index + 1, // Verse number
        t: verse, // Verse text
      }));
    });

    searchIndex.push({
      slug,
      bookName,
      subject,
      chapters,
    });
  });
};

console.log("Generating Search Index...");
processTestament("ot");
processTestament("nt");

const outputPath = path.join(__dirname, "public", "search-index.json");
fs.writeFileSync(outputPath, JSON.stringify(searchIndex), "utf-8");
console.log(
  `✅ Successfully generated search-index.json with ${searchIndex.length} books!`,
);
