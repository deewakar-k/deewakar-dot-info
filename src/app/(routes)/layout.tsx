import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-12 flex items-center justify-center">{children}</div>
  );
}
