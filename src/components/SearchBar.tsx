import React from 'react';
import { Search } from 'lucide-react';

type SearchBarProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search menu items..."
        className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 pl-10 pr-4 
                 text-white placeholder-white/50 focus:outline-none focus:border-starbucks-green
                 backdrop-blur-sm"
      />
      <Search className="absolute left-3 top-3 h-5 w-5 text-white/60" />
    </div>
  );
};

export default SearchBar;