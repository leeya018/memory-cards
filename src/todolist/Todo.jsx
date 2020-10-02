import React from 'react'

export default function Todo({ todo, toggeleTodo }) {

    function handleOnTodo() {
        toggeleTodo(todo.id)
    }
    return (
        <div>
            <label>
                {todo.name}
                {/* when using the checkbox, we need to use input elem with type ="checkbox" * , we also have to use the onChange */}
                <input type="checkbox" checked={todo.complete} onChange={handleOnTodo} />
            </label>
        </div>
    )
}
