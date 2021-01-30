import React, { useContext } from "react";
import { PHOTO_MODE, UPDATE_LEVEL } from "../actions";
import { GameContext } from "../context/GameProvider";
import { createCards, getPhotos, shuffleCards } from "../util";

export default function LevelForm() {
  const { game, dispatch } = useContext(GameContext);

  async function handleOption(e) {
    let level = parseInt(e.target.value);
    let cards;
    if (game.mode === PHOTO_MODE) {
      let urls = await getPhotos(game.category);
      cards = createCards(level, urls);
    } else {
        cards = createCards(level);
    }
    let shuffledCards = shuffleCards(cards);
    dispatch({ type: UPDATE_LEVEL, level, cards: shuffledCards });
  }

  function createOptions() {
    let arr = [];
    for (let i = 1; i < 10; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return arr;
  }
  return (
    <div className="level-form">
      <h4>choose your level:</h4>
      <select onChange={handleOption}>{createOptions()}</select>
    </div>
  );
}
