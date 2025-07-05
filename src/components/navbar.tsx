import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex flex-col gap-1">
      <Link
        href="/projects"
        className="underline decoration-neutral-600 decoration-dashed underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-rose-100"
      >
        projects
      </Link>
      <Link
        href="/crafts"
        className="underline decoration-neutral-600 decoration-dashed underline-offset-4 transition-colors duration-300 hover:text-white hover:decoration-rose-100"
      >
        crafts
      </Link>
    </div>
  );
};
