import { LogedUser} from "../../cmps/LogedUser"

export const SET_USER = 'SET_USER'

const initialState = {
  logedUser: {_id: '', name: 'Sasi', userName:'Kalabasy', avatarPic:""}
}

export function logedUserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return { ...state,  logedUser: action.logedUser}
    default: return state
  }
}
