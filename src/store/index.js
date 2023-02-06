import { addTodosWithDelay } from 'exampleAddons/middleware'
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from 'redux'

import rootReducer from '../reducer'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(addTodosWithDelay),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
export default store
