import { TedTalk } from "./autocompleteTypes";

export const fetchSuggestions = async (query: string): Promise<TedTalk[]> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/autocomplete?q=${query}&limit=10`);
  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }
  return response.json();
};
