import React, { useState, useReducer } from 'react'
import "./App.css"

// using those action are enable us to make the code more clean with less bugs
const ACTIONS={
    INCREMENT: "increase",
    DECREMENT: "decrease"
}

// this function is controlling the state changes
// to call that function I need to call dispach function and pass it an action as param
// reducer function is taling the type and see to what it need to change the state for
function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return { counter: state.counter + 1 }
        case ACTIONS.DECREMENT:
            return { counter: state.counter - 1 }
        default:
            return state

    }
}

export default function App() {
    // when using the reducer ,  we dont need to use useState
    // useReducer is gettgin the reducer function and initialStaate
    // initialState will allways be an Object
    // useReducer return state and dispatch
    const [state, dispatch] = useReducer(reducer, { counter: 0 })

    function increase() {
        //call dispatch function is ivoking the reducer functio and pass it the action Obj
        dispatch({ type: ACTIONS.INCREMENT })
    }

    function decrease() {
        dispatch({ type: ACTIONS.DECREMENT })
    }
    return (
        <div>
            <h1>counter</h1>
            <button onClick={decrease}>-</button>
            {state.counter}
            <button onClick={increase}>+</button>
        </div>
    )
}
