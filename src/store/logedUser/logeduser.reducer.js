import { Message } from '@mui/icons-material'
import { notificationService } from '../../services/notification.service'
import { socketService } from '../../services/socket.service'
import { utilService } from '../../services/util.service'
import { messegeService } from '../../services/messege.service'

export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const NOTIFICATIONS_READ = 'NOTIFICATIONS_READ'
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION'
export const EDIT_USER = 'EDIT_USER'
export const EDIT_MSG = 'EDIT_MSG'
export const ADD_MSG = 'ADD_MSG'
export const LOAD_MSGS = 'LOAD_MSGS'
export const SET_CURRENT_MSG = 'SET_CURRENT_MSG'

// const utilService.loadFromStorage('loggeduser')
// const logeduser = utilService.loadFromStorage('loggeduser') || {}
// var notifications = [] 
// var messages = []
// var unreadCnt = 0

// if (Object.keys(logeduser).length !== 0){
//     socketService.login(logeduser._id)
//     notifications = await notificationService.query(logeduser._id)
//     messages = await messegeService.query({byUser: logeduser._id})
//     unreadCnt = await messegeService.query({byUser: logeduser._id, isRead: true})
// }


const initialState = {
    logedUser: {},
    isLoggedin: false,
    notifications: [],
    newNotification: false,
    messages: [],
    currentMsgId: '',
    unreadCnt: 0
}


export function logedUserReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, logedUser: action.logedUser, isLoggedin: true, 
                notifications: action.notifications, newNotification: action.isNew,
                messages: action.messages, unreadCnt: action.unreadCnt}
        case EDIT_USER:
            return { ...state, logedUser: action.user}
        case LOGOUT:
                return { ...state, logedUser: {}, isLoggedin: false,
                 notifications: [], newNotification: false}
        case NOTIFICATIONS_READ:
            return { ...state, newNotification: false}
        case ADD_NOTIFICATION:
            return { ...state, newNotification: true, notifications: [action.notification, ...state.notifications]
            }
        case EDIT_MSG:
            return { ...state, messages: state.messages.map( msg => msg._id === action.msg._id ?  action.msg: msg)
            , unreadCnt: countUnread([action.msg], state.logedUser)
            }
        case ADD_MSG:
            return { ...state, messages:  [...state.messages, action.msg], unreadCnt: countUnread([action.msg], state.logedUser)}
        case LOAD_MSGS:
            return { ...state, messages: [...action.msgs], unreadCnt: countUnread(action.msgs, state.logedUser)}
        case SET_CURRENT_MSG:
            return { ...state, currentMsgId: action.msgId}
        default:
            return state
    }
}

function countUnread(messages, user) {
    return messages.filter(msg => msg.isRead.some(isRead =>
         isRead.id === user._id  && isRead.isRead === false )).length
}
