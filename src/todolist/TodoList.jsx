import React from 'react'
import Todo from "./Todo";
export default function TodoList({todos,toggeleTodo}) {
    return (
        <div>
            {
                todos.map(todo=><Todo key={todo.id}  todo={todo} toggeleTodo={toggeleTodo}/>)
            }
        </div>
    )
}
