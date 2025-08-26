import { R2_BASE_URL } from "@/lib/constant";
import Link from "next/link";

interface Component {
  filename: string;
  date: string;
  link?: string;
}

const components: Component[] = [
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
    filename: "in-call.mov",
    date: "July 15, 2025",
  },
  {
    filename: "better-hover.mov",
    date: "July 18, 2025",
  },
];

export const Showcase = () => {
  return (
    <div className="flex flex-col gap-4">
      {components.map(({ filename, date, link }) => {
        const content = (
          <div className="mb-8">
            <div className="w-full rounded-[8px] border border-zinc-800 p-1 transition hover:shadow-lg dark:border-zinc-800/20">
              <div className="relative h-[250px] md:h-[300px] md:w-[500px]">
                {filename.endsWith(".mov") ? (
                  <video
                    src={`${R2_BASE_URL}/${filename}`}
                    className="h-full w-full rounded-[4px] object-cover"
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
                    className="h-full w-full rounded-[4px] object-cover"
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
