import React from "react";
import { Character } from "types/Character";
import styles from "./CharacterDetail.module.css";
import Image from "next/image";

type Props = {
  character: Character;
  setOpenedCharacter: (c: Character | null) => void;
};

function CharacterDetail({ character, setOpenedCharacter }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setOpenedCharacter(null)} className={styles.close}>
          X
        </span>
        <h1 className={styles.title}>Character Detail</h1>

        <div className={styles.content}>
          <div className={styles.item}>
            <label className={styles.label}>Image</label>
            <Image
              src={character.image}
              height={40}
              width={40}
              alt={character.name}
            />
          </div>

          <div className={styles.item}>
            <label className={styles.label}>Name</label>
            <span>{character.name}</span>
          </div>

          <div className={styles.item}>
            <label data-testid="status-detail-label" className={styles.label}>
              Status
            </label>
            <span data-testid="status-detail-value">{character.status}</span>
          </div>

          <div className={styles.item}>
            <label className={styles.label}>Species</label>
            <span>{character.species}</span>
          </div>

          <div className={styles.item}>
            <label className={styles.label}>Gender</label>
            <span>{character.gender}</span>
          </div>

          <div className={styles.item}>
            <label className={styles.label}>Origin</label>
            <span>{character.origin.name}</span>
          </div>

          <div className={styles.item}>
            <label className={styles.label}>Location</label>
            <span>{character.location.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
