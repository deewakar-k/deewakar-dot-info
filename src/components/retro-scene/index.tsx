"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./scene"), { ssr: false });

export const RetroScene = () => {
  return <Scene />;
};
