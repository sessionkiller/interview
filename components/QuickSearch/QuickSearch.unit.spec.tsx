/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import QuickSearch from "./QuickSearch";
import { Character } from "types/Character";

const characters: Character[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Dead",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Earth",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
    ],
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
  },
];

describe("CharactersList", () => {
  it("renders an input", () => {
    render(<QuickSearch />);

    const input = screen.getByPlaceholderText(/Search .../i);

    expect(input).toBeInTheDocument();
  });

  //   it("renders a character detail when clicking on a row", () => {
  //     render(<CharactersList characters={characters} />);

  //     const row = screen.getByTestId("character");

  //     fireEvent.click(row);

  //     const heading = screen.getByRole("heading", {
  //       name: /Character Detail/i,
  //     });

  //     expect(heading).toBeInTheDocument();
  //   });
});
