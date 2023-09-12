/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CharacterDetail from "./CharacterDetail";
import { Character } from "types/Character";

const character: Character = {
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
};

const fn = () => {};

describe("CharacterDetail", () => {
  it("renders a heading", () => {
    render(<CharacterDetail character={character} setOpenedCharacter={fn} />);

    const heading = screen.getByRole("heading", {
      name: /Character Detail/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("renders a status", () => {
    render(<CharacterDetail character={character} setOpenedCharacter={fn} />);

    const statusText = screen.getByTestId("status-detail-label");

    expect(statusText).toBeInTheDocument();

    const statusValue = screen.getByTestId("status-detail-value");
    expect(statusValue.textContent).toBe("Dead");
  });
});
