import { STATUS_CHANGE } from '../../constants'

export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: 'all',
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

export const statusChange = (status) => {
  return {
    type: STATUS_CHANGE,
    payload: status,
  }
}
