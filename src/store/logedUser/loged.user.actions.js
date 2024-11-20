import { SET_USER, LOGOUT } from './logeduser.reducer'
import { store } from '../store'
import { utilService } from '../../services/util.service'

export function switchUser(user) {
    utilService.saveToStorage('loggeduser', user)
    store.dispatch({ type: SET_USER, logedUser: user })
}
export function logout() {
    store.dispatch({ type: LOGOUT})
    utilService.saveToStorage('loggeduser', {})
}

export function isLoged() {
    return store.getState().logedUserModule.logedUser.isLoged
}
