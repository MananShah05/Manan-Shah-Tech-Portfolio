import { useState } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import CinematicOpener from "./components/CinematicOpener";
import MobileDesktopWarning from "./components/MobileDesktopWarning";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import AmbientBackground from "./components/AmbientBackground";
import SectionDivider from "./components/SectionDivider";
import Dock from "./components/Dock";
import Particles from "./components/Particles";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import UIUXShowcase from "./components/UIUXShowcase";
import Leadership from "./components/Leadership";
import Certifications from "./components/Certifications";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { DynamicIslandTOC } from "@/components/ui/dynamic-island-toc";
import {
  Home,
  User,
  Wrench,
  Briefcase,
  FolderGit2,
  Award,
  Mail,
} from "lucide-react";

// Portfolio Merge & Cinematic Transition Imports
import { PortfolioProvider, usePortfolioMode } from "./hooks/usePortfolioMode";
import { PortfolioShell } from "./components/PortfolioShell";
import { InkFlood } from "./components/InkFlood";
import { RGBSplit } from "./components/RGBSplit";

// Creative Portfolio Component Imports
import { Navbar as CreativeNavbar } from "./creative/components/layout/Navbar";
import { Hero as CreativeHero } from "./creative/components/sections/Hero";
import { About as CreativeAbout } from "./creative/components/sections/About";
import { Projects as CreativeProjects } from "./creative/components/sections/Projects";
import { Skills as CreativeSkills } from "./creative/components/sections/Skills";
import { Certifications as CreativeCertifications } from "./creative/components/sections/Certifications";
import { Hackathons as CreativeHackathons } from "./creative/components/sections/Hackathons";
import { Experience as CreativeExperience } from "./creative/components/sections/Experience";
import { Contact as CreativeContact } from "./creative/components/sections/Contact";
import { Footer as CreativeFooter } from "./creative/components/layout/Footer";


const dockItems = [
  {
    icon: <Home size={20} strokeWidth={1.8} />,
    label: "Home",
    onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  },
  {
    icon: <User size={20} strokeWidth={1.8} />,
    label: "About",
    onClick: () => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: <Wrench size={20} strokeWidth={1.8} />,
    label: "Skills",
    onClick: () => document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: <Briefcase size={20} strokeWidth={1.8} />,
    label: "Experience",
    onClick: () => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: <FolderGit2 size={20} strokeWidth={1.8} />,
    label: "Projects",
    onClick: () => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: <Award size={20} strokeWidth={1.8} />,
    label: "Certifications",
    onClick: () => document.querySelector("#certifications")?.scrollIntoView({ behavior: "smooth" }),
  },
  {
    icon: <Mail size={20} strokeWidth={1.8} />,
    label: "Contact",
    onClick: () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }),
  },
];

function AppContent() {
  const { isDark } = useTheme();
  const { mode } = usePortfolioMode();
  const [showOpener, setShowOpener] = useState(true);

  const particleColors = isDark
    ? ["#52b788", "#74c69d", "#f4a261", "#e9c46a"] // bright on dark
    : ["#1b4332", "#2d6a4f", "#c45c26", "#6b6860"]; // deep on light

  const devPortfolioLayout = (
    <>
      <Navbar />
      {!showOpener && <DynamicIslandTOC />}
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        {/* Particles background spans Skills through Contact */}
        <div className="relative">
          <div className="absolute inset-0 pointer-events-auto" style={{ zIndex: 0 }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden">
              <Particles
                key={isDark ? "dark" : "light"}
                particleCount={120}
                particleSpread={12}
                speed={0.15}
                particleColors={particleColors}
                moveParticlesOnHover={true}
                particleHoverFactor={0.6}
                alphaParticles={true}
                particleBaseSize={80}
                sizeRandomness={0.8}
                cameraDistance={25}
                disableRotation={false}
              />
            </div>
          </div>
          <div className="relative" style={{ zIndex: 1 }}>
            <Skills />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Certifications />
            <SectionDivider />
            <UIUXShowcase />
            <SectionDivider />
            <Leadership />
            <SectionDivider />
            <Testimonials />
            <SectionDivider />
            <Contact />
          </div>
        </div>
      </main>
      <Footer />
      <Dock
        items={dockItems}
        panelHeight={64}
        baseItemSize={44}
        magnification={64}
        distance={180}
      />
    </>
  );

  const creativePortfolioLayout = (
    <>
      <CreativeNavbar />
      <main className="min-h-screen bg-bg">
        <CreativeHero />
        <CreativeAbout />
        <CreativeProjects />
        <CreativeSkills />
        <CreativeCertifications />
        <CreativeHackathons />
        <CreativeExperience />
        <CreativeContact />
      </main>
      <CreativeFooter />
    </>
  );

  const { transitionPhase, screenshotSrc, portalOrigin } = usePortfolioMode();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div
      className="relative min-h-screen selection:bg-(--selection-bg)"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      {showOpener && <CinematicOpener onComplete={() => setShowOpener(false)} />}
      {!showOpener && <MobileDesktopWarning />}
      <CustomCursor />
      <AmbientBackground />
      <ScrollProgress />
      
      {/* Cinematic Transition Overlays */}
      {!isMobile && (
        <RGBSplit phase={transitionPhase} screenshotSrc={screenshotSrc} />
      )}
      <InkFlood phase={transitionPhase} origin={portalOrigin} />

      {!showOpener && (
        <PortfolioShell
          developerPortfolio={devPortfolioLayout}
          creativePortfolio={creativePortfolioLayout}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </PortfolioProvider>
  );
}
