"use client";

import { useState } from "react";
import axios from "axios";

interface SearchResult {
  type: 'media' | 'catalog' | 'library';
  id: string;
  title: string;
  description?: string;
  url?: string;
}

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      setResults(response.data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounced search
    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'media': return '📁';
      case 'catalog': return '🛍️';
      case 'library': return '📚';
      default: return '📄';
    }
  };

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case 'media': return `/media`;
      case 'catalog': return `/catalog`;
      case 'library': return `/library`;
      default: return '#';
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search media, catalog, library..."
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <div className="absolute right-3 top-2.5">
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          ) : (
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <a
              key={`${result.type}-${result.id}`}
              href={getResultLink(result)}
              className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex items-start space-x-3">
                <span className="text-lg">{getResultIcon(result.type)}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {result.title}
                  </h4>
                  {result.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {result.description}
                    </p>
                  )}
                  <span className="text-xs text-blue-600 dark:text-blue-400 capitalize">
                    {result.type}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      {query && !loading && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
