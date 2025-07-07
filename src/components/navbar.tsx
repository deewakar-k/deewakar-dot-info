import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex flex-col gap-1">
      <Link
        href="/projects"
        className="underline decoration-dashed underline-offset-[5px] transition-colors duration-300 hover:decoration-pink-200"
      >
        projects
      </Link>
      <Link
        href="/crafts"
        className="underline decoration-dashed underline-offset-[5px] transition-colors duration-300 hover:decoration-pink-200"
      >
        crafts
      </Link>
    </div>
  );
};
