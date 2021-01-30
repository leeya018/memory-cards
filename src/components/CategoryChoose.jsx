import React, { useState, useContext } from "react";
import Select from "react-select";
import { createApi } from "unsplash-js";
import { UPDATE_MODE, PHOTO_MODE } from "../actions";

import { GameContext } from "../context/GameProvider";
import { createCards, getPhotos, shuffleCards } from "../util";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "famous", label: "famous" },
  { value: "sex", label: "sex" },
];
export default function CategoryChoose() {
  const { game, dispatch } = useContext(GameContext);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = async (selectedOption) => {
    setSelectedOption(selectedOption.value)
    let urls = await getPhotos(selectedOption.value);

    if (urls.length < game.level) {
      alert(
        "There are not enought photos for the stage , please choose level : " +
          urls.length
      );
    }
    let cards = createCards(game.level, urls);
    let shuffledCards = shuffleCards(cards);
    dispatch({
      type: UPDATE_MODE,
      mode: PHOTO_MODE,
      cards: shuffledCards,
      category: selectedOption.value,
    });
  };

  return (
    <>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </>
  );
}

