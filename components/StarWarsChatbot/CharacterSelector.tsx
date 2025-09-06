import React from "react";
import styles from "./StarWarsChatbot.module.css";

interface CharacterSelectorProps {
  currentCharacter: "yoda" | "c3po";
  onCharacterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  currentCharacter,
  onCharacterChange,
}) => {
  return (
    <div className={styles.characterSelector}>
      <label htmlFor="characterSelect">Consult with:</label>
      <select
        id="characterSelect"
        value={currentCharacter}
        onChange={onCharacterChange}
      >
        <option value="yoda">Master Yoda</option>
        <option value="c3po">C-3PO</option>
      </select>
    </div>
  );
};
