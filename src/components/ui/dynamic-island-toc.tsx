import { useState, useEffect, ReactNode, useMemo } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

// --- Types ---

type HeadingData = {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
};

// --- Shared Animation Configs ---

const islandTransition: Transition = {
  type: "tween",
  ease: [0.22, 1, 0.36, 1],
  duration: 0.5,
};

// --- Progress Circle Component ---

function CircleProgress({ percentage }: { percentage: number }) {
  const size = 24;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90 shrink-0">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--fg-subtle)"
        strokeWidth={strokeWidth}
        style={{ opacity: 0.2 }}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        strokeLinecap="round"
      />
    </svg>
  );
}

// --- Section Name Map for Portfolio ---

const SECTION_NAME_MAP: Record<string, string> = {
  hero: "MAIN",
  about: "ABOUT ME",
  skills: "SKILLS",
  experience: "EXPERIENCE",
  projects: "PROJECTS",
  certifications: "CERTIFICATIONS",
  design: "UI UX DESIGNS",
  leadership: "CO-CURRICULAR ACTIVITIES",
  testimonials: "TESTIMONIALS",
  contact: "CONTACT ME",
};

// --- Main Component ---

type DynamicIslandTOCProps = {
  children?: ReactNode;
  /**
   * CSS selector to find headings.
   */
  selector?: string;
};

export function DynamicIslandTOC({
  children,
  selector = "section h2",
}: DynamicIslandTOCProps) {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Read initial visibility from localStorage
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("toc-visible");
      return stored !== "false";
    }
    return true;
  });

  // Listen to custom window event
  useEffect(() => {
    const handleVisibilityChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ visible: boolean }>;
      setIsVisible(customEvent.detail.visible);
    };

    window.addEventListener("dynamic-island-visibility", handleVisibilityChange);
    return () => window.removeEventListener("dynamic-island-visibility", handleVisibilityChange);
  }, []);

  const setTOCVisible = (visible: boolean) => {
    localStorage.setItem("toc-visible", String(visible));
    setIsVisible(visible);
    window.dispatchEvent(
      new CustomEvent("dynamic-island-visibility", { detail: { visible } })
    );
  };

  // 1. DOM Scanning Strategy
  useEffect(() => {
    const getHeadings = () => {
      const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];

      const validHeadings = elements
        .filter((el) => !el.hasAttribute("data-toc-ignore"))
        .map((el, index) => {
          // Find closest parent section with an ID to use as the navigation target
          const parentSection = el.closest("section");
          if (parentSection && parentSection.id) {
            el.id = parentSection.id;
          } else if (!el.id) {
            const generatedId =
              el.textContent
                ?.toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "") || `toc-heading-${index}`;
            el.id = generatedId;
          }

          const depthAttr = el.getAttribute("data-toc-depth");
          let level = 2;

          if (depthAttr) {
            level = parseInt(depthAttr, 10);
          } else {
            const tagName = el.tagName.toUpperCase();
            if (tagName.startsWith("H") && tagName.length === 2) {
              level = parseInt(tagName[1], 10);
            }
          }

          // Override text using our high-fidelity SECTION_NAME_MAP
          const text = SECTION_NAME_MAP[el.id] || el.getAttribute("data-toc-title") || el.textContent || "Section";

          return { id: el.id, text, level, element: el };
        });

      // Sort by DOM order mathematically
      validHeadings.sort((a, b) =>
        a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
      );

      // Prepend "Main" (targeting the Hero section container at the top of the viewport)
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        validHeadings.unshift({
          id: "hero",
          text: "MAIN",
          level: 2,
          element: heroElement,
        });
      }

      setHeadings(validHeadings);
    };

    const timer = setTimeout(getHeadings, 150);
    return () => clearTimeout(timer);
  }, [selector]);

  // 2. Scroll Spy & Progress
  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId: string | null = null;
      for (const heading of headings) {
        const top = heading.element.getBoundingClientRect().top;
        // Offset to trigger active state as section reaches the viewport top
        if (top <= 200) {
          currentActiveId = heading.id;
        } else {
          break;
        }
      }

      if (!currentActiveId && headings.length > 0) {
        currentActiveId = headings[0].id;
      }

      setActiveId(currentActiveId);

      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const activeHeading = headings.find((h) => h.id === activeId);

  const minLevel = useMemo(() => {
    if (headings.length === 0) return 1;
    return Math.min(...headings.map((h) => h.level));
  }, [headings]);

  return (
    <>
      {children}

      {/* Backdrop Blur Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={islandTransition}
            className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-[4px]"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isVisible && (
          /* Dynamic Island Wrapper (Aligned Top-Right below the navbar) */
          <motion.div
            key="island"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-[88px] right-4 md:right-10 lg:right-16 z-[9999] flex flex-col items-end"
          >
            <motion.div
              onClick={() => {
                if (!isExpanded) setIsExpanded(true);
              }}
              initial={false}
              animate={{
                width: isExpanded ? 320 : 180, // Sleeker closed pill width (180 instead of 200)
                height: isExpanded ? Math.min(360, 50 + headings.length * 34) : 44, // Dynamic expanded height to eliminate extra space
                borderRadius: isExpanded ? 20 : 22,
              }}
              transition={islandTransition}
              style={{ cursor: isExpanded ? "default" : "pointer" }}
              className="relative overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl text-[var(--fg)] shadow-2xl"
            >
              {/* CLOSED PILL CONTENT */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isExpanded ? 0 : 1,
                  scale: isExpanded ? 0.95 : 1,
                  filter: isExpanded ? "blur(4px)" : "blur(0px)",
                }}
                transition={{ ...islandTransition, delay: isExpanded ? 0 : 0.1 }}
                className={cn("absolute inset-0 flex items-center justify-between gap-3 px-4", isExpanded && "pointer-events-none")}
              >
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] animate-pulse" />

                <div className="relative flex h-full flex-1 items-center overflow-hidden text-left">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={activeId || "empty"}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-mono font-medium tracking-tight text-[var(--fg)]"
                    >
                      {activeHeading?.text || "Contents"}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <CircleProgress percentage={progress} />
              </motion.div>

              {/* EXPANDED MENU CONTENT */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  scale: isExpanded ? 1 : 1.05,
                }}
                transition={{ ...islandTransition, delay: isExpanded ? 0.1 : 0 }}
                className={cn("absolute inset-0 flex flex-col", !isExpanded && "pointer-events-none")}
              >
                <div className="flex shrink-0 items-center justify-between px-5 pb-2 pt-4">
                  <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[var(--fg-subtle)]">
                    CONTENTS
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTOCVisible(false);
                        setIsExpanded(false);
                      }}
                      title="Hide Table of Contents"
                      className="text-[9px] font-mono uppercase bg-[var(--fg)]/5 px-2 py-0.5 rounded text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--fg)]/10 transition-colors cursor-pointer"
                    >
                      Hide
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(false);
                      }}
                      className="text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)] cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain px-3 pb-3" data-lenis-prevent="true">
                  <div className="flex flex-col gap-0.5">
                    {headings.map((h) => {
                      const isActive = activeId === h.id;
                      const isHovered = hoveredId === h.id;

                      const indentLevel = Math.max(0, h.level - minLevel);
                      const paddingLeft = indentLevel * 12 + 10;

                      return (
                        <button
                          key={h.id}
                          onMouseEnter={() => setHoveredId(h.id)}
                          onMouseLeave={() => setHoveredId(null)}
                          onClick={(e) => {
                            e.stopPropagation();
                            const targetElement = document.getElementById(h.id);
                            if (targetElement) {
                              targetElement.scrollIntoView({ behavior: "smooth" });
                            }
                            setIsExpanded(false);
                          }}
                          style={{ paddingLeft: `${paddingLeft}px` }}
                          className={cn(
                            "group flex w-full shrink-0 cursor-pointer items-center rounded-lg border-none py-1.5 pr-2.5 text-left text-xs transition-all duration-300 ease-out",
                            isActive && "bg-[var(--accent)]/10 font-semibold text-[var(--accent)]",
                            !isActive && isHovered && "bg-[var(--fg)]/5 text-[var(--fg)]",
                            !isActive && !isHovered && "bg-transparent text-[var(--fg-muted)]",
                          )}
                        >
                          <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap transition-transform duration-300 group-hover:translate-x-0.5">
                            {h.text}
                          </span>

                          <motion.div
                            initial={false}
                            animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
