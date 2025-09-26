import { R2_BASE_URL } from "@/lib/constant";
import { getAllComponents } from "@/lib/components-registry";
import Link from "next/link";

const components = getAllComponents();

const sorted = [...components].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export const Showcase = () => {
  return (
    <div className="flex flex-col gap-4">
      {sorted.map(({ id, filename, date, link, view }) => {
        const content = (
          <div className="mb-8">
            <div className="w-full rounded-[8px] border border-zinc-800 p-1.5 transition hover:shadow-lg dark:border-zinc-800/20">
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
                    className="rounded-[4px] object-cover object-center"
                  />
                )}
              </div>
              {view && (
                <Link
                  href={`/${id}`}
                  className="flex w-full items-center justify-center rounded-[4px] bg-neutral-900 py-1.5 transition-colors duration-75 hover:bg-[#222222]"
                >
                  View
                </Link>
              )}
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
          <Link href={link} key={id}>
            {content}
          </Link>
        ) : (
          <div key={id}>{content}</div>
        );
      })}
    </div>
  );
};
