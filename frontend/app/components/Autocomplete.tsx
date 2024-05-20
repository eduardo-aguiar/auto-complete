"use client";
import React, { useState, useEffect, useCallback } from "react";
import { TedTalk } from "./autocompleteTypes";
import { fetchSuggestions } from "./autocompleteHelper";

const Autocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<TedTalk[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetchSuggestions = useCallback(
    (query: string) => fetchSuggestions(query, setSuggestions, setIsLoading),
    []
  );

  useEffect(() => {
    debouncedFetchSuggestions(query);
  }, [query, debouncedFetchSuggestions]);

  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
      <h1 className="text-center text-2xl font-bold mb-4">Tedtalks Search</h1>
      <div className="relative flex items-center border border-gray-300 rounded-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400 absolute left-3"
          data-testid="search-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          data-testid="search-input"
        />
        {isLoading && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            data-testid="loading-spinner"
          >
            <div className="loader"></div>
          </div>
        )}
      </div>
      {suggestions.length > 0 && (
        <ul
          className="list-none p-0 mt-2 border border-gray-300 rounded-md shadow-md bg-white"
          data-testid="suggestions-list"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 border-b last:border-0 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              data-testid={`suggestion-${index}`}
            >
              <div className="text-gray-800 font-semibold">
                {suggestion.title}
              </div>
              <div className="text-gray-600 text-sm">{suggestion.author}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
