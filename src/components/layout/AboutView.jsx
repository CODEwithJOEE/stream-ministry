import React from "react";
import {
  ArrowLeft,
  Heart,
  BookOpen,
  Music,
  Moon,
  Search,
  CheckCircle,
  Smartphone,
} from "lucide-react";

export default function AboutView({ onBack }) {
  const features = [
    {
      icon: <Search size={18} />,
      title: "Universal Search",
      desc: "Instantly find verses, hymns, and dictionary terms across the entire Bible.",
    },
    {
      icon: <CheckCircle size={18} />,
      title: "Reading Progress",
      desc: "Track your journey through the Bible. Mark chapters as read and see your global progress.",
    },
    {
      icon: <BookOpen size={18} />,
      title: "Study Notes",
      desc: "Tap on underlined words to read the footnotes and cross-references.",
    },
    {
      icon: <Music size={18} />,
      title: "Worship Library",
      desc: "Listen to hymns connected directly to the chapters you are reading.",
    },
    {
      icon: <Moon size={18} />,
      title: "Dark Mode",
      desc: "A beautiful, distraction-free dark theme for reading at night.",
    },
    {
      icon: <Smartphone size={18} />,
      title: "Installable (PWA)",
      desc: "Install this app to your home screen for an app-like experience, even offline.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in fade-in duration-500 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={onBack}
          className="text-slate-500 dark:text-slate-400 hover:text-yellow-700 dark:hover:text-gold-main flex items-center text-sm font-medium transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>
        <h2 className="text-3xl font-serif font-bold text-stream-navy dark:text-gold-main">
          About the App
        </h2>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-stream-navy to-[#0a1520] rounded-[2rem] p-8 md:p-12 text-center text-white shadow-2xl border border-white/10 mb-10 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl" />

        <img
          src="/Stream-Ministry-192x192.png"
          alt="App Logo"
          className="w-20 h-20 mx-auto mb-6 rounded-2xl shadow-lg border border-white/20 bg-white/5 p-2 object-contain"
        />
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-gold-main italic">
          Stream Ministry
        </h1>
        <p className="text-xs font-bold text-blue-100/60 uppercase tracking-[0.3em] mb-6">
          Holy Bible • Recovery Version
        </p>
        <p className="text-blue-50/80 max-w-lg mx-auto leading-relaxed font-serif text-lg italic">
          "Your word is a lamp to my feet and a light to my path." — Psalm
          119:105
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h3 className="text-xs font-bold text-yellow-600 dark:text-gold-main uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <span className="w-6 h-[1px] bg-yellow-500/50"></span>
          App Features
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-yellow-100 dark:border-slate-800 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-2 bg-yellow-50 dark:bg-slate-800 text-gold-rich dark:text-gold-main rounded-xl flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <h4 className="font-bold text-stream-navy dark:text-slate-200 mb-1">
                  {f.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Credits */}
      <div className="bg-yellow-50/50 dark:bg-slate-800/30 rounded-3xl p-8 border border-yellow-100 dark:border-slate-800 text-center">
        <h3 className="text-sm font-bold text-stream-navy dark:text-slate-200 mb-2">
          The Holy Bible, Recovery Version
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed max-w-lg mx-auto">
          The Recovery Version is a modern, accurate translation of the Bible
          with extensive footnotes and cross-references. Text and footnotes are
          © Living Stream Ministry.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-6">
          Made with <Heart size={14} className="text-red-500 fill-current" />{" "}
          for the Body of Christ
        </div>
        <p className="text-xs text-slate-400 mt-2">Version 1.0.0</p>
      </div>
    </div>
  );
}
