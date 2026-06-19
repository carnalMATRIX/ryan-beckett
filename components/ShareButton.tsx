"use client";

import { useState } from "react";
import { Share, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: "-50%" }}
            animate={{ opacity: 1, x: 0, y: "-50%" }}
            exit={{ opacity: 0, x: 10, y: "-50%" }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-neutral-900/90 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-none border border-white/10 shadow-2xl whitespace-nowrap z-50 flex items-center gap-1.5 pointer-events-none"
          >
            <Check size={10} className="text-crimson-bright" strokeWidth={3} />
            Link Copied
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={handleShare}
        variant="default"
        size="icon"
        title="Share Project"
        className="rounded-none!"
      >
        <Share />
      </Button>
    </div>
  );
}
