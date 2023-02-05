import todosReducer from './features/todos/slice'
import filtersReducer from './features/filters/slice'

export default function rootReducer(state = {}, action) {
  return {
    todos: todosReducer(state.todos, action),
    filters: filtersReducer(state.filters, action),
  }
}
