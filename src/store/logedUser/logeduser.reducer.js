import { LogedUser} from "../../cmps/LogedUser"

export const SET_USER = 'SET_USER'

const entities = JSON.parse(localStorage.getItem('users')) || []

const initialState = {
  logedUser: entities[0]
}



export function logedUserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return { ...state,  logedUser: action.logedUser}
    default: return state
  }
}
