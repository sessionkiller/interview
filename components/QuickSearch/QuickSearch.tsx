import React, { useState } from "react";
import styles from "./QuickSearch.module.css";
import { fetchApi } from "../../utils/fetchApi";
import { ApiResponse } from "types/ApiResponse";
import { Character } from "types/Character";
import { useRouter } from "next/router";

type Props = {};

let _timer: any;

function QuickSearch({}: Props) {
  const router = useRouter();
  const [term, setTerm] = useState(router.query.name || "");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Character[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);

    if (_timer) clearTimeout(_timer);

    _timer = setTimeout(async () => {
      setSuggestions([]);

      if (term) {
        const { results }: ApiResponse = await fetchApi(
          `https://rickandmortyapi.com/api/character/?name=${term}`
        );

        setSuggestions(results);
        setOpen(true);
      } else {
        handleClick("");
      }
    }, 200);
  };

  const handleClick = (name: string) => {
    setTerm(name);
    setOpen(false);
    router.push({ pathname: "/", query: { name } });
  };

  const handleClear = () => {
    setTerm("");
    handleClick("");
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Search ..."
        type="text"
        value={term}
        onChange={handleChange}
      />

      {term ? (
        <span className={styles.clear} onClick={handleClear}>
          Clear
        </span>
      ) : null}

      {open ? (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleClick(suggestion.name)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default QuickSearch;
