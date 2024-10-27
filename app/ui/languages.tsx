import React from "react";
import { TechTag } from "./tech-ext";

const LANGUAGE_CONFIG = [
  {
    name: ".go",
    className: "bg-cyan-100/40 text-cyan-400 border border-cyan-400",
  },
  {
    name: ".c",
    className: "bg-pink-100/40 text-pink-300 border border-pink-300",
  },
  {
    name: ".py",
    className: "bg-yellow-100/40 text-yellow-300 border border-yellow-300",
  },
  {
    name: ".ts",
    className: "bg-sky-100/40 text-sky-400 border border-sky-400",
  },
  // {
  //   name: ".rs",
  //   className: "bg-rose-400/40 text-rose-400 border border-rose-400",
  // },
];

export const Languages = () => {
  return (
    <span>
      I can work with a variety of programming languages, including{" "}
      {LANGUAGE_CONFIG.map((lang, index) => (
        <React.Fragment key={lang.name}>
          <TechTag className={lang.className}>{lang.name}</TechTag>
          {index < LANGUAGE_CONFIG.length - 2 && (
            <span className="mr-1">,</span>
          )}
          {index === LANGUAGE_CONFIG.length - 2 && (
            <span className="mr-1">, and</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};
