export const CHANGE_NAME = 'CHANGE_NAME'

const initialState = {
  _id :"r1",
  name : "romi"
}

export function logedUserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_NAME:
      return { ...state, name: action.name}
    default: return state
  }
}
