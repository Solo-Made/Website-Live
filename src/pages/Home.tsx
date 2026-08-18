import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Play, Download, Mail, Phone } from "lucide-react";
import Calculator from "@/components/Calculator";
import CookieBanner from "@/components/CookieBanner";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const APP_STORE_URL = "https://apps.apple.com/nl/app/calcuu/id1609226426";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.calcuu.calcuu";

const detectPlatform = (): "ios" | "android" | "desktop" => {
  if (typeof window === "undefined") return "desktop";
  // Test-override via ?platform=ios|android|desktop
  const override = new URLSearchParams(window.location.search).get("platform");
  if (override === "ios" || override === "android" || override === "desktop") {
    return override;
  }
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
};

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-calcuu-detail">
      <button
        className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-calcuu-secondary pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-calcuu-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"}`}
      >
        <p className="text-calcuu-text-sub leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [platform] = useState<"ios" | "android" | "desktop">(() =>
    detectPlatform(),
  );

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  const scrollToVideoAndPlay = () => {
    const demoSection = document.getElementById("demo");
    if (demoSection) {
      // First scroll to the section
      demoSection.scrollIntoView({ behavior: "smooth", block: "center" });

      // Start video after scroll is complete
      setTimeout(() => {
        const targetPosition =
          demoSection.offsetTop -
          window.innerHeight / 2 +
          demoSection.offsetHeight / 2;

        setIsVideoPlaying(true);

        // Monitor and maintain scroll position for 3 seconds after video starts
        let scrollCheckCount = 0;
        const maxScrollChecks = 30; // Check for 3 seconds (30 * 100ms)

        const maintainPosition = () => {
          scrollCheckCount++;
          if (scrollCheckCount > maxScrollChecks) return;

          const currentPosition = window.scrollY;
          const difference = Math.abs(currentPosition - targetPosition);

          // If scroll position changed significantly, restore it
          if (difference > 50) {
            window.scrollTo({ top: targetPosition, behavior: "auto" });
          }

          setTimeout(maintainPosition, 100);
        };

        setTimeout(maintainPosition, 100);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-calcuu-white font-inter overflow-x-hidden max-w-full">
      {/* Navigation Menu */}
      <nav className="sticky top-0 z-50 bg-calcuu-white/95 backdrop-blur-sm border-b border-calcuu-detail">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-end gap-3">
              <img
                src="https://cdn.builder.io/api/v1/assets/4370c0c81082416ebba6e6fcedf1fc84/logo-purple-spring-500x500px-9f1602?format=webp&width=800"
                alt="Calcuu Logo"
                className="w-8 h-8 lg:w-10 lg:h-10"
              />
              <span
                className="text-xl lg:text-2xl font-bold text-calcuu-secondary"
                style={{ fontFamily: "Geist, Inter, sans-serif" }}
              >
                calcuu
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-calcuu-secondary hover:text-calcuu-primary transition-colors font-medium"
              >
                Functies
              </a>
              <button
                onClick={scrollToVideoAndPlay}
                className="text-calcuu-secondary hover:text-calcuu-primary transition-colors font-medium bg-transparent border-none cursor-pointer"
              >
                Demo
              </button>
              <a
                href="#pricing"
                className="text-calcuu-secondary hover:text-calcuu-primary transition-colors font-medium"
              >
                Prijzen
              </a>
              <a
                href="#download"
                className="text-calcuu-secondary hover:text-calcuu-primary transition-colors font-medium"
              >
                Download
              </a>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="hidden sm:inline-flex bg-calcuu-primary hover:bg-calcuu-primary/90 text-white font-semibold px-6 rounded-lg   transition-all duration-300 h-12"
                onClick={() => {
                  const downloadSection = document.getElementById("download");
                  if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Probeer Gratis
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-calcuu-secondary hover:text-calcuu-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden border-t border-calcuu-detail overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}`}
          >
            <div className="space-y-3">
              <a
                href="#features"
                className="block text-calcuu-secondary hover:text-calcuu-primary transition-colors font-medium px-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Functies
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToVideoAndPlay();
                }}
                className="block w-full text-left text-calcuu-secondary hover:text-calcuu-primary transition-colors font-medium px-2 py-2 bg-transparent border-none cursor-pointer"
              >
                Demo
              </button>
              <a
                href="#pricing"
                className="block text-calcuu-secondary hover:text-calcuu-primary transition-colors font-medium px-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Prijzen
              </a>
              <a
                href="#download"
                className="block text-calcuu-secondary hover:text-calcuu-primary transition-colors font-medium px-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download
              </a>
              <Button
                size="sm"
                className="w-full bg-calcuu-primary hover:bg-calcuu-primary/90 text-white font-semibold px-6 rounded-lg   transition-all duration-300 h-12"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  const downloadSection = document.getElementById("download");
                  if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Probeer Gratis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-calcuu-white to-calcuu-background">
        <div className="container mx-auto px-4 py-5 mb-5">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mt-7 pt-3">
            <div className="lg:col-span-3">
              <div className="space-y-6">
                <p className="text-lg md:text-xl font-bold text-calcuu-primary mb-4">
                  Vakschilders, opgelet!
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-calcuu-secondary leading-[1.1] tracking-tight">
                  Stop met &rsquo;s avonds
                  <br />
                  <span className="text-calcuu-primary">offertes</span> maken.
                </h1>
                <p className="text-lg md:text-xl text-calcuu-text-sub leading-relaxed max-w-2xl">
                  Maak calculaties, offertes en urenregistratie op locatie.
                  <br className="hidden md:block" />
                  Je bent klaar voordat je de bus in stapt.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="pt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-calcuu-primary hover:bg-calcuu-primary/90 text-white font-semibold text-lg px-8 rounded-lg   transition-all duration-300 hover:scale-105 h-12"
                  onClick={() => {
                    const downloadSection = document.getElementById("download");
                    if (downloadSection) {
                      downloadSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Probeer Gratis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-calcuu-primary text-calcuu-primary hover:bg-calcuu-primary hover:text-white font-semibold text-lg px-8 rounded-lg transition-all duration-300 hover:scale-105 h-12"
                  onClick={scrollToVideoAndPlay}
                >
                  Bekijk demo
                </Button>
              </div>
            </div>

            {/* App Mockup */}
            <div className="lg:col-span-2 flex justify-center items-center">
              <div className="relative overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/assets/4370c0c81082416ebba6e6fcedf1fc84/calcuu-offerte-a085b6?format=webp&width=800"
                  alt="Calcuu app offerte voorbeeld op iPhone"
                  className="h-[400px] lg:h-[600px] w-auto object-contain "
                  style={{
                    background: "transparent",
                    padding: "0",
                    margin: "0",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Block Section */}
      <section className="py-16 lg:py-20 bg-calcuu-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Block 1 */}
            <div className="bg-calcuu-white rounded-card p-8   transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-card flex items-center justify-center">
                  <svg
                    className="w-full h-auto text-calcuu-success self-stretch"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-calcuu-secondary mb-3 leading-tight">
                Automatische berekeningen
              </h3>
              <p className="text-calcuu-text-sub leading-relaxed">
                Laat de app het werk doen. Voer je project in en krijg direct
                nauwkeurige calculaties voor materiaal en arbeid.
              </p>
            </div>

            {/* Block 2 */}
            <div className="bg-calcuu-white rounded-card p-8   transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-card flex items-center justify-center">
                  <svg
                    className="w-full h-auto text-calcuu-success flex flex-col justify-start items-start self-stretch"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-calcuu-secondary mb-3 leading-tight">
                Professionele offertes
              </h3>
              <p className="text-calcuu-text-sub leading-relaxed">
                Genereer direct ter plekke professionele offertes die indruk
                maken op je klanten en je bedrijf serieus laten overkomen.
              </p>
            </div>

            {/* Block 3 */}
            <div className="bg-calcuu-white rounded-card p-8   transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-card flex items-center justify-center">
                  <svg
                    className="w-full h-auto text-calcuu-success self-stretch"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-calcuu-secondary mb-3 leading-tight">
                Bespaar tijd
              </h3>
              <p className="text-calcuu-text-sub leading-relaxed">
                Van uren naar minuten. Besteed je avonden aan wat echt
                belangrijk is in plaats van achter de computer zitten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-calcuu-white">
        <div className="container mx-auto px-4">
          <ScrollFadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-calcuu-primary mb-6 tracking-tight">
                Bereken en verstuur de offerte direct op locatie.
              </h2>
              <p className="text-lg md:text-xl text-calcuu-text-sub leading-relaxed max-w-3xl mx-auto">
                Geen gedoe meer met ingewikkelde spreadsheets of handmatige
                berekeningen. Maak professionele offertes voor binnen- en
                buitenwerk in minuten, geen uren.
              </p>
            </div>
          </ScrollFadeIn>

          <ScrollFadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Left Side - 50% width - 1 block */}
              <div className="lg:col-span-1">
                <div className="bg-calcuu-white rounded-card   transition-all duration-300 hover:scale-105 border border-calcuu-detail flex flex-col min-h-[207px] mr-0.5 -mb-1 px-8 pt-8 pb-16">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
                      <h3 className="text-xl font-semibold text-calcuu-secondary mt-5 mb-4">
                        Visuele Calculatie
                      </h3>
                      <p className="text-calcuu-text-sub leading-relaxed">
                        Teken je project direct in de app en krijg automatisch
                        nauwkeurige berekeningen voor materiaal, arbeid en
                        totaalprijs.
                        <br />
                        <br />
                        Zowel met het binnen- als buitenwerk worden alle
                        kozijnen, ramen, deuren, direct berekend.
                        <br />
                      </p>
                    </div>
                    <div className="flex flex-col ml-5 w-1/2 max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets%2F4370c0c81082416ebba6e6fcedf1fc84%2F5b56eb342c2e4f31a15814e558107f2d"
                        alt="Visuele Calculatie"
                        className="aspect-[0.5] object-cover object-top w-full mt-5 min-h-5 min-w-5 overflow-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - 50% width - 2 blocks stacked */}
              <div className="lg:col-span-1 flex flex-col gap-8 justify-start -ml-px">
                <div className="bg-calcuu-white rounded-card p-8   transition-all duration-300 hover:scale-105 border border-calcuu-detail justify-start ml-auto flex flex-col">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
                      <h3 className="text-xl font-semibold text-calcuu-secondary mb-4">
                        Urenregistratie
                      </h3>
                      <p className="text-calcuu-text-sub leading-relaxed">
                        Houd alles overzichtelijk zoals je uren per project,
                        foto documentatie, klantbeheer, materiaalbeheer en dat
                        allemaal in één app.
                      </p>
                    </div>
                    <div className="flex flex-col ml-5 w-1/2 max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets%2F4370c0c81082416ebba6e6fcedf1fc84%2Fec3c5b217a284078a3636c326043c92f"
                        alt="Directe offreren"
                        className="aspect-[1.16] object-cover object-bottom w-full mt-5 min-h-5 min-w-5 overflow-hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-calcuu-white rounded-card p-8   transition-all duration-300 hover:scale-105 border border-calcuu-detail justify-start ml-auto flex flex-col">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
                      <h3 className="text-xl font-semibold text-calcuu-secondary mb-4">
                        Direct offreren
                      </h3>
                      <p className="text-calcuu-text-sub leading-relaxed">
                        Genereer overzichtelijke en professionele offertes ter
                        plekke bij de klant.
                      </p>
                    </div>
                    <div className="flex flex-col ml-5 w-1/2 max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets%2F4370c0c81082416ebba6e6fcedf1fc84%2F5514f8cbf39b428b975beafed6af49bf"
                        alt="Alles-in-één"
                        className="aspect-[1.35] object-cover object-top w-full mt-5 min-h-5 min-w-5 overflow-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Demo Video Section */}
      <section id="demo" className="py-16 lg:py-24 bg-calcuu-background">
        <ScrollFadeIn>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-calcuu-secondary mb-4">
              Zie Calcuu in actie
            </h2>
            <p className="text-lg text-calcuu-text-sub mb-12 max-w-2xl mx-auto">
              Bekijk hoe snel je van schets naar offerte gaat.
            </p>

            <div className="max-w-4xl mx-auto">
              <div className="relative bg-calcuu-detail rounded-card aspect-video overflow-hidden ">
                {!isVideoPlaying ? (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={handlePlayVideo}
                  >
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F4370c0c81082416ebba6e6fcedf1fc84%2F1af5348599114d869b193511ef9c0717?format=webp&width=800"
                      alt="Calcuu Demo Video Thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-all duration-300"></div>
                    <Button
                      size="lg"
                      variant="ghost"
                      className="bg-calcuu-white/90 hover:bg-calcuu-white text-calcuu-secondary rounded-full w-20 h-20  relative z-10 hover:scale-105 transition-transform duration-300"
                    >
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>
                ) : (
                  <iframe
                    src="https://www.youtube.com/embed/uL34L4Cy9cs?autoplay=1&mute=1&rel=0&modestbranding=1&showinfo=0&controls=1"
                    title="Calcuu Demo Video"
                    className="w-full h-full rounded-card"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 lg:py-24 bg-calcuu-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-calcuu-secondary text-center mb-16">
            Wij zijn benieuwd of jij dit ook herkent?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                question:
                  "Het maken van een offerte een saai en tijdrovend proces is?",
                description:
                  "Overdag het werk opnemen en s'avonds thuis alles uitwerken / calculeren en dan digitaal omzetten naar een offerte.",
                isMiddle: false,
              },
              {
                question:
                  "Het inschatten van materialen en uren best wel moeilijk is?",
                description:
                  "Je eerst maar eens begint met één liter verf en dat je er al snel achter komt dat je tekort hebt en je weer verf moet halen.",
                isMiddle: true,
              },
              {
                question:
                  "Je eigenlijk niet precies weet hoeveel kosten je hebt gemaakt.",
                description:
                  "Ja, je schat het allemaal een beetje in. Plusminus zoveel verf en zoveel uren. Maar precies weten doe je het niet.",
                isMiddle: false,
              },
            ].map((audience, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-calcuu-primary/5 rounded-lg overflow-hidden ${audience.isMiddle ? "flex flex-col" : ""}`}
              >
                <h3 className="text-xl font-semibold text-calcuu-secondary mb-4">
                  {audience.question}
                </h3>
                <p className="text-calcuu-text-sub leading-relaxed">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <div className="text-center mt-16">
            <p className="text-xl md:text-2xl font-medium text-calcuu-secondary">
              Dit kan anders,{" "}
              <span className="text-calcuu-primary">sneller</span> en
              makkelijker.
            </p>
          </div>
        </div>
      </section>

      {/* Elegant Divider */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-calcuu-primary/50 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* 4-Step Process Section */}
      <section className="py-16 lg:py-24 bg-calcuu-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-calcuu-secondary mb-6 tracking-tight">
                Offerte Maken doe je in 4 Stappen
              </h2>
              <p className="text-lg text-calcuu-text-sub max-w-3xl mx-auto">
                Maak het jezelf gemakkelijk en gebruik de&nbsp;
                <span className="font-semibold text-calcuu-secondary">
                  Calcuu app&nbsp;
                </span>
                <br />
                om het offerte proces te versnellen en te vereenvoudigen.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Visual Side - Left */}
              <div className="relative">
                <div className="relative">
                  {/* Background Circle */}
                  <div className="absolute -inset-8 bg-calcuu-primary/5 rounded-full"></div>

                  {/* Desktop Mockup */}
                  <div className="relative z-10 bg-calcuu-secondary rounded-lg p-6  mb-8">
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="bg-calcuu-background rounded p-4 space-y-2">
                      <div className="h-4 bg-calcuu-primary/20 rounded w-3/4"></div>
                      <div className="h-4 bg-calcuu-detail rounded w-1/2"></div>
                      <div className="h-4 bg-calcuu-detail rounded w-2/3"></div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="h-12 bg-calcuu-success/20 rounded"></div>
                        <div className="h-12 bg-calcuu-primary/20 rounded"></div>
                        <div className="h-12 bg-calcuu-detail rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Mockup */}
                  <div className="absolute -bottom-4 -right-4 w-48 h-96 bg-black rounded-[2rem] p-1  z-20">
                    <div className="w-full h-full bg-calcuu-background rounded-[1.5rem] overflow-hidden">
                      <div className="h-8 bg-calcuu-white flex items-center justify-center">
                        <div className="w-20 h-1 bg-black rounded-full opacity-30"></div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-calcuu-primary rounded w-20"></div>
                        <div className="h-20 bg-calcuu-detail rounded"></div>
                        <div className="space-y-2">
                          <div className="h-3 bg-calcuu-detail rounded w-3/4"></div>
                          <div className="h-3 bg-calcuu-detail rounded w-1/2"></div>
                        </div>
                        <div className="h-10 bg-calcuu-success rounded"></div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-8 bg-calcuu-detail rounded"></div>
                          <div className="h-8 bg-calcuu-primary/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps Side - Right */}
              <div className="space-y-8">
                {[
                  {
                    number: "1",
                    title: "Teken Je Project",
                    description:
                      "Maak een schets van het te schilderen object direct in de app. Voeg eenvoudig kamers, ramen en deuren toe via onze visuele interface.",
                  },
                  {
                    number: "2",
                    title: "Automatische Berekening",
                    description:
                      "Calcuu berekent automatisch benodigde materialen (verf, primer, etc.) en geschatte uren op basis van je tekening en oppervlaktes.",
                  },
                  {
                    number: "3",
                    title: "Controleer Gegevens",
                    description:
                      "Controleer de berekeningen en pas indien nodig aan. Voeg extra kosten toe zoals steigers, afplakwerk of voorbereiding.",
                  },
                  {
                    number: "4",
                    title: "Verstuur Offerte",
                    description:
                      "Genereer een professionele offerte en verstuur deze direct naar je klant via e-mail of print ter plekke uit.",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-transparent border-2 border-calcuu-primary text-calcuu-secondary rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 hover:scale-110  hover:z-10 relative cursor-pointer">
                      {step.number}
                    </div>
                    <div className="flex-1 transition-all duration-300 group-hover:translate-x-2">
                      <h3 className="text-xl font-semibold text-calcuu-secondary mb-2 transition-all duration-300 group-hover:text-calcuu-primary">
                        {step.title}
                      </h3>
                      <p className="text-calcuu-text-sub leading-relaxed transition-all duration-300 group-hover:text-calcuu-secondary mb-10">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-calcuu-background">
        <div className="container mx-auto px-4">
          <div className="max-w-[73rem] mx-auto flex flex-col justify-center items-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-calcuu-secondary text-center mb-6">
              Waarom Calcuu voor jou de beste keuze is!
            </h2>
            <p className="text-lg text-calcuu-text-sub text-center mb-16 max-w-3xl mx-auto">
              Ontdek de voordelen die Calcuu biedt en zie waarom je geen last
              meer hebt van het gebruiken van meerdere app's en zoekrakende
              notities.
            </p>

            {/* Feature Boxes - Only Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 max-w-5xl mx-auto">
              {/* Feature Box 4 */}
              <div
                className="relative bg-white border border-calcuu-primary/20 rounded-lg p-6 h-60 flex flex-col items-center text-center transition-all duration-300 hover:border-calcuu-primary/40  group overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(91, 41, 222, 0.1), 0 0 20px rgba(91, 41, 222, 0.1), 0 0 40px rgba(91, 41, 222, 0.05)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-calcuu-primary/5 via-transparent to-calcuu-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center h-full">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-calcuu-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-calcuu-secondary mb-3">
                    Hanteer je Eigen Prijzen
                  </h3>
                  <p className="text-sm text-calcuu-text-sub leading-relaxed flex-1 flex items-center">
                    Stel je eigen uurtarieven en materiaalkosten in. Pas prijzen
                    aan per project of klant voor maximale flexibiliteit.
                  </p>
                </div>
              </div>

              {/* Feature Box 5 */}
              <div
                className="relative bg-white border border-calcuu-primary/20 rounded-lg p-6 h-60 flex flex-col items-center text-center transition-all duration-300 hover:border-calcuu-primary/40  group overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(91, 41, 222, 0.1), 0 0 20px rgba(91, 41, 222, 0.1), 0 0 40px rgba(91, 41, 222, 0.05)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-calcuu-primary/5 via-transparent to-calcuu-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center h-full">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-calcuu-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-calcuu-secondary mb-3">
                    Alles-op-één Plek
                  </h3>
                  <p className="text-sm text-calcuu-text-sub leading-relaxed flex-1 flex items-center">
                    Geen gedoe meer met verschillende apps. Tekenen, calculeren,
                    offreren en klantenbeheer in één overzichtelijke app.
                  </p>
                </div>
              </div>

              {/* Feature Box 6 */}
              <div
                className="relative bg-white border border-calcuu-primary/20 rounded-lg p-6 h-60 flex flex-col items-center text-center transition-all duration-300 hover:border-calcuu-primary/40  group overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(91, 41, 222, 0.1), 0 0 20px rgba(91, 41, 222, 0.1), 0 0 40px rgba(91, 41, 222, 0.05)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-calcuu-primary/5 via-transparent to-calcuu-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center h-full">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-calcuu-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-calcuu-secondary mb-3">
                    Inzicht en Overzicht
                  </h3>
                  <p className="text-sm text-calcuu-text-sub leading-relaxed flex-1 flex items-center">
                    Bekijk al je projecten, winst per klus en materiaalverbruik
                    in duidelijke overzichten. Zo groei je bewust.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-16">
              <Button
                size="lg"
                className="bg-calcuu-primary hover:bg-calcuu-primary/90 text-white font-semibold text-lg px-8 rounded-lg   transition-all duration-300 hover:scale-105 h-12"
                onClick={() => {
                  const downloadSection = document.getElementById("download");
                  if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Probeer de App Gratis
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Calculator />

      {/* Pricing Section */}
      {(() => {
        const MONTHLY_PRICE = 35;
        const YEARLY_PRICE = 300;

        return (
          <section id="pricing" className="py-16 lg:py-24 bg-gray-50">
            <div className="container mx-auto px-4">
              {/* Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-calcuu-secondary mb-4">
                  Prijzen
                </h2>
                <p className="text-lg text-calcuu-text-sub max-w-2xl mx-auto">
                  Eén abonnement, alles inbegrepen.
                </p>
              </div>

              {/* Eén gecentreerde kaart */}
              <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-card  border-2 border-calcuu-primary p-6 md:p-8 relative">
                  {/* Prijs-blok */}
                  <div className="text-center mb-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-6xl font-bold text-calcuu-secondary font-mono tabular-nums">
                        €{MONTHLY_PRICE}
                      </span>
                      <span className="text-xl text-calcuu-text-sub">
                        / maand
                      </span>
                    </div>
                    <p className="text-sm text-calcuu-text-sub mt-2">
                      excl. btw
                    </p>
                    <p className="text-sm text-calcuu-text-sub mt-2">
                      of €{YEARLY_PRICE} per jaar, jaarlijks gefactureerd —
                      excl. btw
                    </p>
                  </div>

                  <hr className="border-gray-200 my-6" />

                  {/* Wat je krijgt */}
                  <div className="space-y-3 mb-8">
                    {[
                      "14 dagen gratis proberen",
                      "Volledige toegang tot alle functies",
                      "Direct calculeren en offreren op locatie",
                      "Urenregistratie en projectoverzicht",
                      "Foto's en documentatie per project",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-calcuu-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-calcuu-secondary">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    size="lg"
                    className="w-full bg-calcuu-primary hover:bg-calcuu-primary/90 text-white font-semibold py-4 rounded-lg transition-all duration-300 text-base"
                    onClick={() => {
                      const downloadSection =
                        document.getElementById("download");
                      if (downloadSection) {
                        downloadSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Start 14 dagen gratis
                  </Button>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-calcuu-background">
        <ScrollFadeIn>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-calcuu-secondary text-center mb-4">
              Wat schilders zeggen over Calcuu
            </h2>
            <p className="text-lg text-calcuu-text-sub text-center mb-12 max-w-2xl mx-auto">
              Ontdek waarom vakschilders overstappen naar Calcuu.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Mark de Vries",
                  role: "Vakschilder, ZZP",
                  quote:
                    "Voorheen zat ik elke avond uren achter de laptop om offertes te maken. Met Calcuu doe ik het nu ter plekke bij de klant. Scheelt mij zeker 5 uur per week.",
                  stars: 5,
                },
                {
                  name: "Peter Jansen",
                  role: "Eigenaar Schildersbedrijf",
                  quote:
                    "De automatische materiaalberekening is een gamechanger. Geen gedoe meer met Excel-sheets. Mijn offertes zien er ook veel professioneler uit.",
                  stars: 5,
                },
                {
                  name: "Dennis Bakker",
                  role: "Vakschilder, 15 jaar ervaring",
                  quote:
                    "Eindelijk een app die begrijpt wat een schilder nodig heeft. Simpel, snel en precies. Mijn klanten zijn onder de indruk van de snelle offertes.",
                  stars: 5,
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-card p-8   transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.stars }).map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-calcuu-text-sub leading-relaxed mb-6 italic">
                    "{review.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-calcuu-secondary">
                      {review.name}
                    </p>
                    <p className="text-sm text-calcuu-text-sub">
                      {review.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollFadeIn>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 lg:py-24 bg-calcuu-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-calcuu-secondary text-center mb-12">
              Veelgestelde Vragen
            </h2>
            <FaqItem
              question="Is Calcuu echt gratis te proberen?"
              answer="Ja! Je kunt Calcuu 14 dagen gratis uitproberen zonder verplichtingen. Je hoeft geen creditcard in te vullen. Na de proefperiode kies je zelf of je doorgaat."
            />
            <FaqItem
              question="Werkt Calcuu op zowel iPhone als Android?"
              answer="Ja, Calcuu is beschikbaar in zowel de Apple App Store als de Google Play Store. De app werkt op alle moderne smartphones en tablets."
            />
            <FaqItem
              question="Hoe nauwkeurig zijn de berekeningen?"
              answer="Calcuu berekent materiaal en uren op basis van bewezen formules voor de schildersbranche. Je kunt altijd handmatig aanpassen als dat nodig is voor specifieke situaties."
            />
            <FaqItem
              question="Kan ik mijn eigen prijzen en tarieven instellen?"
              answer="Absoluut! Je stelt je eigen uurtarieven, materiaalkosten en marges in. Zo past elke offerte bij jouw bedrijf en prijsniveau."
            />
            <FaqItem
              question="Hoe verstuur ik een offerte naar mijn klant?"
              answer="Na het berekenen genereer je met één klik een professionele PDF-offerte. Deze verstuur je direct via e-mail vanuit de app, of je print hem ter plekke uit."
            />
            <FaqItem
              question="Kan ik Calcuu opzeggen wanneer ik wil?"
              answer="Ja, je kunt je abonnement op elk moment opzeggen. Er zijn geen langlopende contracten of verborgen kosten."
            />
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section id="download" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 font-semibold">
            <h2 className="text-3xl md:text-4xl font-semibold text-calcuu-secondary mb-4 flex flex-col justify-center items-center">
              <span className="text-5xl bg-gray-50">Download Calcuu</span>
            </h2>

            {/* iOS: alleen App Store-knop */}
            {platform === "ios" && (
              <div className="flex justify-center">
                <button
                  onClick={() => window.open(APP_STORE_URL, "_blank")}
                  className="flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-card hover:bg-gray-800 transition-colors w-full max-w-sm cursor-pointer"
                >
                  <Download className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-xs">Download in de</div>
                    <div className="text-xl font-semibold">App Store</div>
                  </div>
                </button>
              </div>
            )}

            {/* Android: alleen Google Play-knop */}
            {platform === "android" && (
              <div className="flex justify-center">
                <button
                  onClick={() => window.open(PLAY_STORE_URL, "_blank")}
                  className="flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-card hover:bg-gray-800 transition-colors w-full max-w-sm cursor-pointer"
                >
                  <Download className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-xs">Download in</div>
                    <div className="text-xl font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            )}

            {/* Desktop: beide knoppen + QR-code */}
            {platform === "desktop" && (
              <>
                <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {/* Arrow pointing to App Store */}
                  <img
                    src="https://cdn.builder.io/api/v1/assets/4370c0c81082416ebba6e6fcedf1fc84/pijl-8c2851?format=webp&width=800"
                    alt="Arrow pointing to App Store"
                    className="absolute -top-20 left-1/2 transform -translate-x-32 w-16 h-16 sm:w-20 sm:h-20"
                  />

                  {/* Arrow pointing to Google Play Store (mirrored) */}
                  <img
                    src="https://cdn.builder.io/api/v1/assets/4370c0c81082416ebba6e6fcedf1fc84/pijl-8c2851?format=webp&width=800"
                    alt="Arrow pointing to Google Play Store"
                    className="absolute -top-20 right-1/2 transform translate-x-32 scale-x-[-1] w-16 h-16 sm:w-20 sm:h-20"
                  />

                  <div
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-card hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => window.open(APP_STORE_URL, "_blank")}
                  >
                    <Download className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-lg font-semibold">App Store</div>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-card hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => window.open(PLAY_STORE_URL, "_blank")}
                  >
                    <Download className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs">Get it on</div>
                      <div className="text-lg font-semibold">Google Play</div>
                    </div>
                  </div>
                </div>

                {/* QR-code voor desktop-bezoekers */}
                <div className="mt-12 flex flex-col items-center">
                  <div className="flex items-center gap-4 mb-6 w-full max-w-xs">
                    <div className="h-px flex-1 bg-gray-300"></div>
                    <span className="text-sm text-gray-500 uppercase tracking-wide">
                      of scan met je telefoon
                    </span>
                    <div className="h-px flex-1 bg-gray-300"></div>
                  </div>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=${encodeURIComponent(window.location.origin + "/app")}`}
                    alt="QR-code naar Calcuu"
                    className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg p-2"
                  />
                  <p className="text-sm text-gray-500 mt-4 max-w-xs text-center">
                    Scan met je telefoon — je gaat direct door naar de juiste
                    app-store.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-calcuu-secondary text-calcuu-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-end gap-3">
                <img
                  src="https://cdn.builder.io/api/v1/assets/4370c0c81082416ebba6e6fcedf1fc84/logo-purple-spring-500x500px-9f1602?format=webp&width=800"
                  alt="Calcuu Logo"
                  className="w-8 h-8"
                />
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: "Geist, Inter, sans-serif" }}
                >
                  calcuu
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                Slimme calculatie-app voor vakschilders
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@calcuu.nl</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+31 6 21511498</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div>
                  <a
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </a>
                </div>
                <div>
                  <a
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Voorwaarden
                  </a>
                </div>
                <div>
                  <a
                    href="mailto:support@calcuu.nl"
                    className="hover:text-white transition-colors"
                  >
                    Support
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Download</h4>
              <div className="space-y-2">
                <a
                  href="https://apps.apple.com/nl/app/calcuu/id1609226426"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs bg-white text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.calcuu.calcuu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs bg-white text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
            © 2026 Calcuu by Zinger Company. Alle rechten voorbehouden.
          </div>
        </div>
      </footer>

      <CookieBanner />
    </div>
  );
};

export default Home;
