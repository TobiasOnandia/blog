import { BubbleIcon } from "@/components/icons";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function PostsGrid() {
    
    const {data} = trpc.post.list.useQuery();
    const posts = data?.posts ?? [];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = ['Todas', 'Política', 'Cultura', 'Economía', 'Tecnología'];
    
    const filteredPosts = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           (post.content as string).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  
    return (
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 font-courier-prime">
        {/* Header con buscador */}
        <header className="mb-12 border-b border-black/20 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-6">Últimas Crónicas</h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <input
              type="text"
              placeholder="Buscar en el archivo..."
              className="flex-1 w-full md:w-auto px-6 py-3 border border-black/20 focus:border-black/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className="flex gap-2 flex-wrap w-full md:w-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'Todas' ? 'all' : category)}
                  className={`px-4 py-2 text-sm uppercase tracking-widest transition-all ${
                    selectedCategory === (category === 'Todas' ? 'all' : category)
                      ? 'bg-black text-white'
                      : 'border border-black/20 hover:bg-black/5'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </header>
  
        {/* Grid tipo Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {filteredPosts.map((post, index) => {
            const colSpan = index % 5 === 0 ? 'md:col-span-2' : 'md:col-span-1';
            const rowSpan = index % 5 === 0 ? 'md:row-span-2' : 'md:row-span-1';
            
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
                      {new Date(post.createdAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </time>
                    <span className="flex items-center gap-1">
                      <BubbleIcon className="w-4 h-4" />
                      {/* {post.comments} */}
                      8
                    </span>
                  </div>
                </div>
                
                {/* Efecto hover */}
                <div className="absolute inset-0 -z-10 group-hover:bg-black/3 transition-colors duration-300" />
              </article>
            );
          })}
        </div>
  
        {/* Mensaje sin resultados */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-gray-600">
            <p className="text-xl">No se encontraron crónicas</p>
            <p className="mt-2">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </main>
    );
  };