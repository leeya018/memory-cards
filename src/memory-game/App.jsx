import React, { useEffect, useReducer } from 'react'
import "./App.css"
import { v4 as uuidv4 } from "uuid"
import Card from "./Card"

export const COLORS = { BLACK: "black" }
export const ACTIONS = {

    OPEN_CARD: "open-card",
    UPDATE_GAME: "update-game"
}

function isMatch(arr) {
    let [c1, c2] = arr
    return c1.color === c2.color
}



function reducer(game, action) {
    switch (action.type) {
        case ACTIONS.OPEN_CARD:
            let newOpens = [...game.opens]
            let newCards = game.cards.map(card => {
                if (card.id === action.payload.id) {
                    let newCard = { ...card, open: !card.open, lock: true }
                    newOpens.push(newCard)

                    return newCard
                }
                let c = card
                if (game.opens.length >= 1) {
                    c = { ...card, tempLock: true }
                }
                return c
            })
            return { cards: newCards, opens: newOpens }
        case ACTIONS.UPDATE_GAME:
            return action.payload.game
        default:
            return game
    }

}
export default function App() {
    const [game, dispatch] = useReducer(reducer, {
        cards: [
            { id: uuidv4(), open: false, color: "red", lock: false, tempLock: false },
            { id: uuidv4(), open: false, color: "red", lock: false, tempLock: false },
            { id: uuidv4(), open: false, color: "blue", lock: false, tempLock: false },
            { id: uuidv4(), open: false, color: "blue", lock: false, tempLock: false },
            { id: uuidv4(), open: false, color: "green", lock: false, tempLock: false },
            { id: uuidv4(), open: false, color: "green", lock: false, tempLock: false },
            { id: uuidv4(), open: false, color: "yellow", lock: false, tempLock: false },
            { id: uuidv4(), open: false, color: "yellow", lock: false, tempLock: false },
            // { id: uuidv4(), open: false, color: "purple", lock: false , tempLock:false},
            // { id: uuidv4(), open: false, color: "purple", lock: false ,tempLock:false}

        ],
        opens: []

    })

    function finishGame() {
        return game.cards.filter(card => card.open == false).length === 0
    }

    useEffect(() => {
        let newCards
        let tempOpens = game.opens
        let newGame = {}
        if (tempOpens.length === 2) {
            if (!isMatch(tempOpens)) {
                let [c1, c2] = tempOpens
                newCards = game.cards.map(card => {
                    if (c1.id === card.id || c2.id === card.id) {
                        return { ...card, open: false, lock: false, tempLock: false }
                    }
                    return { ...card, tempLock: false }
                })
                newGame.cards = newCards
                newGame.opens = []

                setTimeout(() => {
                    dispatch({ type: ACTIONS.UPDATE_GAME, payload: { game: newGame } })

                }, 1000)

            } else {
                if (finishGame()) {
                    alert("FINISH")
                }
                newCards = game.cards.map(card => { return { ...card, tempLock: false } })
                newGame.cards = newCards
                newGame.opens = []
                dispatch({ type: ACTIONS.UPDATE_GAME, payload: { game: newGame } })

            }

        }
    }, [game.opens])

    console.log(game)

    return (
        <div>
            <h1>best Memory game ever</h1>
            <div className="container">
                <div className="cards">

                    {game.cards.map(card => <Card key={card.id} card={card} dispatch={dispatch} />)}
                </div>
            </div>
        </div>
    )
}
