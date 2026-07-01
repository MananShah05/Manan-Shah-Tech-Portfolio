import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { QMEntry } from "./QuantHero";
import { QMIdentity } from "./QuantAbout";
import { QuantSkills } from "./QuantSkills";
import { QMExperience } from "./QuantExperience";
import { QMMarkets } from "./QMMarkets";
import { QMProjects } from "./QuantProjects";
import { QMCertifications } from "./QuantCertifications";
import { QMSignal } from "./QuantCTA";
import { usePortfolioMode } from "../../hooks/usePortfolioMode";
import { useMarketData } from "../../hooks/useMarketData";

/**
 * Investment & Strategy lens — single page, burnished-amber-on-obsidian register.
 * Flow: QMEntry → QMIdentity → QuantSkills → QMExperience → QMMarkets → QMProjects → QMCertifications → QMSignal.
 * Independent dark/light theme (session state, default dark) via data-quant-theme.
 */
export const QuantLayout: React.FC = () => {
  const { quantTheme } = usePortfolioMode();
  const { quotes, chartPrices, isLive } = useMarketData();

  return (
    <div className="quant-root" data-quant-theme={quantTheme}>
      <Navbar />
      <main>
        <QMEntry liveQuotes={quotes} liveChartPrices={chartPrices} isLive={isLive} />
        <QMIdentity />
        <QuantSkills />
        <QMExperience />
        <QMMarkets />
        <QMProjects />
        <QMCertifications />
        <QMSignal />
      </main>
      <Footer />
    </div>
  );
};


export default QuantLayout;
