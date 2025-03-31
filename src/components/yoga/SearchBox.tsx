
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-xs">
      <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <Input
        type="text"
        placeholder="Search yoga poses..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-7 py-1 h-8 text-sm bg-white/60 border-yogaTeal focus-visible:ring-yogaTeal"
      />
    </div>
  );
};

export default SearchBox;
