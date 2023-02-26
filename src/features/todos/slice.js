import { client } from 'api/client'
import { StatusFilters } from 'features/filters/slice'
import { shallowEqual } from 'react-redux'
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit/'

const todosAdapter = createEntityAdapter()
const initialState = todosAdapter.getInitialState({
  status: 'idle',
})

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
    todoRemoved: todosAdapter.removeOne,
    markAllCompleted(state, action) {
      Object.values(state.entities).forEach((todo) => {
        todo.completed = true
      })
    },
    clearCompleted(state, action) {
      const entities = Object.values(state.entities)
        .filter((todo) => todo.completed)
        .map((todo) => todo.id)
      todosAdapter.removeMany(state, entities)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, action.payload)
        state.status = 'idle'
      })
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addTodo.fulfilled, todosAdapter.addOne)
  },
})

export const {
  todoToggled,
  todoRemoved,
  changeColor,
  markAllCompleted,
  clearCompleted,
} = todosSlice.actions

export const todosReducer = todosSlice.reducer

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
