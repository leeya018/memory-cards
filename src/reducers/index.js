import {OPEN_CARD,UPDATE_GAME,UPDATE_LEVEL } from "../actions"
import {dataCards } from "../util"
  
  function reducer(game, action) {
    switch (action.type) {
      case OPEN_CARD:
        let newOpens = [...game.opens];
        let newCards = game.cards.map((card) => {
          if (card.id === action.payload.id) {
            let newCard = { ...card, open: !card.open, lock: true };
            newOpens.push(newCard);
  
            return newCard;
          }
          let c = card;
          if (game.opens.length >= 1) {
            c = { ...card, tempLock: true };
          }
          return c;
        });
        return { ...game, cards: newCards, opens: newOpens };
      case UPDATE_GAME:
        return action.payload.game;
      case UPDATE_LEVEL:
        let shuffledCards = dataCards
          .slice(0, action.payload.level * 2)
          .sort(() => Math.random() - 0.5);
        return {
          ...game,
          level: action.payload.level,
          cards: shuffledCards,
          opens: [],
        };
      default:
        return game;
    }
  }

  export default reducer