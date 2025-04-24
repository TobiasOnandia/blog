import { Hero } from "@/components/layout/Hero";
import { Main } from "@/components/layout/Main";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="flex w-full gap-4 border-t border-black/20 ">
        <Sidebar />
        <Main />
      </section>
    </>
  );
}
