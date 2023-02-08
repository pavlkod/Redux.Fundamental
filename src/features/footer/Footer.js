import { statusChange } from 'features/filters/slice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ColorFilters from './ColorFilters'

import RemainingTodos from './RemainingTodos'
import StatusFilter from './StatusFilter'

const Footer = () => {
  const { colors, status } = useSelector((state) => state.filters)
  const dispatch = useDispatch()

  const onColorChange = (color, changeType) => {
    console.log('Color change: ', { color, changeType })
  }
  const onStatusChange = (status) => {
    console.log('Status change: ', status)
    dispatch(statusChange(status))
  }

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark All Completed</button>
        <button className="button">Clear Completed</button>
      </div>

      <RemainingTodos />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}

export default Footer
