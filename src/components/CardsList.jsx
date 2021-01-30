import React, { useContext, useEffect } from "react";
import { getGrid } from "../util";
import Card from "./Card";
import { createCards, storeScore } from "../util";
import { UPDATE_GAME, BEST_SCORE, DELAY_TIME, UPDATE_TIMER } from "../actions";
import { isMatch, shuffleCards } from "../util";
import { GameContext } from "../context/GameProvider";

const CardsList = () => {
  const { game, dispatch } = useContext(GameContext);
  useEffect(() => {
    let inter = setInterval(() => {
      dispatch({ type: UPDATE_TIMER, timer: game.timer + 1 });
    }, 1000);
    return () => clearInterval(inter);
  }, [game.timer]);

  useEffect(() => {
    if (localStorage.getItem(BEST_SCORE) == null) {
      localStorage.setItem(BEST_SCORE, JSON.stringify(storeScore));
    }

    let shuffledCards = shuffleCards(game.cards);
    dispatch({
      type: UPDATE_GAME,
      cards: shuffledCards,
    });
  }, []);

  useEffect(() => {
    let newCards;
    let tempOpens = game.opens;
    if (tempOpens.length === 2) {
      if (!isMatch(tempOpens)) {
        newCards = updateCards(game.cards, tempOpens);
        setTimeout(() => {
          dispatch({ type: UPDATE_GAME, cards: newCards });
        }, DELAY_TIME);
      } else {
        if (finishGame()) {
          updateTimeInLocalStorage();
          dispatch({ type: UPDATE_TIMER, timer: 0 });
          let cards = createCards(game.level);
          const shuffledCards = shuffleCards(cards);
          dispatch({
            type: UPDATE_GAME,
            cards: shuffledCards,
          });
        } else {
          newCards = game.cards.map((card) => {
            return { ...card, tempLock: false };
          });
          dispatch({ type: UPDATE_GAME, cards: newCards });
        }
      }
    }
  }, [game.opens]);

  function updateTimeInLocalStorage() {
    let storedTimeObj = JSON.parse(localStorage.getItem(BEST_SCORE));

    let storedTimer = storedTimeObj[game.level];
    if (storedTimer > game.timer) {
      storedTimeObj[game.level] = game.timer;
      localStorage.setItem(BEST_SCORE, JSON.stringify(storedTimeObj));
      alert("A NEW RECORD TIMER");
    } else {
      alert("FINISH");
    }
  }

  function updateCards(cards, tempOpens) {
    let [c1, c2] = tempOpens;
    return cards.map((card) => {
      if (c1.id === card.id || c2.id === card.id) {
        return { ...card, open: false, lock: false, tempLock: false };
      }
      return { ...card, tempLock: false };
    });
  }

  function finishGame() {
    return game.cards.filter((card) => card.open == false).length === 0;
  }
  return (
    <div
      className="cards"
      style={{
        gridTemplateColumns: getGrid(game.level).cols,
        gridTemplateRows: getGrid(game.level).rows,
      }}
    >
      {game.cards.map((card) => (
        <Card key={card.id} card={card} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default CardsList;
