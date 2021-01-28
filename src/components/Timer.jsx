import React from 'react'
import "./App.css"

export default function Timer({timer}) {

    function getTime() {
        let min = Math.floor(timer / 60)
        min = min < 10 ? '0' + min : min
        let sec = timer % 60
        sec = sec < 10 ? '0' + sec : sec
        return `${min}:${sec}`
    }
  
    return (
        <div className="timer">
            {`timer: ${getTime()}`}
        </div>
    )
}
