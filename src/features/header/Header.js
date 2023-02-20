// import { addTodo } from 'features/todos/slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState('idle')

  const [text, setText] = useState('')

  const handleChange = (e) => setText(e.target.value)

  const addTodoHandler = async (e) => {
    e.preventDefault()
    if (text.trim()) {
      setText('')
      setStatus('loading')
      // await dispatch(addTodo(text))
      setStatus('idle')
    }
  }
  const isLoading = status === 'loading'
  const loading = isLoading ? <div className="loader" /> : null
  return (
    <header className="header">
      <form style={{ flex: 1 }} onSubmit={addTodoHandler}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          autoFocus={true}
          onChange={handleChange}
        />
        {loading}
      </form>
    </header>
  )
}

export default Header
