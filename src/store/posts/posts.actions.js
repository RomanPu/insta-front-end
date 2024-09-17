import { ADD_POST } from "./posts.reducer"
import { store } from '../store'

export function addPost(newPost) {
    store.dispatch({type: ADD_POST,post: newPost})  
}