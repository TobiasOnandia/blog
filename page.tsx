import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Main } from "@/components/layout/Main";
import { PostCreator } from "@/components/posts/PostCreator";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Home() {
  return (
    <div className="bg-neutral-50 grid grid-cols-2  h-screen w-full text-neutral-950">
      <Header />
      <Hero />
      <Sidebar />
      <PostCreator />
      <Main />
    </div>
  );
}
