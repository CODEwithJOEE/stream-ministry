import React from "react";
import { X, BookOpenText } from "lucide-react";

export default function FootnoteDrawer({
  isOpen,
  onClose,
  verseNumber,
  footnotes,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto border-l-4 border-yellow-500">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <div className="flex items-center space-x-2 text-yellow-700">
              <BookOpenText size={20} />
              <h3 className="font-bold text-lg dark:text-slate-200">
                Footnotes: Verse {verseNumber}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} className="text-gray-400 dark:text-slate-400" />
            </button>
          </div>

          <div className="space-y-8">
            {footnotes && footnotes.length > 0 ? (
              footnotes.map((fn) => (
                <div key={fn.id} className="group">
                  <span className="inline-block px-2 py-0.5 bg-yellow-100 dark:bg-slate-800 text-yellow-800 dark:text-gold-main text-xs font-bold rounded mb-2">
                    {fn.word}
                  </span>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-md border-l-2 border-gray-100 dark:border-slate-700 pl-4 group-hover:border-yellow-200 dark:group-hover:border-gold-main transition-colors">
                    {fn.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">
                No footnotes available for this verse.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
