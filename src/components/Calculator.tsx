import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedNumber from "@/components/AnimatedNumber";

const HOURLY_RATE = 50;

const Calculator = () => {
  const [offertes, setOffertes] = useState(2);

  // Berekening:
  // • Tijdwinst per maand (min): offertes × 90 × 0.60
  // • Tijdwinst per maand (uur): / 60
  // • Tijdwinst per jaar (uur): × 12
  // • Besparing per jaar: die uren × €50
  //
  // De abonnementskosten gingen hier eerst vanaf. Dat stond nergens en het
  // leest ook niet zo: onder het bedrag staat het aantal bespaarde uren, en
  // die twee hoorden niet bij elkaar te rekenen.
  const totalTimeWinMinutes = offertes * 90 * 0.6;
  const timeWinHours = Math.round((totalTimeWinMinutes / 60) * 10) / 10;
  const yearlyHours = Math.round(timeWinHours * 12 * 10) / 10;
  const yearlySaving = Math.round(yearlyHours * HOURLY_RATE);

  return (
    <section className="py-16 lg:py-24 bg-calcuu-background overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-calcuu-secondary mb-3">
            Hoeveel tijd scheelt het jou?
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Schuif en zie direct wat je per jaar bespaart.
          </p>

          {/* Eén gecentreerde donkere kaart */}
          <div
            style={{ backgroundColor: "#242447" }}
            className="rounded-card p-6 md:p-8 text-white "
          >
            {/* Slider */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-200 mb-3">
                Aantal offertes per maand:{" "}
                <span className="font-bold text-white font-mono tabular-nums">
                  <AnimatedNumber value={offertes} />
                </span>
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={offertes}
                onChange={(e) => setOffertes(parseInt(e.target.value))}
                className="w-full rounded-lg appearance-none cursor-pointer slider"
                style={{
                  height: "6px",
                  background: "rgba(255,255,255,0.2)",
                  outline: "none",
                }}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            <hr className="border-white/15 my-6" />

            {/* Resultaat */}
            <div className="text-center py-2">
              <div className="text-sm text-gray-300 mb-2">
                Je bespaart per jaar
              </div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-3 font-mono tabular-nums">
                <AnimatedNumber
                  value={yearlySaving}
                  prefix="€"
                  duration={1000}
                />
              </div>
              <div className="text-sm text-gray-300">
                ={" "}
                <span className="font-mono tabular-nums">
                  <AnimatedNumber
                    value={yearlyHours}
                    decimals={1}
                    smartDecimals
                    duration={800}
                  />
                </span>{" "}
                uur extra vrije tijd
              </div>
            </div>

            {/* CTA */}
            <Button
              style={{ backgroundColor: "#5B29DE" }}
              className="w-full text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity mt-8"
              onClick={() => {
                const downloadSection = document.getElementById("download");
                if (downloadSection) {
                  downloadSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Start nu 14 dagen gratis
            </Button>
          </div>

          {/* Footnote onder de kaart */}
          <p className="text-xs text-gray-500 text-center mt-4 px-4">
            Berekend op basis van gemiddeld uurloon €50 en 60% tijdsbesparing
            per offerte.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
