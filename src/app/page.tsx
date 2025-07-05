import { Footer } from "@/components/footer";
import { Main } from "@/components/main";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen max-w-full flex-col">
      <div className="flex flex-grow items-center justify-center">
        <div className="flex w-full max-w-lg flex-col gap-12">
          <Main />
          <Navbar />
          <Footer />
        </div>
      </div>
    </div>
  );
}
