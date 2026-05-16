import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface LogLine {
  text: string;
  type: "info" | "success" | "warn" | "cmd";
}

const bootSequence: LogLine[] = [
  { text: "> booting portfolio engine...", type: "cmd" },
  { text: "> loading resume-data.ts", type: "info" },
  { text: "> indexing projects...", type: "info" },
  { text: "> linking research graph...", type: "info" },
  { text: "> initializing NLP models...", type: "info" },
  { text: "> FastAPI server online ✓", type: "success" },
  { text: "> PostgreSQL connected ✓", type: "success" },
  { text: "> semantic search ready ✓", type: "success" },
  { text: "> deployment status: live", type: "success" },
];

const cycleLogs: LogLine[] = [
  { text: "> POST /api/extract { document: \"claim_001.pdf\" }", type: "cmd" },
  { text: "> 200 OK — entities: 14, confidence: 0.94", type: "success" },
  { text: "> transformer inference: 127ms", type: "info" },
  { text: "> embedding batch: 512 dims, normalized", type: "info" },
  { text: "> vector search: top-k=5, latency=42ms", type: "success" },
  { text: "> model checkpoint saved: epoch 47, loss 0.023", type: "info" },
  { text: "> Vercel deploy: production — 2.4s build", type: "success" },
  { text: "> deepfake scan: frame 1,247 — confidence 0.91", type: "warn" },
  { text: "> OCR pipeline: Tesseract + custom NER", type: "info" },
  { text: "> batch processing: 847 docs/hour", type: "success" },
];

export default function Terminal() {
  const [lines, setLines] = useState<LogLine[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"boot" | "cycle" | "idle">("boot");
  const scrollRef = useRef<HTMLDivElement>(null);

  const source = phase === "boot" ? bootSequence : cycleLogs;

  useEffect(() => {
    if (lineIndex >= source.length) {
      if (phase === "boot") {
        setPhase("cycle");
        setLineIndex(0);
        setCharIndex(0);
        setCurrentLine("");
      } else {
        setTimeout(() => {
          setLineIndex(0);
          setCharIndex(0);
          setCurrentLine("");
        }, 3000);
      }
      return;
    }

    const line = source[lineIndex];
    if (charIndex < line.text.length) {
      const timer = setTimeout(() => {
        setCurrentLine(line.text.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 18 + Math.random() * 25);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev.slice(-18), line]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex(lineIndex + 1);
      }, 400 + Math.random() * 300);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex, phase, source]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  const getColor = (type: LogLine["type"]) => {
    switch (type) {
      case "success":
        return "text-[#1b4332]";
      case "warn":
        return "text-[#c45c26]";
      case "cmd":
        return "text-[#6b6860]";
      default:
        return "text-[#a39e94]";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass-light rounded-2xl overflow-hidden border border-[#1a1a18]/6"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a18]/6 bg-[#1a1a18]/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#c45c26]/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#8a8478]/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#1b4332]/40" />
        <span className="ml-3 text-[10px] font-mono text-[#a39e94] uppercase tracking-widest">
          system.log
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="px-4 py-4 h-[220px] overflow-hidden font-mono text-[11px] leading-[1.7]"
      >
        {lines.map((line, i) => (
          <div key={i} className={getColor(line.type)}>
            {line.text}
          </div>
        ))}
        {currentLine && (
          <div className="flex items-center">
            <span className={getColor(source[lineIndex]?.type || "info")}>
              {currentLine}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className="ml-0.5 w-[6px] h-[14px] bg-[#1b4332]/60 inline-block"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
