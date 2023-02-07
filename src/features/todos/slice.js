import { client } from 'api/client'
import { ADD_TODO, FETCH_TODOS, TOGGLE_TODO } from 'constants'
import { add_todo, fetch_todos } from './actions'

const initialState = []

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return [...state, action.payload]
    }
    case TOGGLE_TODO: {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
    }
    case FETCH_TODOS: {
      return action.payload
    }
    default:
      return state
  }
}

export const fetchTodos = async (dispatch) => {
  const response = await client.get('/fakeApi/todos/')
  dispatch(fetch_todos(response.todos))
}

export const addTodo = (text) => async (dispatch) => {
  const response = await client.post('/fakeApi/todos/', { todo: { text } })
  dispatch(add_todo(response.todo))
}
