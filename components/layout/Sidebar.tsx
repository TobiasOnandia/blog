"use client";
import { categories } from "@/config";
import { useCategories } from "@/hooks/useCategories";

export const Sidebar = () => {
  const handleCategoryChange = useCategories();

  return (
    <aside className=" py-12 max-w-[240px] w-full font-courier-prime sticky top-0 ">
      <nav>
        <ul className="space-y-6">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => {
                  handleCategoryChange(category);
                }}
                className="w-full text-left py-2 hover:pl-4 transition-all duration-300 
                              border-l-2 border-transparent hover:border-black
                              text-lg tracking-wide uppercase"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
