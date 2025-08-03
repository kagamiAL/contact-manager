"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
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
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          />
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => setShowFilters(!showFilters)}
          className="px-3"
        >
          <Filter className="h-4 w-4" />
        </Button>

        <Button type="submit" disabled={!query.trim() || isLoading}>
          Search
        </Button>

        {query && (
          <Button type="button" variant="ghost" onClick={handleClear}>
            Clear
          </Button>
        )}
      </form>

      {showFilters && (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h4 className="text-sm font-medium text-white mb-3">Search by:</h4>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(searchTypeLabels) as SearchType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSearchType(type)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  searchType === type
                    ? "bg-white text-black"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                }`}
              >
                {searchTypeLabels[type]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
