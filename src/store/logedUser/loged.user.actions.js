import { SET_USER } from "./logeduser.reducer"
import { store } from '../store'

export function switchUser( user ){
  store.dispatch({type: SET_USER, logedUser: user})   
}
