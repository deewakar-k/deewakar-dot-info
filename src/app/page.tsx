import { Footer } from "@/components/footer";
import { Main } from "@/components/main";
import { MouseTrail } from "@/components/mouse-trail";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex max-w-full flex-col py-40 md:py-52">
      <div className="flex flex-grow items-center justify-center">
        <div className="flex w-full max-w-xs flex-col gap-12 md:max-w-lg">
          <Main />
          <Navbar />
          <Footer />
          <MouseTrail />
        </div>
      </div>
    </div>
  );
}
