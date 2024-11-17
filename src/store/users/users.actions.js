import { SET_USERS, EDIT_USER, ADD_USER } from './users.reducer'
import { store } from '../store'
import { userService } from '../../services/user.service'
import { switchUser } from '../logedUser/loged.user.actions'

export function addUser(newUser) {
    store.dispatch({ type: ADD_USER, user: newUser })
}

export async function LoadUsers() {
    try {
        const users = await userService.query()
        switchUser({
            _id: users[0]._id,
            name: users[0].name,
            username: users[0].username,
            avatarPic: users[0].avatarPic
        })
        console.log('LoadUsers', users)
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

export async function editUser(user) {
    try {
        console.log('editUser', user)
        const savedUser = await userService.save(user)
        console.log('savedUser', savedUser)
        store.dispatch({ type: EDIT_USER, user: { ...savedUser } })
    } catch (error) {
        throw error
    }
}

export function getUserById(id) {
    return store.getState().usersModule.users.find(user => user._id === id)
}
