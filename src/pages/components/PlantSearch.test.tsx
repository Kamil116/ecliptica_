import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlantSearch, { PlantSearchProps } from "@/pages/components/PlantSearch";

describe("PlantSearch", () => {
    const setup = (props: Partial<PlantSearchProps> = {}) => {
        const defaultProps: PlantSearchProps = {
            query: "",
            onSearch: jest.fn(),
            placeholder: "Search plants...",
        };
        return render(<PlantSearch {...defaultProps} {...props} />);
    };

    test("renders the search input with correct placeholder", () => {
        setup({ placeholder: "Find your plant" });

        const inputElement = screen.getByPlaceholderText(/find your plant/i);
        expect(inputElement).toBeInTheDocument();
    });

    test("calls onSearch when typing in the input", () => {
        const mockOnSearch = jest.fn();
        setup({ query: "", onSearch: mockOnSearch });

        const inputElement = screen.getByPlaceholderText(/search plants.../i);
        fireEvent.change(inputElement, { target: { value: "Aloe" } });

        expect(mockOnSearch).toHaveBeenCalledTimes(1);
        expect(mockOnSearch).toHaveBeenCalledWith("Aloe");
    });

    test("displays the current search query", () => {
        setup({ query: "Fiddle Leaf Fig" });

        const inputElement = screen.getByDisplayValue(/fiddle leaf fig/i);
        expect(inputElement).toBeInTheDocument();
    });
});
