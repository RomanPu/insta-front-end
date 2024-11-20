import { SET_USER } from './logeduser.reducer'
import { store } from '../store'
import { utilService } from '../../services/util.service'

export function switchUser(user) {
    utilService.saveToStorage('loggeduser', user)
    store.dispatch({ type: SET_USER, logedUser: user })
}
//TODO: implement logout
// export function logout() {
//     store.dispatch({ type: SET_USER, logedUser: [] })
// }

export function isLoged() {
    return store.getState().logedUserModule.logedUser.isLoged
}
