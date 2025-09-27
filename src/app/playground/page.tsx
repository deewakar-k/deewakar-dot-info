import Scrollbar from "@/components/anim/scrollbar";
import { redirect } from "next/navigation";

export default function Playground() {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Scrollbar />
    </div>
  );
}
