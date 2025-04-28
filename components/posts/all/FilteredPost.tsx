import { BubbleIcon } from "@/components/icons";
import { useFilter } from "@/hooks/useFilter";
export const FilteredPost = () => {
  const filteredPosts = useFilter();

  return (
    <>
      {filteredPosts.map((post, index) => {
        const colSpan = index % 5 === 0 ? "md:col-span-2" : "md:col-span-1";
        const rowSpan = index % 5 === 0 ? "md:row-span-2" : "md:row-span-1";

        return (
          <article
            key={post.id}
            className={`${colSpan} ${rowSpan} group border border-black/20 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer`}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-600">
                  {post.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold mt-2 mb-4">
                  {post.title}
                </h3>
                <p className="text-gray-700 line-clamp-3">
                  {post.content as string}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
                <time>
                  {new Date(post.createdAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                  })}
                </time>
                <span className="flex items-center gap-1">
                  <BubbleIcon className="w-6 h-6" />
                  {/* {post.comments} */}8
                </span>
              </div>
            </div>

            {/* Efecto hover */}
            <div className="absolute inset-0 -z-10 group-hover:bg-black/3 transition-colors duration-300" />
          </article>
        );
      })}
    </>
  );
};
