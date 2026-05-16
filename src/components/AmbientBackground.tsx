import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#1b4332]/[0.02] blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] right-[0%] w-[600px] h-[600px] rounded-full bg-[#c45c26]/[0.015] blur-[140px]"
      />
      <motion.div
        animate={{
          x: [0, 15, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full bg-[#1b4332]/[0.015] blur-[100px]"
      />
    </div>
  );
}
