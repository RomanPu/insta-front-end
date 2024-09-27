import { SET_USERS, EDIT_USER , ADD_USER} from "./users.reducer"
import { store } from '../store'
import {  userService } from '../../services/user.service'



export function addUser(newPost) {
    store.dispatch({type: ADD_USER,post: newPost})  
}

export async function LoadUsers(newPosts) {
    try {
        console.log('newPosts:', newPosts)
        const savedPosts = await userService.saveAll(newPosts)
        store.dispatch({type: SET_USERS,posts: savedPosts})  
    } catch (error) {     
        console.log('failed to load posts:', error)
        throw error
    }
}

export async function setUsers(newUsers) {
    try {
        store.dispatch({type: SET_USERS, posts: newUsers})  
    } catch (error) {      
        console.log('failed to set posts:', error)
        throw error
    }
}

export async function editUser(post) {
    try {
            const savedUser = await userService.save(post)   
            console.log('edit', savedUser)
            store.dispatch({type: EDIT_USER, post: {...savedUser}})
                  
    } catch (error) {     
        console.log('failed to load posts:', error)
        throw error
    }
}