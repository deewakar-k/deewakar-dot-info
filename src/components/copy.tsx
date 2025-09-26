"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code snippet"
      className="cursor-pointer rounded-md p-2 transition-colors duration-[.15s] ease-in-out hover:bg-neutral-900"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={copied ? "check" : "copy"}
          initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
          }}
        >
          {copied ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <CopyIcon className="h-4 w-4" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
