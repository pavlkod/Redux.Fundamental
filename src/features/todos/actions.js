import {
  ADD_TODO,
  CHANGE_COLOR_TODO,
  COMPLETE_ALL_TODO,
  FETCH_TODOS,
  LOADING_TODO,
  REMOVE_COMPLETED_TODO,
  REMOVE_TODO,
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
export const remove_todo = (id) => {
  return {
    type: REMOVE_TODO,
    payload: id,
  }
}
export const change_color = (id, color) => {
  return {
    type: CHANGE_COLOR_TODO,
    payload: { id, color },
  }
}
export const loading = () => {
  return {
    type: LOADING_TODO,
  }
}
export const mark_completed = () => {
  return {
    type: COMPLETE_ALL_TODO,
  }
}
export const remove_completed = () => {
  return {
    type: REMOVE_COMPLETED_TODO,
  }
}
