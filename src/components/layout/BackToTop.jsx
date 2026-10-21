import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 z-[80] p-3 md:p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-yellow-200 dark:border-slate-700 text-gold-rich dark:text-gold-main rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      title="Back to Top"
    >
      <ArrowUp size={24} strokeWidth={2.5} />
    </button>
  );
}
