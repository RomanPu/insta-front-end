import { CHANGE_NAME } from "./logeduser.reducer"
import { store } from '../store'

export function changeName( neWname ){
  store.dispatch({type: CHANGE_NAME,name: neWname})   
}