"use client";

import { useEffect, useRef, useState } from "react";

export const MouseTrail = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!container.current) return;

      const x = e.clientX;
      const y = e.clientY;

      const colIndex = Math.floor(x / 8);
      const rowIndex = Math.floor(y / 8);

      const columns = container.current.querySelectorAll(".column");
      if (columns[colIndex]) {
        const block = columns[colIndex].children[rowIndex] as HTMLElement;
        if (block) {
          colorize(block);
        }
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [windowSize.width, windowSize.height]);

  const colorize = (el: EventTarget | null) => {
    if (!(el instanceof HTMLElement)) return;

    el.classList.remove("trail-active");
    void el.offsetHeight;
    el.classList.add("trail-active");
    setTimeout(() => {
      el.classList.remove("trail-active");
    }, 1000);
  };

  const getBlocks = () => {
    if (windowSize.height === 0) return;

    const noOfBlocks = Math.ceil(windowSize.height / 8);

    return [...Array(noOfBlocks).keys()].map((_, idx) => {
      return (
        <div
          key={idx}
          onMouseMove={(e) => colorize(e.target)}
          className="block"
        ></div>
      );
    });
  };

  const getColumns = () => {
    const noOfColumns = Math.ceil(windowSize.width / 8);
    return [
      ...Array(noOfColumns)
        .keys()
        .map((_, idx) => (
          <div key={`col_${idx}`} className="column">
            {getBlocks()}
          </div>
        )),
    ];
  };

  return (
    <div
      ref={container}
      className="flex h-screen w-full items-center justify-center"
    >
      <div className="grid">{windowSize.width > 0 && getColumns()}</div>
    </div>
  );
};
