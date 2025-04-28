import { Hero } from "@/components/layout/Hero";
import { Main } from "@/components/layout/Main";
import { Sidebar } from "@/components/layout/Sidebar";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div className="w-full h-screen" />}>
      <Hero />
      <section className="flex w-full gap-4 border-t border-black/20 ">
        <Sidebar />
        <Main />
      </section>
    </Suspense>
  );
}
