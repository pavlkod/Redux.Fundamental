import { client } from 'api/client'
import { CHANGE_COLOR_TODO } from 'constants'
import { REMOVE_TODO } from 'constants'
import { LOADING_TODO } from 'constants'
import { REMOVE_COMPLETED_TODO } from 'constants'
import { COMPLETE_ALL_TODO } from 'constants'
import { ADD_TODO, FETCH_TODOS, TOGGLE_TODO } from 'constants'
import { StatusFilters } from 'features/filters/slice'
import { shallowEqual } from 'react-redux'
import { createSelector, createSlice } from '@reduxjs/toolkit/'
// import { add_todo, fetch_todos, loading } from './actions'

const initialState = {
  status: 'idle',
  entities: {},
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loading(state) {
      state.status = 'loading'
    },
    todoAdded(state, action) {
      const todo = action.payload
      state.entities[todo.id] = todo
    },
    todoToggled(state, action) {
      const todoId = action.payload
      const todo = state.entities[todoId]
      todo.completed = !todo.completed
    },
    changeColor: {
      reducer(state, action) {
        const { id, color } = action.payload
        state.entities[id].color = color
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color },
        }
      },
    },
    todoRemoved(state, action) {
      delete state.entities[action.payload]
    },
    async fetchTodos(state, action) {},
  },
})

export const { loading, todoAdded, todoToggled } = todosSlice.actions

export const todosReducer = todosSlice.reducer
/*
  switch (action.type) {
    case LOADING_TODO: {
    }
    case ADD_TODO: {
      const todo = action.payload
      return { ...state, entities: { ...state.entities, [todo.id]: todo } }
    }
    case TOGGLE_TODO: {
      const todoId = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            completed: !todo.completed,
          },
        },
      }
    }
    case CHANGE_COLOR_TODO: {
      const { id, color } = action.payload
      const todo = state.entities[id]
      return {
        ...state,
        entities: {
          ...state.entities,
          [id]: {
            ...todo,
            color,
          },
        },
      }
    }
    case FETCH_TODOS: {
      return {
        ...state,
        status: 'idle',
        entities: { ...state.entities, ...action.payload },
      }
    }
    case REMOVE_TODO: {
      const todos = { ...state.entities }
      delete todos[action.payload]
      return {
        ...state,
        entities: todos,
      }
    }
    case COMPLETE_ALL_TODO: {
      const newState = { ...state.entities }
      Object.values(newState).forEach((todo) => {
        newState[todo.id] = {
          ...todo,
          completed: true,
        }
      })
      return { ...state, entities: newState }
    }
    case REMOVE_COMPLETED_TODO: {
      // const newState = { ...state.entities }
      const newState = Object.fromEntries(
        Object.entries(state.entities).filter(
          ([key, value]) => !value.completed
        )
      )
      return { ...state, entities: newState }
    }
    default:
      return state
  }
}
*/
/*
export const fetchTodos = async (dispatch) => {
  dispatch(loading())
  const response = await client.get('/fakeApi/todos/')
  dispatch(fetch_todos(response.todos))
}

export const addTodo = (text) => async (dispatch) => {
  const response = await client.post('/fakeApi/todos/', { todo: { text } })
  dispatch(add_todo(response.todo))
}

export const selectTodos = (state) => state.todos.entities

export const selectTodoById = (state, id) => selectTodos(state)[id]

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
    return Object.values(todos).filter((todo) => {
      const matchedByStatus = showAll || todo.completed === showCompleted
      const matchedByColor = colors.length === 0 || colors.includes(todo.color)

      return matchedByStatus && matchedByColor
    })
  }
)

export const selectTodoIds = createSelector(
  selectTodosByFilter,
  (todos) => Object.keys(todos),
  {
    memoizeOptions: {
      resultEqualityCheck: shallowEqual,
    },
  }
)
*/
