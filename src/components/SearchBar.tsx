import { useState } from "react";


type Props = { onSearch: (query: string) => void; loading?: boolean };

export default function SearchBar({ onSearch, loading }: Props) {
  const [q, setQ] = useState("");

  return (
     <form
         onSubmit={(e) => {e.preventDefault();
          if (q.trim()) onSearch(q.trim());
         }}  className="flex rounded-md overflow-hidden max-w-md mx-auto">
        
          <input value={q} onChange={(e) => setQ(e.target.value)}
             placeholder="Search for any IP address or domain"
             className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3" />

          <button
            type="submit"
            disabled={loading}
            className="bg-black p-4 hover:bg-gray-800 transition-colors"
            aria-label="Search"
            > 
        <img src={Arrow} alt="" />
          </button>
      </form>
  );
}



