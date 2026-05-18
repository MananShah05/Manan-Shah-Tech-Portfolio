"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from "react";
import { useTheme } from "@/contexts/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = "light" | "dark";

export interface AppBarProps {
  /** Logo to display in the AppBar */
  logo?: ReactNode;
  /** Application name */
  appName?: string;
  /** If provided, renders a search input */
  onSearch?: (query: string) => void;
  /** User avatar image URL or element */
  userAvatar?: ReactNode;
  /** User name to display */
  userName?: string;
}

export interface ThemeToggleProps {
  /** Variant of the top bar. Default: "default" */
  variant?: "default" | "appbar" | "icon";
  /** Content for the app bar when variant is "appbar" */
  appBarProps?: AppBarProps;
  /** Starting theme. Default: "light" */
  defaultTheme?: Theme;
  /** Height of the top bar in px. Default: 44 for default, 60 for appbar */
  barHeight?: number;
  /** Diameter of the icon button in px. Default: 36 */
  buttonSize?: number;
  /** Curtain animation duration in ms. Default: 550 */
  duration?: number;
  /** Called after each theme change completes */
  onThemeChange?: (theme: Theme) => void;
  /** Page content rendered below the bar */
  children?: ReactNode;
}

// ─── Design tokens (using tailwind variables for smooth integration) ──────────

const TOKENS: Record<Theme, Record<string, string>> = {
  light: {
    pageBg: "#f5f2ec", // var(--bg)
    pageText: "#1a1a18", // var(--fg)
    btnBg: "rgba(26, 26, 24, 0.05)",
    btnText: "#1a1a18",
    btnRing: "rgba(26, 26, 24, 0.15)",
  },
  dark: {
    pageBg: "#0a0a0a", // var(--bg)
    pageText: "#f5f2ec", // var(--fg)
    btnBg: "rgba(255, 255, 255, 0.05)",
    btnText: "#f5f2ec",
    btnRing: "rgba(255, 255, 255, 0.15)",
  },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function MoonIcon() {
  return (
    <svg
      width="16" height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="16" height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

type CurtainPhase = "idle" | "falling" | "rising";

const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

export function ThemeToggle({
  buttonSize = 36,
  duration = 550,
  onThemeChange,
  children,
}: ThemeToggleProps) {
  const { isDark, toggle: globalToggle } = useTheme();
  const [theme, setTheme] = useState<Theme>(isDark ? "dark" : "light");
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const curtainColorRef = useRef<string>("");

  // Sync theme with globalTheme state
  useEffect(() => {
    const nextTheme: Theme = isDark ? "dark" : "light";
    if (nextTheme !== theme) {
      setTheme(nextTheme);
    }
  }, [isDark]);

  const toggle = useCallback(() => {
    if (phase !== "idle") return;
    const next: Theme = theme === "light" ? "dark" : "light";
    curtainColorRef.current = TOKENS[next].pageBg;
    setPhase("falling");

    setTimeout(() => {
      setTheme(next);
      globalToggle(); // Toggle the global context theme!
      onThemeChange?.(next);

      setPhase("rising");
      setTimeout(() => setPhase("idle"), duration + 60);
    }, duration);
  }, [phase, theme, duration, onThemeChange, globalToggle]);

  // ── Derived styles ──────────────────────────────────────────────────────────

  const btnScale = pressed ? 0.96 : hovered ? 1.1 : 1;
  const btnStyle: CSSProperties = {
    position: "relative",
    width: buttonSize,
    height: buttonSize,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--glass-bg)",
    color: "var(--fg)",
    boxShadow: `0 0 0 1px var(--glass-border)`,
    zIndex: 9999,
    outline: "none",
    transform: `scale(${btnScale})`,
    transition:
      "background 0.3s ease, color 0.3s ease, transform 0.15s ease, box-shadow 0.3s ease",
    flexShrink: 0,
  };

  const curtainStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: curtainColorRef.current,
    transformOrigin: "top",
    transform: phase === "falling" ? "scaleY(1)" : "scaleY(0)",
    transition:
      phase !== "idle" ? `transform ${duration}ms ${EASING}` : "none",
    zIndex: 99999,
    pointerEvents: "none",
  };

  return (
    <>
      <div aria-hidden="true" style={curtainStyle} />
      <button
        style={btnStyle}
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        aria-pressed={theme === "dark"}
      >
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </button>
      {children}
    </>
  );
}