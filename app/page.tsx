import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Main } from "@/components/layout/Main";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <div className="relative max-w-11/12 mx-auto min-h-screen w-full text-neutral-950">
      <Header />
      <Hero />
      <section className="flex w-full gap-4 border-t border-black/20 ">
        <Sidebar />
        <Main />
      </section>
      <Footer />
    </div>
  );
}
