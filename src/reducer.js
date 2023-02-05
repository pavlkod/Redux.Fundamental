import { ADD_TODO, STATUS_CHANGE, TOGGLE_TODO } from './constants'
import { nextId } from './utils'

const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
  ],
  filters: {
    status: 'ALL',
    colors: [],
  },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: nextId(state.todos), text: action.payload, completed: false },
        ],
      }
    }
    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          const { id } = action.payload
          if (todo.id === id) {
            return { ...todo, completed: !todo.completed }
          }
          return todo
        }),
      }
    }
    case STATUS_CHANGE: {
      return { ...state, filters: { ...state.filters, status: action.payload } }
    }
    default:
      return state
  }
}
