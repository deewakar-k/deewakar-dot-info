"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

export const LogoCarousel = () => {
  const config = {
    cycleInterval: 2000,
    enterDuration: 1.5,
    exitDuration: 0.4,

    enterEase: [0.165, 0.84, 0.44, 1] as const,
    exitEase: [0.455, 0.03, 0.515, 0.955] as const,

    cascadeDelay: 0.15,
    overlapRatio: 0.9,

    slideDistance: 40,
    blurAmount: "5px",
  };

  const logos = [
    { label: "Vercel wordmark", svg: "/brands/vercel.svg" },
    { label: "Linear wordmark", svg: "/brands/linear.svg" },
    { label: "Retool wordmark", svg: "/brands/retool.svg" },
    { label: "Ramp wordmark", svg: "/brands/ramp.svg" },
    { label: "Resend wordmark", svg: "/brands/resend.svg" },
    { label: "Cursor wordmark", svg: "/brands/cursor.svg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const start = currentIndex * 3;
  const visibleLogos = logos.slice(start, start + 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const totalSets = Math.ceil(logos.length / 3);
        return (prevIndex + 1) % totalSets;
      });
    }, config.cycleInterval);

    return () => clearInterval(interval);
  }, [logos.length, config.cycleInterval]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={currentIndex}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex items-center gap-8"
      >
        {visibleLogos.map((logo, idx) => (
          <motion.div
            key={idx}
            initial={{
              y: config.slideDistance,
              opacity: 0,
              filter: `blur(${config.blurAmount})`,
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                duration: config.enterDuration,
                ease: config.enterEase,
                delay: idx * config.cascadeDelay * config.overlapRatio,
              },
            }}
            exit={{
              y: -config.slideDistance,
              opacity: 0,
              filter: `blur(${config.blurAmount})`,
              transition: {
                duration: config.exitDuration,
                ease: config.exitEase,
                delay: idx * config.cascadeDelay,
              },
            }}
          >
            <img
              src={logo.svg}
              alt={logo.label}
              aria-label={logo.label}
              width={80}
              height={60}
              style={{ objectFit: "contain" }}
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
