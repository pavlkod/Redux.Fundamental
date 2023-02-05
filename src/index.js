import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import './api/server'

import store from './store'
import { ADD_TODO, STATUS_CHANGE, TOGGLE_TODO } from './constants'

const { getState, dispatch, subscribe } = store
console.log('Initial state: %O', getState())

const unsubscribe = subscribe(() => {
  console.log('State after dispatch: %O', getState())
})

const res = dispatch({ type: ADD_TODO, payload: 'text' })
console.log(res)
dispatch({ type: TOGGLE_TODO, payload: 1 })
dispatch({ type: STATUS_CHANGE, payload: 'Active' })
unsubscribe()

dispatch({ type: STATUS_CHANGE, payload: 'Active2' })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
