import React from "react";
import { Flame } from "lucide-react";
import { useStreak } from "../../utils/useStreak";

export default function StreakBadge() {
  const { streak, hasReadToday } = useStreak();

  // If streak is 0, don't show the badge to keep the UI clean
  if (streak === 0 && !hasReadToday) return null;

  return (
    <div className="flex items-center justify-center mb-6 animate-in slide-in-from-top duration-500">
      <div
        className={`flex items-center gap-2 px-5 py-2 rounded-full border shadow-sm transition-all ${
          hasReadToday
            ? "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800/50"
            : "bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700"
        }`}
      >
        <Flame
          size={20}
          className={
            hasReadToday ? "text-orange-500 animate-pulse" : "text-slate-400"
          }
          fill={hasReadToday ? "currentColor" : "none"}
        />
        <span
          className={`text-sm font-bold uppercase tracking-widest ${
            hasReadToday
              ? "text-orange-700 dark:text-orange-400"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {streak} Day Streak
        </span>
      </div>
    </div>
  );
}
