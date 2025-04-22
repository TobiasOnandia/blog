import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Main } from "@/components/Main";
import { PostCreator } from "@/components/PostCreator";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="bg-neutral-50 grid grid-cols-2  h-screen w-full text-neutral-950">
      <Header />  
      <Hero />
      <Sidebar />
      <Main />
      {/* <PostCreator /> */}
    </div>
  );
}
