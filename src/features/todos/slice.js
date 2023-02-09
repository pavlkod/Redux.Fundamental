import { client } from 'api/client'
import { CHANGE_COLOR_TODO } from 'constants'
import { ADD_TODO, FETCH_TODOS, TOGGLE_TODO } from 'constants'
import { StatusFilters } from 'features/filters/slice'
import { shallowEqual } from 'react-redux'
import { createSelector } from 'reselect'
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
    case CHANGE_COLOR_TODO: {
      return state.map((todo) => {
        const { id, color } = action.payload
        if (todo.id === id) {
          return { ...todo, color }
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

export const selectTodos = (state) => state.todos

export const selectTodoById = (state, id) =>
  selectTodos(state).find((todo) => todo.id === id)

export const selectTodosByFilter = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const { status, colors } = filters
    const showAll = status === StatusFilters.All
    const showCompleted = status === StatusFilters.Completed

    if (showAll && colors.length === 0) {
      return todos
    }
    return todos.filter((todo) => {
      const matchedByStatus = showAll || todo.completed === showCompleted
      const matchedByColor = colors.length === 0 || colors.includes(todo.color)

      return matchedByStatus && matchedByColor
    })
  }
)

export const selectTodoIds = createSelector(
  selectTodosByFilter,
  (todos) => todos.map((todo) => todo.id),
  {
    memoizeOptions: {
      resultEqualityCheck: shallowEqual,
    },
  }
)
