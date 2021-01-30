import React from "react";
import { OPEN_CARD, COLORS } from "../actions/";

export default function Card({ card, dispatch }) {
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

  return (
    <div className="card"
      onClick={handleOnClick}
      style={{ backgroundColor: getColor() }}
    ></div>
  );
}
