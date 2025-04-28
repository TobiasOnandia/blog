"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const useCategories = () => {
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

  return handleCategoryChange;
};
