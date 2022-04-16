const initialState = {
  'good': 0,
  'ok': 0,
  'bad': 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return { ...state, 'good': state.good + 1 }
    case 'OK':
      return { ...state, 'ok': state.neutral + 1 }
    case 'BAD':
      return { ...state, 'bad': state.bad + 1 }
    case 'ZERO':
      return { 'good': 0, 'ok': 0, 'bad': 0 }
    default:
      return state
  }
}

export default reducer