import { useFilter } from "@/hooks/useFilter";

export const Empty = () => {
  const filteredPosts = useFilter();

  return (
    <>
      {filteredPosts.length === 0 && (
        <div className="text-center py-20 text-gray-600">
          <p className="text-xl">No se encontraron crónicas</p>
          <p className="mt-2">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </>
  );
};
