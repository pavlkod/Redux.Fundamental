import React from 'react'
import TodoItem from './TodoItem'

const TodosList = () => {
  const todos = []
  const renderedTodos = todos.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} />
  })
  return <ul className="todo-list">{renderedTodos}</ul>
}

export default TodosList
