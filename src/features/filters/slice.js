import { STATUS_CHANGE } from '../../constants'

const initialState = {
  status: 'ALL',
  colors: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case STATUS_CHANGE: {
      return { ...state, status: action.payload }
    }
    default:
      return state
  }
}
