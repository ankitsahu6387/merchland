import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function HomeSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularSearches = [
    "PewDiePie",
    "MrBeast",
    "CarryMinati",
    "T-Shirts",
    "Hoodies",
    "Gaming",
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for celebrity merch, products, or creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-4 text-lg bg-gray-900/80 border-gray-600 text-white placeholder-gray-400 rounded-xl focus:border-red-500 focus:ring-red-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 px-6"
        >
          Search
        </Button>
      </form>

      {/* Popular Searches */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-3 text-gray-400">
          <TrendingUp className="h-4 w-4 mr-2" />
          <span className="text-sm">Popular searches:</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchQuery(term);
                navigate(`/search?q=${encodeURIComponent(term)}`);
              }}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-full text-sm transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
