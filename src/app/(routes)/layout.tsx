import { BackButton } from "@/components/back-btn";
import { ThemeToggle } from "@/components/theme-toggle";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen max-w-full flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="flex w-full max-w-lg flex-col gap-8">
          <div className="mb-12 flex items-center justify-between">
            <BackButton />
            <ThemeToggle />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
