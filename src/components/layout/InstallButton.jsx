import { useState, useEffect } from "react";

const InstallButton = ({ isMusicPlaying }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // 1. Detect if the device is iOS (iPhone/iPad)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isApple = /iphone|ipad|ipod/.test(userAgent);

    // 2. Check if it's already installed (Standalone mode)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone;

    if (isApple && !isStandalone) {
      setIsIOS(true);
      setIsVisible(true);
    }

    // 3. Listen for Android/Chrome Install Prompt
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
    <div
      className={`fixed left-4 right-4 md:left-auto md:right-8 md:w-80 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-yellow-100 z-[70] animate-in slide-in-from-bottom-10 duration-500 
      ${isMusicPlaying ? "bottom-32" : "bottom-24"}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-yellow-50 rounded-lg flex-shrink-0 border border-yellow-100 flex items-center justify-center">
          <img
            src="/Stream-Ministry.png"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-stream-navy">
              Stream Ministry
            </p>
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-slate-600 -mt-1"
            >
              <span className="text-xl">×</span>
            </button>
          </div>

          {isIOS ? (
            /* iOS Instructions */
            <div className="mt-1">
              <p className="text-[11px] text-slate-600 leading-tight">
                To install on iPhone: tap the{" "}
                <span className="font-bold text-blue-600">Share icon</span>{" "}
                (square with arrow) and select{" "}
                <span className="font-bold text-stream-navy">
                  "Add to Home Screen"
                </span>
                .
              </p>
            </div>
          ) : (
            /* Android/Chrome Button */
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[10px] text-gold-rich font-bold uppercase tracking-wider">
                Install App
              </p>
              <button
                onClick={handleInstallClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-yellow-200 transition-all active:scale-95"
              >
                INSTALL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallButton;
