"use client";

import { Empty } from "@/components/common/EmptyPosts";
import { Search } from "@/components/common/Search";
import { FilteredPost } from "@/components/posts/all/FilteredPost";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function PostsGrid() {
  const { data } = trpc.post.list.useQuery();
  const posts = data?.posts ?? [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["Todas", "Política", "Cultura", "Economía", "Tecnología"];

  return (
    <main className=" mx-auto  py-12 font-courier-prime">
      {/* Header con buscador */}
      <header className="mb-12 border-b border-black/20 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold uppercase mb-6">
          Últimas Crónicas
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <Search />

          <div className="flex gap-2 flex-wrap w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category === "Todas" ? "all" : category)
                }
                className={`px-4 py-2 text-sm uppercase tracking-widest transition-all ${
                  selectedCategory === (category === "Todas" ? "all" : category)
                    ? "bg-black text-white"
                    : "border border-black/20 hover:bg-black/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid tipo Bento */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
        <FilteredPost />
      </section>
      {/* Mensaje sin resultados */}
      <Empty />
    </main>
  );
}
