import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Main } from "@/components/Main";
import { PostCreator } from "@/components/PostCreator";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <div className=" relative max-w-11/12 mx-auto min-h-screen w-full text-neutral-950">
      <Header />
      <Hero />
      <section className="flex w-full gap-4 border-t border-black/20 ">
        <Sidebar />
        <Main />
      </section>
    </div>
  );
}
