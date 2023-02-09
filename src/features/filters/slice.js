import { COLOR_CHANGE, STATUS_CHANGE } from '../../constants'

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
    case COLOR_CHANGE: {
      const { color, changeType } = action.payload
      const colors = state.colors.slice()
      if (changeType === 'added') {
        colors.push(color)
      } else {
        const index = colors.indexOf(color)
        colors.splice(index, 1)
      }
      return { ...state, colors: colors }
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
export const colorChange = (color, changeType) => {
  return {
    type: COLOR_CHANGE,
    payload: { color, changeType },
  }
}
