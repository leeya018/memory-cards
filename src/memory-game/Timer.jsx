import React, { useEffect, useState } from 'react'
import "./App.css"

export default function Timer() {

    function getTime() {
        let min = Math.floor(timer / 60)
        min = min < 10 ? '0' + min : min
        let sec = timer % 60
        sec = sec < 10 ? '0' + sec : sec
        return `${min}:${sec}`
    }
    const [timer, setTimer] = useState(5)
    useEffect(() => {
        let inter = setInterval(() => {
            setTimer(timer + 1)
        }, 1000)
        return () => clearInterval(inter)
    }, [timer])
    return (
        <div className="timer">
            {`timer: ${getTime()}`}
        </div>
    )
}
