import Crafts from "@/components/crafts";
import { Main } from "@/components/main";
import Projects from "@/components/projects";
import { RetroScene } from "@/components/retro-scene";

export default function Home() {
  return (
    <div className="flex max-w-full flex-col py-40 md:py-52">
      <div className="flex flex-grow items-center justify-center">
        <div className="flex w-full max-w-lg flex-col gap-20 md:max-w-xl">
          <Main />
          <RetroScene />
          <Projects />
          <Crafts />
          <div className="blur-gradient-bottom pointer-events-none fixed right-0 bottom-0 left-0 h-[180px]"></div>
        </div>
      </div>
    </div>
  );
}
