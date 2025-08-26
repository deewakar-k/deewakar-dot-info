import { Showcase } from "@/components/showcase";

export default function Crafts() {
  return (
    <div className="relative h-screen w-full">
      <Showcase />
      <div className="blur-gradient-bottom pointer-events-none fixed right-0 bottom-0 left-0 h-[180px]"></div>
    </div>
  );
}
