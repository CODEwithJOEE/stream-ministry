import { useState, useEffect } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:w-80 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-yellow-100 z-[70] animate-in slide-in-from-bottom-10 duration-500">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center border border-yellow-100">
          <img
            src="/Stream-Ministry.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-stream-navy">Stream Ministry</p>
          <p className="text-[10px] text-gold-rich font-bold uppercase tracking-wider">
            Install App
          </p>
        </div>
        <button
          onClick={handleInstallClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg shadow-yellow-200 transition-all active:scale-95"
        >
          INSTALL
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-600"
        >
          <span className="text-xl">×</span>
        </button>
      </div>
    </div>
  );
};

export default InstallButton;
