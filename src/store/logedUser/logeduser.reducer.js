import { LogedUser } from '../../cmps/LogedUser'
import { utilService } from '../../services/util.service'

export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'

// const utilService.loadFromStorage('loggeduser')
const logeduser = utilService.loadFromStorage('loggeduser') || {}
console.log('logeduser:', logeduser)

const initialState = {
    logedUser: logeduser,
    isLoggedin: Object.keys(logeduser).length !== 0 ? true : false
}


console.log('initialState:', initialState)
export function logedUserReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
        console.log('action.logedUser:', action.logedUser)
            return { ...state, logedUser: action.logedUser, isLoggedin: true }
        case LOGOUT:
                return { ...state, logedUser: {}, isLoggedin: false}
        default:
            return state
    }
}
