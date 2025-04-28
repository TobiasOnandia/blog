"use client";

import { Categories } from "@/components/common/Categories";
import { Empty } from "@/components/common/EmptyPosts";
import { Search } from "@/components/common/Search";
import { FilteredPost } from "@/components/posts/all/FilteredPost";
import { Suspense } from "react";

/**
 * Renders the main post list component, which includes a header with search and categories,
 * a grid of posts, and a message when there are no posts.
 *
 * This component is wrapped in a `Suspense` boundary to handle the loading state of the
 * `FilteredPost` component.
 *
 * @returns The main post list component
 */
export default function PostsGrid() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center"></div>
      }
    >
      <main className=" mx-auto  py-12 font-courier-prime">
        {/* Header con buscador */}
        <header className="mb-12 border-b border-black/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-6">
            Últimas Crónicas
          </h1>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Search />
            <Categories />
          </div>
        </header>

        {/* Grid tipo Bento */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          <FilteredPost />
        </section>
        {/* Mensaje sin resultados */}
        <Empty />
      </main>
    </Suspense>
  );
}
