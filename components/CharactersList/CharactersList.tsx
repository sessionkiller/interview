import React, { useState } from "react";
import { Character } from "types/Character";

import styles from "./CharactersList.module.css";
import Image from "next/image";
import CharacterDetail from "../CharacterDetail/CharacterDetail";

type Props = {
  characters: Character[];
};

function CharactersList({ characters }: Props) {
  const [openedCharacter, setOpenedCharacter] = useState<Character | null>(
    null
  );
  return (
    <>
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Id</th>
              <th className={styles.shortValue}>Name</th>
              <th>Status</th>
              <th className={styles.shortValue}>Species</th>
              <th className={styles.hideMobile}>Created</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character) => (
              <tr
                key={character.id}
                onClick={() => setOpenedCharacter(character)}
                data-testid="character"
              >
                <td>
                  <Image
                    src={character.image}
                    height={40}
                    width={40}
                    alt={character.name}
                  />
                </td>
                <td>{character.id}</td>
                <td className={styles.shortValue}>{character.name}</td>
                <td>{character.status}</td>
                <td className={styles.shortValue}>{character.species}</td>
                <td className={styles.hideMobile}>{character.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openedCharacter ? (
        <CharacterDetail
          character={openedCharacter}
          setOpenedCharacter={setOpenedCharacter}
        />
      ) : null}
    </>
  );
}

export default CharactersList;
