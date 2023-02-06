import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import TodoItem from './TodoItem'

const selectTodoIds = (state) => state.todos.map((todo) => todo.id)

const TodosList = () => {
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  const renderedTodos = todoIds.map((id) => {
    return <TodoItem key={id} todoId={id} />
  })
  return <ul className="todo-list">{renderedTodos}</ul>
}

export default TodosList
