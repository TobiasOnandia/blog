"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`?${params.toString()}`);
  }, 300);

  return (
    <input
      type="search"
      placeholder="Buscar en el archivo..."
      className="flex-1 w-full md:w-auto px-6 py-3 border border-black/20 focus:border-black/60"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("search") || ""}
    />
  );
}
