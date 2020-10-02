import React, { useState, useEffect, useReducer } from 'react'
import "./App.css"
import { v4 as uuidv4 } from "uuid"
import Card from "./Card"
import Timer from "./Timer"
import LevelForm from "./LevelForm"


import { dataCards } from "./data"

let BEST_SCORE = 'highest-score'
const DELAY_TIME = 400
export const COLORS = { BLACK: "black" }
export const ACTIONS = {

    OPEN_CARD: "open-card",
    UPDATE_GAME: "update-game",
    UPDATE_LEVEL: "update-level"
}
// check a match between 2 cards
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
            return { ...game, cards: newCards, opens: newOpens }
        case ACTIONS.UPDATE_GAME:
            return action.payload.game
        case ACTIONS.UPDATE_LEVEL:
            let shuffledCards = dataCards.slice(0, action.payload.level * 2).sort(() => Math.random() - 0.5)
            return { ...game, level: action.payload.level, cards: shuffledCards, opens: [] }
        default:
            return game
    }

}
export default function App() {
    const [timer, setTimer] = useState(0)
    const [game, dispatch] = useReducer(reducer, {
        cards: dataCards.slice(0, 2),
        opens: [],
        level: 1

    })
    useEffect(() => {
        let inter = setInterval(() => {
            setTimer(timer + 1)
        }, 1000)
        return () => clearInterval(inter)
    }, [timer])

    function finishGame() {
        return game.cards.filter(card => card.open == false).length === 0
    }

    useEffect(() => {
        delete localStorage.getItem(BEST_SCORE)
        localStorage.setItem(BEST_SCORE, 100000)
        let shuffledCards = game.cards.sort(() => Math.random() - 0.5)
        dispatch({ type: ACTIONS.UPDATE_GAME, payload: { game: { ...game, cards: shuffledCards } } })
    }, [])

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
                newGame = { ...game, cards: newCards, opens: [] }
                setTimeout(() => {
                    dispatch({ type: ACTIONS.UPDATE_GAME, payload: { game: newGame } })

                }, DELAY_TIME)

            } else {
                if (finishGame()) {

                    if (parseInt(localStorage.getItem(BEST_SCORE)) > timer) {
                        localStorage.setItem(BEST_SCORE, timer)
                        alert("A NEW RECORD TIMER")
                    } else {
                        alert("FINISH")
                    }
                    setTimer(0)
                    let shuffledCards = dataCards.slice(0, game.level * 2).sort(() => Math.random() - 0.5)
                    dispatch({ type: ACTIONS.UPDATE_GAME, payload: { game: { ...game, opens: [], cards: shuffledCards } } })

                } else {
                    newCards = game.cards.map(card => { return { ...card, tempLock: false } })
                    newGame = { ...game, cards: newCards, opens: [] }
                    dispatch({ type: ACTIONS.UPDATE_GAME, payload: { game: newGame } })
                }

            }

        }
    }, [game.opens])

    console.log(game)

    return (
        <div>
            <h1>best Memory game ever</h1>
            <Timer timer={timer}  />
            <LevelForm dispatch={dispatch} onHandleTimer={setTimer} />
            <div className="container">
                <div className="cards">

                    {game.cards.map(card => <Card key={card.id} card={card} dispatch={dispatch} />)}
                </div>
            </div>
        </div>
    )
}
