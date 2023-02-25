import { client } from 'api/client'
import { StatusFilters } from 'features/filters/slice'
import { shallowEqual } from 'react-redux'
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit/'

const initialState = {
  status: 'idle',
  entities: {},
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos/')
  return response.todos
})

export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
  const response = await client.post('/fakeApi/todos/', { todo: { text } })
  return response.todo
})

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
        const { todoId, color } = action.payload
        state.entities[todoId].color = color
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
    todosAdded(state, action) {
      const entitites = {}
      action.payload.forEach((todo) => {
        entitites[todo.id] = todo
      })
      state.entities = entitites
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const entitites = {}
        action.payload.forEach((todo) => {
          entitites[todo.id] = todo
        })
        state.entities = entitites
        state.status = 'idle'
      })
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        const todo = action.payload
        state.entities[todo.id] = todo
      })
  },
})

export const {
  loading,
  todoAdded,
  todoToggled,
  todoRemoved,
  changeColor,
  todosAdded,
} = todosSlice.actions

export const todosReducer = todosSlice.reducer
/*
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
*/

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
  (todos) => Object.values(todos).map((todo) => todo.id),
  {
    memoizeOptions: {
      resultEqualityCheck: shallowEqual,
    },
  }
)
