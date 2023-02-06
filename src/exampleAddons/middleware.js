import { ADD_TODO } from 'constants'

export const print1 = (storeAPI) => (next) => (action) => {
  console.log('1')
  return next(action)
}

export const print2 = (storeAPI) => (next) => (action) => {
  return next(action)
}

export const print3 = (storeAPI) => (next) => (action) => {
  console.log('3')
  return next(action)
}

export const addTodosWithDelay = (storeAPI) => (next) => (action) => {
  console.log(action)
  if (action.type === ADD_TODO) {
    setTimeout(() => {
      next(action)
    }, 1_500)
    return
  }
  return next(action)
}
