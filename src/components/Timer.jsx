import React , {useContext } from 'react'
import "../index.css"
import {GameContext} from "../context/GameProvider"

export default function Timer() {
    const {game } = useContext(GameContext)
    function getTime() {
        let min = Math.floor(game.timer / 60)
        min = min < 10 ? '0' + min : min
        let sec = game.timer % 60
        sec = sec < 10 ? '0' + sec : sec
        return `${min}:${sec}`
    }
  
    return (
        <div className="timer">
            {`timer: ${getTime()}`}
        </div>
    )
}
