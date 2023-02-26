import { colorChange, statusChange } from 'features/filters/slice'
import { mark_completed, remove_completed } from 'features/todos/actions'
import { markAllCompleted } from 'features/todos/slice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ColorFilters from './ColorFilters'

import RemainingTodos from './RemainingTodos'
import StatusFilter from './StatusFilter'

const Footer = () => {
  const dispatch = useDispatch()
  const { colors, status } = useSelector((state) => state.filters)

  const onColorChange = (color, changeType) => {
    dispatch(colorChange(color, changeType))
  }
  const onStatusChange = (status) => {
    dispatch(statusChange(status))
  }
  const setAllCompletedTodos = () => {
    dispatch(markAllCompleted())
  }
  const removeCompletedTodos = () => {
    dispatch(remove_completed())
  }

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={setAllCompletedTodos}>
          Mark All Completed
        </button>
        <button className="button" onClick={removeCompletedTodos}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}

export default Footer
