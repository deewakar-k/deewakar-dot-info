"use client";

import type React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "motion/react";
import useSound from "use-sound";

export default function Scrollbar() {
  const [lines, setLines] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animationRef = useRef<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeLineIndex, setActiveLineIndex] = useState(0);

  const [playTick] = useSound("/sounds/tick.mp3", {
    volume: 0.1,
    preload: true,
  });

  useEffect(() => {
    const lineData = [];
    for (let i = 0; i < 100; i++) {
      const height = i % 10 === 0 ? 35 : 20;
      lineData.push(height);
    }
    setLines(lineData);
  }, []);

  const playTickSound = useCallback(() => {
    try {
      playTick();
    } catch (error) {
      console.log("Audio play failed:", error);
    }
  }, [playTick]);

  const checkScrollBoundaries = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);

    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    const totalLines = lines.length;
    const currentLineIndex = Math.round(scrollPercentage * (totalLines - 1));
    const newActiveLineIndex = Math.max(
      0,
      Math.min(currentLineIndex, totalLines - 1),
    );

    if (newActiveLineIndex !== activeLineIndex) {
      playTickSound();
    }

    setActiveLineIndex(newActiveLineIndex);
  }, [lines.length, activeLineIndex, playTickSound]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);

    if (contentRef.current) {
      contentRef.current.style.willChange = "transform";
    }
  };

  const updateScroll = useCallback((targetScrollLeft: number) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = targetScrollLeft;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      e.preventDefault();

      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      const targetScrollLeft = scrollLeft - walk;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = requestAnimationFrame(() => {
        updateScroll(targetScrollLeft);
      });
    },
    [isDragging, startX, scrollLeft, updateScroll],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    if (contentRef.current) {
      contentRef.current.style.willChange = "auto";
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);

    if (contentRef.current) {
      contentRef.current.style.willChange = "auto";
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      checkScrollBoundaries();
    };

    container.addEventListener("scroll", handleScroll);
    checkScrollBoundaries();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [checkScrollBoundaries]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <div
        ref={containerRef}
        className="scrollbar-hide cursor-grab overflow-x-auto active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: isDragging ? "auto" : "smooth",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={contentRef}
          className="relative flex h-24 w-fit items-end justify-start gap-[8px] px-4"
          style={{
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {lines.map((height, index) => {
            const isActive = index === activeLineIndex;
            return (
              <div key={index} className="relative flex flex-col items-center">
                {height === 35 && (
                  <div
                    className="absolute bottom-full mb-1 text-center font-mono whitespace-nowrap text-neutral-400"
                    style={{ fontSize: "8px" }}
                  >
                    {(Math.floor(index / 10) * 0.1).toFixed(2)}
                  </div>
                )}
                <motion.div
                  className={`flex-shrink-0 ${height === 35 ? "bg-neutral-50" : "bg-neutral-700"}`}
                  animate={{
                    width: isActive ? "3px" : "1px",
                    height: isActive ? "35px" : `${height}px`,
                    borderRadius: isActive ? "9999px" : "0px",
                    opacity: isActive ? 0.8 : 1,
                    backgroundColor: isActive
                      ? "#4a81e8"
                      : height === 35
                        ? "#fafafa"
                        : "#404040",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {canScrollLeft && (
        <div
          className="pointer-events-none absolute top-0 left-0 h-full w-8"
          style={{
            background:
              "linear-gradient(to right, #101010 0%, transparent 100%)",
          }}
        />
      )}

      {canScrollRight && (
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-8"
          style={{
            background:
              "linear-gradient(to left, #101010 0%, transparent 100%)",
          }}
        />
      )}
    </div>
  );
}
