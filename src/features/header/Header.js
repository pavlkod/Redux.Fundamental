import { addTodo } from 'features/todos/slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()

  const [text, setText] = useState('')

  const handleChange = (e) => setText(e.target.value)

  const addTodoHandler = (e) => {
    e.preventDefault()
    if (text.trim()) {
      setText('')
      dispatch(addTodo(text))
    }
  }

  return (
    <header className="header">
      <form style={{ flex: 1 }} onSubmit={addTodoHandler}>
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
