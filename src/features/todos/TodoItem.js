import React from 'react'

import { ReactComponent as TimesSolid } from './times-solid.svg'

import { availableColors, capitalize } from '../filters/colors'
import { useDispatch, useSelector } from 'react-redux'
import { change_color, remove_todo, toggle_todo } from './actions'
import { selectTodoById, todoToggled } from './slice'

const TodoListItem = ({ todoId }) => {
  const dispatch = useDispatch()
  const todo = useSelector((state) => selectTodoById(state, todoId))
  const { text, completed, color } = todo

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todoId))
  }

  const handleColorChanged = (e) => {
    dispatch(change_color(todoId, e.target.value))
  }

  const removeTodo = (e) => {
    dispatch(remove_todo(todoId))
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">
            {text}
            {Date.now()}
          </div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={removeTodo}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
