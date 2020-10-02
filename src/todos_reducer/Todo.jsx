import React from 'react'
import { ACTIONS } from "./App"

export default function Todo({ todo, dispatch }) {
    // we are passing the dispatch and now we can do what ever action we want 
    // the payload is amazing because we can pass what ever params we want so in the reducer we always know how to hanlde the stufff 
    // now that I know how to use the useReducer , I need to make a really big app that can help me with all the things I need to do 
    // 
    return (
        <div>
            <input type="checkbox" name="" id="" onChange={() => dispatch({ type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })} />
            <span style={{ color: todo.completed ? "green" : "black" }} > {todo.name}</span>
            <button onClick={() => dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: todo.id } })}>remove</button>
        </div >
    )
}
