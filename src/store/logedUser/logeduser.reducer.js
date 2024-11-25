import { notificationService } from '../../services/notification.service'
import { socketService } from '../../services/socket.service'
import { utilService } from '../../services/util.service'

export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const NOTIFICATIONS_READ = 'NOTIFICATIONS_READ'
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'

// const utilService.loadFromStorage('loggeduser')
const logeduser = utilService.loadFromStorage('loggeduser') || {}
var notifications = [] 
if (Object.keys(logeduser).length !== 0){
    socketService.login(logeduser._id)
    notifications = await notificationService.query(logeduser._id) 
}


const initialState = {
    logedUser: logeduser,
    isLoggedin: Object.keys(logeduser).length !== 0 ? true : false,
    notifications: notifications,
    newNotification: notifications.some(notification => notification.isRead === false)
}


console.log('initialState:', initialState)
export function logedUserReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
        console.log('action.logedUser:', action.logedUser)
            return { ...state, logedUser: action.logedUser, isLoggedin: true, 
                notifications: action.notifications, newNotification: action.isNew}
        case LOGOUT:
                return { ...state, logedUser: {}, isLoggedin: false,
                 notifications: [], newNotification: false}
        case NOTIFICATIONS_READ:
            return { ...state, newNotification: false}
        case ADD_NOTIFICATION:
            return { ...state, newNotification: true, notifications: [action.notification, ...state.notifications]
            }
        default:
            return state
    }
}
