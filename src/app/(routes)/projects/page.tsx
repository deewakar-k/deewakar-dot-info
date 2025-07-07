"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const projects = [
  {
    id: "glim",
    title: "glim",
    description: "a screenshot design tool",
    href: "https://github.com/deewakar-k/glim",
  },
  {
    id: "readme",
    title: "readme",
    description: "a portfolio builder to elevate your professional presence",
    href: "https://readme.deewakar.info/",
  },
];

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div className="relative flex flex-col gap-4">
      {projects.map((project) => (
        <motion.a
          key={project.id}
          href={project.href}
          target="_blank"
          className="relative z-10 -mx-1 flex cursor-pointer flex-col rounded-md p-4"
          onHoverStart={() => setHoveredId(project.id)}
          onHoverEnd={() => setHoveredId(null)}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          rel="noreferrer"
        >
          <AnimatePresence>
            {hoveredId === project.id && (
              <motion.div
                layoutId="hover-background"
                className="bg-surface absolute inset-0 -z-10 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
              />
            )}
          </AnimatePresence>

          <h1 className="relative z-10 text-lg font-medium">{project.title}</h1>
          <p className="text-secondary-foreground relative z-10">
            {project.description}
          </p>
        </motion.a>
      ))}
    </motion.div>
  );
}
