const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
  ],
  filters: {
    status: 'ALL',
    colors: [],
  },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
