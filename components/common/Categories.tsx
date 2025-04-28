"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const Categories = () => {
  const categories = ["Todas", "Política", "Cultura", "Economía", "Tecnología"];
  const selectedCategory = useSearchParams().get("category") || "Todas";
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category !== "Todas") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    replace(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2  flex-wrap w-full md:w-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 text-sm uppercase tracking-widest transition-all ${
            selectedCategory === (category === "Todas" ? "Todas" : category)
              ? "bg-black text-white"
              : "border border-black/20 hover:bg-black/5"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
