import { useState } from "react";

export const useSearch = ( ) => {
    
// hay que hacerlo con un debounce y la query debe estar en la url

    const [searchQuery, setSearchQuery] = useState('');
    
    
    return(
        <input
        type="search"
        placeholder="Buscar en el archivo..."
        className="flex-1 w-full md:w-auto px-6 py-3 border border-black/20 focus:border-black/60"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
    )
}