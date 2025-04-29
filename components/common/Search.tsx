"use client";

import { useSearch } from "@/hooks/useSearch";
import { useSearchParams } from "next/navigation";

export function Search() {
  const searchParams = useSearchParams();
  const handleSearch = useSearch();

  return (
    <input
      type="search"
      name="search"
      data-testid="search"
      placeholder="Buscar en el archivo..."
      className="flex-1 w-full md:w-auto px-6 py-3 border border-black/20 focus:border-black/60"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("search") || ""}
    />
  );
}
