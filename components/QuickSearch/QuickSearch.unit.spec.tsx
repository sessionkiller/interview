/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import {
  fireEvent,
  prettyDOM,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import QuickSearch from "./QuickSearch";

import { setupServer } from "msw/node";
import { DefaultBodyType, rest } from "msw";

import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../test-utils/createMockRouter";

const server = setupServer(
  rest.get("https://rickandmortyapi.com/api/character", (req, res, ctx) => {
    return res(
      ctx.json({
        info: {
          count: 1,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [
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
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("QuickSearch", () => {
  it("renders an empty input", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <QuickSearch />
      </RouterContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Search/i);

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("not display the clear button", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <QuickSearch />
      </RouterContext.Provider>
    );

    const span = screen.queryByText(/Clear/i);

    expect(span).not.toBeInTheDocument();
  });

  it("should display the clear button and fill the input", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <QuickSearch />
      </RouterContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(input, { target: { value: "Rick" } });
    const span = screen.queryByText(/Clear/i);

    expect(input).toHaveValue("Rick");
    expect(span).toBeInTheDocument();
  });

  it("should fill the input and diplay the clear button if the url contains a name", () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { name: "Rick" } })}
      >
        <QuickSearch />
      </RouterContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Search/i);
    const span = screen.queryByText(/Clear/i);

    expect(input).toHaveValue("Rick");
    expect(span).toBeInTheDocument();
  });

  it("should empty the input if clear button is clicked and call the push method of router", async () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <QuickSearch />
      </RouterContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(input, { target: { value: "Rick" } });

    const span = screen.getByText(/Clear/i);

    expect(span).toBeInTheDocument();

    fireEvent.click(span);

    expect(input).toHaveValue("");
    expect(span).not.toBeInTheDocument();
    expect(router.push).toHaveBeenCalled();
  });

  it("not display the suggestions ul", () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <QuickSearch />
      </RouterContext.Provider>
    );

    const ul = screen.queryByRole("list");

    expect(ul).not.toBeInTheDocument();
  });

  it("should display the suggestions ul when the input is filled", async () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <QuickSearch />
      </RouterContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(input, { target: { value: "Rick" } });

    await waitFor(() => {
      const ul = screen.getByRole("list");
      expect(ul).toBeInTheDocument();
    });
  });

  it("should display the suggestions ul when the input is filled with exact value 'Rick Sanchez'", async () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <QuickSearch />
      </RouterContext.Provider>
    );

    const input = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(input, { target: { value: "Rick Sanchez" } });

    await waitFor(async () => {
      const li = await screen.findByRole("listitem");

      expect(li).toHaveTextContent("Rick Sanchez");

      fireEvent.click(li);

      expect(router.push).toHaveBeenCalledWith({
        pathname: "/",
        query: { name: "Rick Sanchez" },
      });
    });
  });
});
