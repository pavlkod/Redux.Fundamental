import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { add_todo } from '../todos/actions'

const Header = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleChange = (e) => setText(e.target.value)
  const addTodo = (e) => {
    e.preventDefault()
    if (text.trim()) {
      setText('')
      dispatch(add_todo(text))
    }
  }

  return (
    <header className="header">
      <form style={{ flex: 1 }} onSubmit={addTodo}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={handleChange}
        />
      </form>
    </header>
  )
}

export default Header
