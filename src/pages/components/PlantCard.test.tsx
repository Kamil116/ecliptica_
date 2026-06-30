import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlantCard from "@/pages/components/PlantCard";

describe("PlantCard", () => {
    const plantProps = {
        name: "Fiddle Leaf Fig",
        imageUrl: "https://opb-img.plantbook.io/ficus%20lyrata.jpg",
    };

    test("renders the plant name and image", () => {
        render(
            <PlantCard name={plantProps.name} imageUrl={plantProps.imageUrl} />,
        );

        const nameElement = screen.getByText(/fiddle leaf fig/i);
        const imageElement = screen.getByRole("img", {
            name: /fiddle leaf fig/i,
        });

        expect(nameElement).toBeInTheDocument();
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute("src", plantProps.imageUrl);
        expect(imageElement).toHaveAttribute("alt", plantProps.name);
    });

    test("applies correct hover styles", () => {
        render(
            <PlantCard name={plantProps.name} imageUrl={plantProps.imageUrl} />,
        );

        const cardElement = screen.getByRole("img").closest("div");
        expect(cardElement).toHaveStyle(
            `
            transition: transform 0.3s ease,box-shadow 0.3s ease
            `,
        );
    });
});
