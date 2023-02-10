import {
  ADD_TODO,
  CHANGE_COLOR_TODO,
  FETCH_TODOS,
  TOGGLE_TODO,
} from '../../constants'

export const add_todo = (text) => {
  return {
    type: ADD_TODO,
    payload: text,
  }
}
export const fetch_todos = (todos) => {
  return {
    type: FETCH_TODOS,
    payload: todos,
  }
}
export const toggle_todo = (id) => {
  return {
    type: TOGGLE_TODO,
    payload: id,
  }
}
export const change_color = (id, color) => {
  return {
    type: CHANGE_COLOR_TODO,
    payload: { id, color },
  }
}
