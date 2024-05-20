import "@testing-library/jest-dom/";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Autocomplete from "../Autocomplete";
import { fetchSuggestions } from "../autocompleteHelper";

jest.mock("../autocompleteHelper");

describe("Autocomplete Component", () => {
  it("renders without crashing", () => {
    render(<Autocomplete />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("displays suggestions when typing", async () => {
    const user = userEvent.setup();

    const mockSuggestions = [
      { title: "TED Talk 1", author: "Author 1" },
      { title: "TED Talk 2", author: "Author 2" },
    ];

    render(<Autocomplete />);
    (fetchSuggestions as jest.Mock).mockImplementationOnce(
      (query, setSuggestions) => {
        setSuggestions(mockSuggestions);
        return Promise.resolve();
      }
    );

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "TED");

    await waitFor(() => {
      const items = screen.getAllByTestId(/suggestion-/);
      expect(items).toHaveLength(mockSuggestions.length);
    });
  });

  it("shows loading spinner when fetching suggestions", async () => {
    const user = userEvent.setup();

    render(<Autocomplete />);
    (fetchSuggestions as jest.Mock).mockImplementationOnce(
      (query, setSuggestions, setIsLoading) => {
        setIsLoading(true);
        return new Promise((resolve) => setTimeout(() => resolve([]), 1000));
      }
    );

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "TED");

    await waitFor(() => {
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });
  });

  it("hides loading spinner when suggestions are fetched", async () => {
    const user = userEvent.setup();

    const mockSuggestions = [
      { title: "TED Talk 1", author: "Author 1" },
      { title: "TED Talk 2", author: "Author 2" },
    ];

    render(<Autocomplete />);
    (fetchSuggestions as jest.Mock).mockImplementationOnce(
      (query, setSuggestions, setIsLoading) => {
        setSuggestions(mockSuggestions);
        setIsLoading(false);
        return Promise.resolve();
      }
    );

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "TED");

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });

  it("displays no suggestions when there are no matches", async () => {
    const user = userEvent.setup();

    render(<Autocomplete />);
    (fetchSuggestions as jest.Mock).mockImplementationOnce(
      (query, setSuggestions) => {
        setSuggestions([]);
        return Promise.resolve();
      }
    );

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "TED");

    await waitFor(() => {
      expect(screen.queryByTestId(/suggestion-/)).not.toBeInTheDocument();
    });
  });
});
