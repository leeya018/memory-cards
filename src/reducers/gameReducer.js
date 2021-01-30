import { OPEN_CARD, UPDATE_GAME, UPDATE_LEVEL, UPDATE_TIMER,UPDATE_MODE } from "../actions";
import { shuffleCards, createCards } from "../util";

function gameReducer(state, action) {
  switch (action.type) {
    case OPEN_CARD:
      let newOpens = [...state.opens];
      let newCards = state.cards.map((card) => {
        if (card.id === action.id) {
          let newCard = { ...card, open: !card.open, lock: true };
          newOpens.push(newCard);

          return newCard;
        }
        let c = card;
        if (state.opens.length >= 1) {
          c = { ...card, tempLock: true };
        }
        return c;
      });
      return { ...state, cards: newCards, opens: newOpens };
    case UPDATE_GAME:
      return { ...state, cards: action.cards, opens: [] };
    case UPDATE_LEVEL:
      let cards = createCards(action.level);
      let shuffledCards = shuffleCards(cards);
      return {
        ...state,
        level: action.level,
        cards: shuffledCards,
        opens: [],
        timer: 0,
      };
    case UPDATE_TIMER:
      return {
        ...state,
        timer: action.timer,
      };
    case UPDATE_MODE:
      return {
        ...state,
        mode: action.mode,
        cards:action.cards
      };
    default:
      return state;
  }
}

export default gameReducer;
