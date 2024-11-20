import { LogedUser } from '../../cmps/LogedUser'
import { utilService } from '../../services/util.service'

export const SET_USER = 'SET_USER'

// const utilService.loadFromStorage('loggeduser')
const logeduser = utilService.loadFromStorage('loggeduser') || []
console.log('logeduser:', logeduser)

const initialState = {
    logedUser: logeduser,
    isLoggedin: logeduser && !logeduser.length ? true : false
}


console.log('initialState:', initialState)
export function logedUserReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
        console.log('action.logedUser:', action.logedUser)
            return { ...state, logedUser: action.logedUser, isLoggedin: true }
        default:
            return state
    }
}
