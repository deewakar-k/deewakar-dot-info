export const Showcase = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full rounded-[8px] border border-zinc-800 p-1 dark:border-zinc-800/20">
        <div className="h-[250px] md:h-[300px] md:w-[500px]">
          <video
            src="/clips/better-hover.mov"
            className="h-full w-full rounded-[4px] object-cover"
            autoPlay
            muted
            loop
            preload="auto"
            playsInline
          />
        </div>
      </div>
      <div className="w-full rounded-[8px] border border-zinc-800 p-1 dark:border-zinc-800/20">
        <div className="h-[250px] md:h-[300px] md:w-[500px]">
          <video
            src="/clips/in-call.mov"
            className="h-full w-full rounded-[4px] object-cover"
            autoPlay
            muted
            loop
            preload="auto"
            playsInline
          />
        </div>
      </div>
    </div>
  );
};
