import React, { useState, useEffect, useReducer } from "react";
import "../index.css";
import Card from "./Card";
import Timer from "./Timer";
import LevelForm from "./LevelForm";
import { createCards, storeScore, getGrid } from "../util";
import { UPDATE_GAME, BEST_SCORE, DELAY_TIME } from "../actions";
import reducer from "../reducers/gameReducer";
import CategoryChoose from "./CategoryChoose";
import { isMatch, shuffleCards } from "../util";

export default function App() {
  const [timer, setTimer] = useState(0);
  const [game, dispatch] = useReducer(reducer, {
    cards: createCards(1),
    opens: [],
    level: 1,
  });
  
  useEffect(() => {
    let inter = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);
    return () => clearInterval(inter);
  }, [timer]);

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
          setTimer(0);
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
    if (storedTimer > timer) {
      storedTimeObj[game.level] = timer;
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
    <div>
      <h1>best Memory game ever</h1>
      <CategoryChoose />
      <Timer timer={timer} />
      <LevelForm dispatch={dispatch} onHandleTimer={setTimer} />
      <div className="container">
        <div
          className="cards"
          style={{
            gridTemplateColumns: getGrid(game).cols,
            gridTemplateRows: getGrid(game).rows,
          }}
        >
          {game.cards.map((card) => (
            <Card key={card.id} card={card} dispatch={dispatch} />
          ))}
        </div>
      </div>
    </div>
  );
}
