"use client";
import { categories } from "@/config";
import { useCategories } from "@/hooks/useCategories";
import { useSearchParams } from "next/navigation";

export const Categories = () => {
  const selectedCategory = useSearchParams().get("category") || "Todas";
  const handleCategoryChange = useCategories();

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
