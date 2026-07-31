"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * "Metal shutter" section transition — a steel panel that rolls up to
 * reveal the section beneath it, in from the top like a factory door.
 */
export default function ShutterReveal({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        style={{ transformOrigin: "top" }}
        className="absolute inset-0 z-20 bg-[repeating-linear-gradient(180deg,#211a14_0px,#211a14_10px,#1b1611_10px,#1b1611_20px)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
