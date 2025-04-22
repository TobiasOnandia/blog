import { Header } from "@/components/Header";
import { PostCreator } from "@/components/PostCreator";

export default function Home() {
  return (
    <div className="bg-neutral-50 h-screen w-screen text-neutral-950">
      <Header />
      <PostCreator />
    </div>
  );
}
