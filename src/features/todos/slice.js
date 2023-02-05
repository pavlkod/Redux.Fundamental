import { ADD_TODO, TOGGLE_TODO } from '../../constants'
import { nextId } from '../../utils'

const initialState = [
  { id: 0, text: 'Learn React', completed: true },
  { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
]

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return [
        ...state,
        { id: nextId(state), text: action.payload, completed: false },
      ]
    }
    case TOGGLE_TODO: {
      return state.todos.map((todo) => {
        const { id } = action.payload
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
    }
    default:
      return state
  }
}
