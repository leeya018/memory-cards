import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import Card from "./Card";
import Timer from "./Timer";
import LevelForm from "./LevelForm";
import { dataCards, storeScore, getGrid } from "../util";
import {UPDATE_GAME,BEST_SCORE,DELAY_TIME } from "../actions"
import reducer from "../reducers"
import {isMatch } from "../util"


export default function App() {
  const [timer, setTimer] = useState(0);
  const [game, dispatch] = useReducer(reducer, {
    cards: dataCards.slice(0, 2),
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

    let shuffledCards = game.cards.sort(() => Math.random() - 0.5);
    dispatch({
      type: UPDATE_GAME,
      payload: { game: { ...game, cards: shuffledCards } },
    });
  }, []);

  useEffect(() => {
    let newCards;
    let tempOpens = game.opens;
    let newGame = {};
    if (tempOpens.length === 2) {
      if (!isMatch(tempOpens)) {
        let [c1, c2] = tempOpens;
        newCards = game.cards.map((card) => {
          if (c1.id === card.id || c2.id === card.id) {
            return { ...card, open: false, lock: false, tempLock: false };
          }
          return { ...card, tempLock: false };
        });
        newGame = { ...game, cards: newCards, opens: [] };
        setTimeout(() => {
          dispatch({ type: UPDATE_GAME, payload: { game: newGame } });
        }, DELAY_TIME);
      } else {
        if (finishGame()) {
          let storedTimeObj = JSON.parse(localStorage.getItem(BEST_SCORE));

          let storedTimer = storedTimeObj[game.level];
          if (storedTimer > timer) {
            storedTimeObj[game.level] = timer;
            localStorage.setItem(BEST_SCORE, JSON.stringify(storedTimeObj));
            alert("A NEW RECORD TIMER");
          } else {
            alert("FINISH");
          }
          setTimer(0);
          let shuffledCards = dataCards
            .slice(0, game.level * 2)
            .sort(() => Math.random() - 0.5);
          dispatch({
            type: UPDATE_GAME,
            payload: { game: { ...game, opens: [], cards: shuffledCards } },
          });
        } else {
          newCards = game.cards.map((card) => {
            return { ...card, tempLock: false };
          });
          newGame = { ...game, cards: newCards, opens: [] };
          dispatch({ type: UPDATE_GAME, payload: { game: newGame } });
        }
      }
    }
  }, [game.opens]);


  function finishGame() {
    return game.cards.filter((card) => card.open == false).length === 0;
  }
  console.log(game);

  return (
    <div>
      <h1>best Memory game ever</h1>
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
