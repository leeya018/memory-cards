import React, { useContext, useState, useEffect } from "react";
import { OPEN_CARD, COLORS, PHOTO_MODE, COLOR_MODE } from "../actions/";
import { GameContext } from "../context/GameProvider";
import { BLACK_IMAGE } from "../util";

export default function Card({ card, dispatch }) {
  const { game } = useContext(GameContext);
  const [style, setStyle] = useState({});

  useEffect(() => {
    getStyle();
  }, [card]);
  function handleOnClick() {
    if (!card.lock && !card.tempLock) {
      dispatch({
        type: OPEN_CARD,
        id: card.id,
        lock: true,
      });
    }
  }

  function getColor() {
    if (card.open) return card.color;
    return COLORS.BLACK;
  }

  function getImage() {
    if (card.open) return card.color;
    return BLACK_IMAGE;
  }

  function getStyle() {
    if (game.mode === COLOR_MODE) {
      setStyle({ ...style, backgroundColor: getColor() });
    } else if (game.mode === PHOTO_MODE) {
      setStyle({
        style,
        backgroundImage: `url(${getImage()})`,
        backgroundSize: "cover",
      });
    } else {
      alert("THIS MODE IS NOT EXISTS");
    }
  }

  function handleOverCard() {
    if (!card.open) {
      setStyle({ ...style, transform: "translate(5px, -5px)" });
    }
  }

  function handleOutCard() {
    setStyle({ ...style, transform: "translate(0px, 0px)" });
  }
  return (
    <div
      className="card"
      onMouseOut={handleOutCard}
      onMouseOver={handleOverCard}
      onClick={handleOnClick}
      style={style}
    ></div>
  );
}
