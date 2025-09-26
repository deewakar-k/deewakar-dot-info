import { ComponentType } from "react";
import { readSourceFile } from "./source-reader";
import { LogoCarousel } from "../components/anim/logo-carousel";

export interface ComponentMetadata {
  id: string;
  title: string;
  description: string;
  filename: string;
  date: string;
  component: ComponentType | null; 
  sourcePath: string;
  view: boolean;
  link?: string;
}

export interface ComponentDisplay extends ComponentMetadata {
  sourceCode: string; 
}

export const COMPONENTS_REGISTRY: Record<string, ComponentMetadata> = {
  "logo-carousel": {
    id: "logo-carousel",
    title: "Logo Carousel",
    description: "Animated logo carousel component built with motion.",
    filename: "logo-carousel.mov",
    date: "Sep 25, 2025",
    component: LogoCarousel,
    sourcePath: "components/anim/logo-carousel.tsx",
    view: true,
  },
  "chat-input": {
    id: "chat-input",
    title: "Chat Input",
    description: "A modern chat input component with smooth animations and user-friendly interactions.",
    filename: "chat-input.mp4",
    date: "Aug 28, 2025",
    component: null,
    sourcePath: "", 
    view: false,
  },
  "ghostie": {
    id: "ghostie",
    title: "Ghostie",
    description: "An animated ghost character with floating animations and interactive features.",
    filename: "ghostie.mov",
    date: "Aug 20, 2025",
    component: null, 
    sourcePath: "", 
    view: false,
  },
  "databuddy": {
    id: "databuddy",
    title: "Data Buddy",
    description: "A data visualization component for displaying analytics and metrics.",
    filename: "databuddy.jpeg",
    date: "July 27, 2025",
    component: null, 
    sourcePath: "", 
    view: false,
  },
  "cmd-menu": {
    id: "cmd-menu",
    title: "Command Menu",
    description: "A command palette interface with search functionality and keyboard shortcuts.",
    filename: "cmd-menu.jpeg",
    date: "July 14, 2025",
    component: null,
    sourcePath: "", 
    view: false,
  },
  "better-hover": {
    id: "better-hover",
    title: "Better Hover",
    description: "Enhanced hover effects with smooth transitions and visual feedback.",
    filename: "better-hover.mov",
    date: "July 18, 2025",
    component: null,
    sourcePath: "",
    view: false,
  },
};

export const getComponentById = (id: string): ComponentDisplay | null => {
  const component = COMPONENTS_REGISTRY[id];
  
  if (!component || !component.view || !component.component) {
    return null;
  }

  const sourceCode = component.sourcePath ? readSourceFile(component.sourcePath) : '// No source code available';

  return {
    ...component,
    sourceCode,
  };
};

export const getAllComponents = (): ComponentMetadata[] => {
  return Object.values(COMPONENTS_REGISTRY);
};

export const getViewableComponents = (): ComponentMetadata[] => {
  return Object.values(COMPONENTS_REGISTRY).filter(component => component.view);
};
