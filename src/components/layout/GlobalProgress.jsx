import React from "react";
import { Target, Trophy } from "lucide-react";
import { useReadingProgress } from "../../utils/useReadingProgress";

export default function GlobalProgress() {
  const { readChapters } = useReadingProgress();

  const TOTAL_BIBLE_CHAPTERS = 1189;
  const totalRead = readChapters.length;
  const percentComplete = Math.min(
    (totalRead / TOTAL_BIBLE_CHAPTERS) * 100,
    100,
  ).toFixed(1);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-yellow-100 dark:border-slate-700 p-6 md:p-8 shadow-sm mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-yellow-50 dark:bg-slate-800 rounded-xl text-gold-rich dark:text-gold-main">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-stream-navy dark:text-slate-200">
              Bible Reading Progress
            </h3>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              Your journey through the Word
            </p>
          </div>
        </div>

        {totalRead > 0 && (
          <div className="hidden sm:flex items-center gap-2 text-gold-main bg-gold-main/10 px-4 py-2 rounded-full border border-gold-main/20">
            <Trophy size={16} />
            <span className="text-sm font-bold">{percentComplete}%</span>
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
          <span>{totalRead} Chapters Read</span>
          <span>{TOTAL_BIBLE_CHAPTERS} Total</span>
        </div>

        {/* Progress Bar */}
        <div className="h-4 w-full bg-yellow-50 dark:bg-slate-800 rounded-full overflow-hidden border border-yellow-100 dark:border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-gold-main transition-all duration-1000 ease-out relative"
            style={{ width: `${percentComplete}%` }}
          >
            {/* Shimmer effect on the bar */}
            <div className="absolute inset-0 bg-white/20 dark:bg-white/10 animate-[shimmer_2s_infinite] rounded-full"></div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4 italic font-serif">
          "Your word is a lamp to my feet and a light to my path." — Psalm
          119:105
        </p>
      </div>
    </div>
  );
}
