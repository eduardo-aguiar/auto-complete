import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "../utils/debounce";

const Autocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchSuggestions = useCallback(
    debounce((query: string) => {
      if (query.length > 0) {
        setIsLoading(true);
        fetch(`${API_URL}/autocomplete?q=${query}&limit=10`)
          .then((response) => response.json())
          .then((data) => {
            setSuggestions(data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          });
      } else {
        setSuggestions([]);
      }
    }, 300),
    [API_URL]
  );

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Autocomplete Component</h1>
      <div className="relative flex items-center border border-gray-300 rounded-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400 absolute left-3"
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
          className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="loader"></div>
          </div>
        )}
      </div>
      <ul className="list-none p-0 mt-2 border rounded-md">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="p-2 border-b last:border-0 hover:bg-gray-100"
          >
            {suggestion.title} - {suggestion.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
