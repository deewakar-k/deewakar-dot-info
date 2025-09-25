import { R2_BASE_URL } from "@/lib/constant";
import Link from "next/link";

interface Component {
  filename: string;
  date: string;
  link?: string;
}

const components: Component[] = [
  {
    filename: "logo-carousel.mov",
    date: "Sep 25, 2025",
  },
  {
    filename: "chat-input.mp4",
    date: "Aug 28, 2025",
  },
  {
    filename: "ghostie.mov",
    date: "Aug 20, 2025",
  },
  {
    filename: "databuddy.jpeg",
    date: "July 27, 2025",
  },
  {
    filename: "cmd-menu.jpeg",
    date: "July 14, 2025",
  },
  {
    filename: "better-hover.mov",
    date: "July 18, 2025",
  },
];

const sorted = [...components].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const Showcase = () => {
  return (
    <div className="flex flex-col gap-4">
      {sorted.map(({ filename, date, link }) => {
        const content = (
          <div className="mb-8">
            <div className="w-full rounded-[8px] border border-zinc-800 p-1 transition hover:shadow-lg dark:border-zinc-800/20">
              <div className="relative aspect-[16/9]">
                {filename.endsWith(".mov") || filename.endsWith(".mp4") ? (
                  <video
                    src={`${R2_BASE_URL}/${filename}`}
                    className="absolute inset-0 h-full w-full rounded-[4px] object-cover object-center"
                    autoPlay
                    muted
                    loop
                    preload="auto"
                    playsInline
                  />
                ) : (
                  <img
                    src={`${R2_BASE_URL}/${filename}`}
                    alt={filename.split(".")[0]}
                    className="absolute inset-0 h-full w-full rounded-[4px] object-cover object-center"
                  />
                )}
              </div>
            </div>

            <div className="mx-2 mt-3 flex items-center justify-between">
              {filename && (
                <h3 className="text-secondary-foreground">
                  {filename.split(".")[0]}
                </h3>
              )}
              <p className="text-secondary-foreground">{date}</p>
            </div>
          </div>
        );

        return link ? (
          <Link href={link} key={filename}>
            {content}
          </Link>
        ) : (
          <div key={filename}>{content}</div>
        );
      })}
    </div>
  );
};
