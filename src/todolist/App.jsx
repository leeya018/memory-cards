import React, { useState, useRef, useEffect } from 'react';
import TodoList from "./TodoList"
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import "./App.css"

// with the webdev simplifies explenations it sims that your dont take all cahvgne at once 
// each time you sove different  problem inside
// pay attantion with the way and order things are workign 
const LOCAL_STORAGE_KEY = "todoapp.todos"
// when we are setting data to localStorage , we put it  as string 
// and when we take that out so we parse it 
export default function App() {
  const [todos, setTodos] = useState([{ id: uuidv4(), name: "fjaklfjda", complete: false }])
  const todoNameRef = useRef()

  // just one time when function is gettign loaded , we are loadiing the todos from the localStorage
  // so we call that only once 
  useEffect(() => {
    let storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)

  }, [])

  // useEffect sycle hook is makeing a changee each time there si a change in the last param 
  // each time todos is changing , we want to save that change to localStotage 
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggeleTodo(id) {
    let newTodos = [...todos]
    let todo = newTodos.find(todo => todo.id === id)
    // when we are changing the Object todo , we are changing the whole referance , so we are effecting the array
    todo.complete = !todo.complete // this code is for the other Todo component so it will know when the complete propery has changed
    todo.data = "new"
    setTodos(newTodos)
  }
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name == '') return // because we dont want an empty todo - so it  exite the function 
    setTodos(prevTodods => { // we send a calllback to the setTodos - really comofortable to use , and I can really easly understand this
      return [...prevTodods, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null // set it to empty when finish 
  }

  function handleClearTodo() {
    let newTodos = todos.filter(todo => todo.complete === false)
    setTodos(newTodos)
  }
  return (
    <>
      <h1>TDOO list app</h1>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>add</button>
      <button onClick={handleClearTodo}>clear completed</button>
      <div>{todos.filter(todo => todo.complete == false).length} </div>
      <TodoList todos={todos} toggeleTodo={toggeleTodo} />
    </>
  )
}
