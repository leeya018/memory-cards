import React from 'react'
import { ACTIONS } from "./App"
import { COLORS } from "./App"


export default function Card({ card, dispatch }) {

    function handleOnClick() {
        if (!card.lock && !card.tempLock) {
            dispatch({ type: ACTIONS.OPEN_CARD, payload: { id: card.id, lock: true } })
        }
    }

    function getColor() {
        if (card.open) return card.color
        return COLORS.BLACK
    }

    return (
        <div onClick={handleOnClick}
            className="card"
            style={{ backgroundColor: getColor() }}></div>
    )
}
