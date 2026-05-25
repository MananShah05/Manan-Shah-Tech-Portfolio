import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode, MouseEvent } from "react";
import { LayoutGrid } from "lucide-react";
import "./Dock.css";

interface SpringOptions {
  mass?: number;
  stiffness?: number;
  damping?: number;
}

interface DockItemData {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

// ─── Desktop DockItem — spring-magnification driven ───────────────────────
interface DesktopDockItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
}

function DesktopDockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DesktopDockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) => {
        const childEl = child as React.ReactElement;
        if (childEl.type === DockLabel) {
          return cloneElement(childEl, { isHovered } as Partial<unknown> & React.Attributes);
        }
        return childEl;
      })}
    </motion.div>
  );
}

// ─── Mobile DockItem — pure CSS sizing, no Framer spring ──────────────────
interface MobileDockItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function MobileDockItem({
  children,
  className = "",
  onClick,
}: MobileDockItemProps) {
  return (
    <div
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {children}
    </div>
  );
}

// ─── DockLabel ────────────────────────────────────────────────────────────
interface DockLabelProps {
  children: ReactNode;
  className?: string;
  isHovered?: ReturnType<typeof useMotionValue<number>>;
}

function DockLabel({ children, className = "", ...rest }: DockLabelProps) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest: number) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── DockIcon ─────────────────────────────────────────────────────────────
interface DockIconProps {
  children: ReactNode;
  className?: string;
}

function DockIcon({ children, className = "" }: DockIconProps) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

// ─── Dock ─────────────────────────────────────────────────────────────────
interface DockProps {
  items: DockItemData[];
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  baseItemSize = 50,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    }
    return false;
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const isScrollingRef = useRef(false);
  const lastInputTimeRef = useRef(0);
  const [clickedLabelIndex, setClickedLabelIndex] = useState<number | null>(null);
  const labelTimeoutRef = useRef<number | null>(null);

  // Detect touch device
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track scrolling for mobile dock collapse without flicker after scroll end
  useEffect(() => {
    if (!isMobile) return;
    lastScrollYRef.current = window.scrollY;

    const markUserInput = () => {
      lastInputTimeRef.current = Date.now();
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollYRef.current);
      lastScrollYRef.current = currentY;

      if (delta < 2) {
        return;
      }

      const now = Date.now();
      const recentlyInteracted = now - lastInputTimeRef.current < 400;
      if (!recentlyInteracted && !isScrollingRef.current) {
        return;
      }

      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        setIsScrolling(true);
      }

      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
      }, 160);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", markUserInput, { passive: true });
    window.addEventListener("touchmove", markUserInput, { passive: true });
    window.addEventListener("touchend", markUserInput, { passive: true });
    window.addEventListener("pointerdown", markUserInput, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", markUserInput);
      window.removeEventListener("touchmove", markUserInput);
      window.removeEventListener("touchend", markUserInput);
      window.removeEventListener("pointerdown", markUserInput);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
      if (labelTimeoutRef.current) {
        window.clearTimeout(labelTimeoutRef.current);
        labelTimeoutRef.current = null;
      }
    };
  }, [isMobile]);

  const maxHeight = useMemo(
    () => magnification + (panelHeight - baseItemSize),
    [magnification, panelHeight, baseItemSize]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  const panelClass = [
    "dock-panel",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      style={{
        position: "fixed",
        bottom: isMobile ? "3rem" : "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        pointerEvents: "none",
        width: "fit-content",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {isMobile ? (
        /* ── Mobile: plain div, fully CSS-controlled ── */
        <div
          className={`${panelClass} ${isScrolling ? "dock-scrolling" : ""}`}
          role="toolbar"
          aria-label="Application dock"
          style={{ pointerEvents: "auto", position: "relative" }}
          data-lenis-prevent="true"
        >
          {items.map((item, index) => (
            <MobileDockItem
              key={index}
              onClick={() => {
                // fade label on tap
                setClickedLabelIndex(index);
                if (labelTimeoutRef.current) {
                  window.clearTimeout(labelTimeoutRef.current);
                }
                labelTimeoutRef.current = window.setTimeout(() => {
                  setClickedLabelIndex(null);
                  labelTimeoutRef.current = null;
                }, 400);

                if (item.onClick) item.onClick();
              }}
              className={`${item.className} ${clickedLabelIndex === index ? "label-clicked" : ""}`}
            >
              <DockIcon>{item.icon}</DockIcon>
              <span className="dock-mobile-label">{item.label}</span>
            </MobileDockItem>
          ))}
          <div className="dock-collapsed-indicator">
            <LayoutGrid size={20} className="opacity-60" style={{ color: "var(--fg)" }} />
          </div>
        </div>
      ) : (
        /* ── Desktop: Framer Motion spring magnification ── */
        <motion.div
          onMouseMove={({ pageX }: MouseEvent) => {
            isHovered.set(1);
            mouseX.set(pageX);
          }}
          onMouseLeave={() => {
            isHovered.set(0);
            mouseX.set(Infinity);
          }}
          className={panelClass}
          style={{ height, pointerEvents: "auto" }}
          role="toolbar"
          aria-label="Application dock"
        >
          {items.map((item, index) => (
            <DesktopDockItem
              key={index}
              onClick={item.onClick}
              className={item.className}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DesktopDockItem>
          ))}
        </motion.div>
      )}
    </div>
  );
}

