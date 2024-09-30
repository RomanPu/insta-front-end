import { SET_USERS, EDIT_USER , ADD_USER} from "./users.reducer"
import { store } from '../store'
import {  userService } from '../../services/user.service'



export function addUser(newUser) {
    store.dispatch({type: ADD_USER,user: newUser})  
}

export async function LoadUsers(newusers) {
    try {
        const savedusers = await userService.saveAll(newusers)
        store.dispatch({type: SET_USERS,users: savedusers})  
    } catch (error) {     
        console.log('failed to load users:', error)
        throw error
    }
}

export async function setUsers(newUsers) {
    try {
        store.dispatch({type: SET_USERS, users: newUsers})  
    } catch (error) {      
        console.log('failed to set users:', error)
        throw error
    }
}

export async function editUser(user) {
    try {
            const savedUser = await userService.save(user)   
            console.log('edit', savedUser)
            store.dispatch({type: EDIT_USER, user: {...savedUser}})
                  
    } catch (error) {     
        console.log('failed to load users:', error)
        throw error
    }
}

export function getUserById(id) {
    return store.getState().usersModule.users.find(user => user._id === id)
}