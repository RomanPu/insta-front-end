import { ADD_USER } from "./users.reducer"
import { store } from '../store'

export function addUser(newName) {
    store.dispatch({type: ADD_USER,name: newName})  
}