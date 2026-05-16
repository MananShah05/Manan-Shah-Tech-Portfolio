import { motion } from "framer-motion";
import { Hammer } from "lucide-react";

const items = [
  "InsureDoc v2",
  "AI Resume Chat",
  "Semantic Search",
  "DeepGuard v2",
  "FinSearch API",
];

export default function CurrentlyBuilding() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="flex items-center gap-3 px-4 py-2 rounded-full glass w-fit"
    >
      <Hammer size={13} className="text-orange-500 flex-shrink-0" />
      <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
        Currently Building:
      </span>
      <div className="flex items-center gap-2 overflow-hidden">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-300 whitespace-nowrap">
              {item}
            </span>
            {i < items.length - 1 && (
              <span className="text-zinc-700 text-xs">·</span>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
