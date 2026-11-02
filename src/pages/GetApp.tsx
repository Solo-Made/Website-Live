import { useEffect } from "react";

const APP_STORE_URL = "https://apps.apple.com/nl/app/calcuu/id1609226426";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.calcuu.calcuu";

type Platform = "ios" | "android" | "desktop";

const detectPlatform = (): Platform => {
  if (typeof window === "undefined") return "desktop";

  // Test-override via ?platform=ios|android|desktop
  const override = new URLSearchParams(window.location.search).get("platform");
  if (override === "ios" || override === "android" || override === "desktop") {
    return override;
  }

  const ua = navigator.userAgent;
  // iPadOS can identify itself as macOS; touch points distinguish it from a Mac.
  const isIPadOS =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  if (/iPhone|iPad|iPod/.test(ua) || isIPadOS) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
};

/**
 * Smart redirect-page. The QR code points here.
 * - iPhone/iPad → App Store
 * - Android → Google Play
 * - Desktop / unknown → show the store choices
 */
const GetApp = () => {
  const platform = detectPlatform();

  useEffect(() => {
    if (platform === "ios") {
      window.location.replace(APP_STORE_URL);
    } else if (platform === "android") {
      window.location.replace(PLAY_STORE_URL);
    }
  }, [platform]);

  // Don't paint the desktop store choices on a phone while navigation starts.
  // This removes the brief CTA flash before the store opens.
  if (platform === "ios" || platform === "android") return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-calcuu-background">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-calcuu-secondary mb-3">
          Calcuu downloaden
        </h1>
        <p className="text-calcuu-text-sub mb-8">
          Kies je platform om de app te downloaden.
        </p>

        <div className="flex flex-col gap-3">
          <a
            href={APP_STORE_URL}
            className="flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-card hover:bg-gray-800 transition-colors"
          >
            <span className="text-left">
              <span className="block text-xs">Download in de</span>
              <span className="block text-lg font-semibold">App Store</span>
            </span>
          </a>
          <a
            href={PLAY_STORE_URL}
            className="flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-card hover:bg-gray-800 transition-colors"
          >
            <span className="text-left">
              <span className="block text-xs">Download in</span>
              <span className="block text-lg font-semibold">Google Play</span>
            </span>
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-8">
          Word je niet doorgestuurd? Klik op de juiste knop hierboven.
        </p>
      </div>
    </div>
  );
};

export default GetApp;
