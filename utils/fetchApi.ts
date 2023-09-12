import { ApiResponse } from "types/ApiResponse";

const baseUrl = "https://rickandmortyapi.com/api/character";

const CACHE = new Map<string, ApiResponse>();

export const fetchApi = async (url: string) => {
  const result = CACHE.get(url);

  if (!result) {
    const response = await fetch(url);
    const data = await response.json();

    CACHE.set(url, data);
    return data;
  } else {
    return result;
  }
};
