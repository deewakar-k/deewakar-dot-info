import { Github, Mail, Twitter } from "lucide-react";
import { Time } from "./time";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <a href="https://x.com/deewakar01" target="_blank">
          <Twitter className="text-secondary-foreground size-4 transition-colors duration-300 hover:text-blue-300" />
        </a>
        <a href="https://x.com/deewakar01" target="_blank">
          <Github className="text-secondary-foreground size-4 transition-colors duration-300 hover:text-blue-500" />
        </a>
        <a href="mailto:deewakar.tech@gmail.com" target="_blank">
          <Mail className="text-secondary-foreground size-4 transition-colors duration-300 hover:text-yellow-300" />
        </a>
      </div>
      <div className="text-sm">
        <Time />
      </div>
    </footer>
  );
};
