import { debounce } from "../utils/debounce";
import { TedTalk } from "./autocompleteTypes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchSuggestions = debounce(
  async (
    query: string,
    setSuggestions: React.Dispatch<React.SetStateAction<TedTalk[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (query.length > 0) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/autocomplete?q=${query}&limit=10`
        );
        const data: TedTalk[] = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  },
  300
);
