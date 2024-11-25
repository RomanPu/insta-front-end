import { SET_USERS, EDIT_USER, ADD_USER } from './users.reducer'
import { store } from '../store'
import { userService } from '../../services/user.service'
import { notificationService } from '../../services/notification.service'
import { utilService } from '../../services/util.service'

export function addUser(newUser) {
    store.dispatch({ type: ADD_USER, user: newUser })
}

export async function LoadUsers() {
    try {
        const users = await userService.query()
        store.dispatch({ type: SET_USERS, users: users })
    } catch (error) {
        throw error
    }
}

export async function setUsers(newUsers) {
    try {
        store.dispatch({ type: SET_USERS, users: newUsers })
    } catch (error) {
        throw error
    }
}

export async function editUser(user, type, forUser) {
    try {
        if(type){
            const about = "started following you"
            const {_id} = utilService.loadFromStorage('loggeduser') 
            notificationService.save({postId: "" , userId: _id, about:about,
                 body: "", createdAt: "", byUser: _id, forUser: forUser})
        }
        const savedUser = await userService.save(user)
        store.dispatch({ type: EDIT_USER, user: { ...savedUser } })
    } catch (error) {
        throw error
    }
}

export function getUserById(id) {
    return store.getState().usersModule.users.find(user => user._id === id)
}
