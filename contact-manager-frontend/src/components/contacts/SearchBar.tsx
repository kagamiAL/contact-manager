"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { SearchType } from "@/lib/types";

interface SearchBarProps {
  onSearch: (query: string, type: SearchType) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export default function SearchBar({
  onSearch,
  onClear,
  isLoading = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("firstName");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  const searchTypeLabels: Record<SearchType, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    fullName: "Full Name",
  };

  return (
    <div className="mb-12">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search people..."
          className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-white focus:placeholder:text-white/50 transition-all duration-500 transform focus:scale-[1.02]"
        />

        {query && (
          <div className="flex items-center space-x-4 mt-4 animate-in slide-in-from-top duration-300">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="text-xs"
            >
              {showFilters ? "hide filters" : "filters"}
            </Button>
            <Button
              type="submit"
              variant="ghost"
              className="text-xs"
              disabled={isLoading}
            >
              search
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleClear}
              className="text-xs"
            >
              clear
            </Button>
          </div>
        )}
      </form>

      {showFilters && (
        <div className="mt-6 flex space-x-4 animate-in slide-in-from-top duration-400">
          {(Object.keys(searchTypeLabels) as SearchType[]).map(
            (type, index) => (
              <button
                key={type}
                type="button"
                onClick={() => setSearchType(type)}
                className={`text-xs font-light transition-all duration-300 transform hover:scale-105 ${
                  searchType === type
                    ? "text-white border-b border-white"
                    : "text-white/40 hover:text-white/60"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {searchTypeLabels[type].toLowerCase()}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
