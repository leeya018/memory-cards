import React, { useReducer, useRef } from 'react'
import Todo from "./Todo"
import { v4 as uuid } from "uuid"
// this useReducer is amazing - it makes the code way cleaner 
// really eady to track the code , and enable you to make way more code in less time with no comfusing 

// ALL MY REASONS FOR USING useReducer:
// it easy to track the code . 
/// the stracure make it more easy to build
// less errors
/// when therre is a bug , its really easy to track
// no need to pass lots of functions and callbacks and params to other comopnenets
// less code
// easy to read 
// more order

// we can export with default and also without  a default from the same file
// amazing 
export const ACTIONS = {
    ADD_TODO: "add-todo",
    TOGGLE_TODO: "toggle-todo",
    REMOVE_TODO:"remove-todo"
}

function reducer(todos, action) {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return [...todos, { id: uuid(), name: action.payload.name, completed: false }]
        case ACTIONS.TOGGLE_TODO:
            return todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: !todo.completed }
                }
                return todo
            })
            case ACTIONS.REMOVE_TODO:
                return todos.filter(todo=>todo.id !== action.payload.id)
        default:
            return todos


    }
}

export default function App() {
    const [todos, dispatch] = useReducer(reducer, [])
    const inputRef = useRef()
    function handleAddTodo() {
        const val = inputRef.current.value
        if (!val) return
        dispatch({ type: ACTIONS.ADD_TODO, payload: { name: val } })
        inputRef.current.value = null
    }
    console.log(todos)
    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={handleAddTodo}>add</button>
            {
                // we are passing only the dispach , and from the dispatch we can make which ever action that we want   
                todos.map(todo => <Todo key={todo.id} todo={todo} dispatch={dispatch} />)
            }
        </div>
    )
}
