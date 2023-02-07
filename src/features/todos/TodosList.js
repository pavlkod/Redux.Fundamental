import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from './slice'
import TodoItem from './TodoItem'

const selectTodoIds = (state) => state.todos.map((todo) => todo.id)

const TodosList = () => {
  const dispatch = useDispatch()
  const todoIds = useSelector(selectTodoIds, shallowEqual)

  useEffect(() => {
    dispatch(fetchTodos)
  }, [dispatch])
  // console.log(todoIds)
  // let renderedTodos
  const renderedTodos = todoIds.map((id) => {
    return <TodoItem key={id} todoId={id} />
  })
  return <ul className="todo-list">{renderedTodos}</ul>
}

export default TodosList
