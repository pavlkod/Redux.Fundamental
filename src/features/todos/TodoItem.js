import React, { memo } from 'react'

import { ReactComponent as TimesSolid } from './times-solid.svg'

import { availableColors, capitalize } from '../filters/colors'
import { useDispatch, useSelector } from 'react-redux'
import { toggle_todo } from './actions'

const selectTodoById = (state, todoId) => {
  return state.todos.find((todo) => todo.id === todoId)
}

const TodoListItem = ({ todoId }) => {
  const todo = useSelector((state) => selectTodoById(state, todoId))
  const { text, completed, color } = todo
  const dispatch = useDispatch()

  const handleCompletedChanged = (e) => {
    dispatch(toggle_todo(todoId))
  }

  const handleColorChanged = (e) => {
    // onColorChange(e.target.value)
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
          <button className="destroy">
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
