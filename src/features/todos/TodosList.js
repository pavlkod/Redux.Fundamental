import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTodos, selectTodoIds } from './slice'
import TodoListItem from './TodoItem'

const TodosList = () => {
  const dispatch = useDispatch()
  const todoIds = useSelector(selectTodoIds)
  const status = useSelector((state) => state.todos.status)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  if (status === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    )
  }

  const renderedTodos = todoIds.map((id) => (
    <TodoListItem key={id} todoId={id} />
  ))

  return <ul className="todo-list">{renderedTodos}</ul>
}

export default TodosList
