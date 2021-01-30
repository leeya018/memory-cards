import React , {createContext ,useReducer } from 'react'
import gameReducer from "../reducers/gameReducer";
import { createCards } from "../util";
import { COLOR_MODE } from "../actions/";

export const GameContext = createContext()

export const GameProvider = (props) => {

    const [game, dispatch] = useReducer(gameReducer, {
        cards: createCards(1),
        opens: [],
        level: 1,
        timer:0,
        mode:COLOR_MODE
      });
    return ( 
        <GameContext.Provider value={{game,dispatch}}>
            {props.children}
        </GameContext.Provider>
     );
}
 