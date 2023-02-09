import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, selectTodoIds } from './slice'
import TodoItem from './TodoItem'

const TodosList = () => {
  const dispatch = useDispatch()
  const todoIds = useSelector(selectTodoIds)

  useEffect(() => {
    dispatch(fetchTodos)
  }, [dispatch])

  const renderedTodos = todoIds.map((id) => <TodoItem key={id} todoId={id} />)

  return <ul className="todo-list">{renderedTodos}</ul>
}

export default TodosList
