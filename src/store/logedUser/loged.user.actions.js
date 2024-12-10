import {
    SET_USER,
    EDIT_USER,
    LOGOUT,
    NOTIFICATIONS_READ,
    ADD_NOTIFICATION,
    EDIT_MSG,
    ADD_MSG,
    LOAD_MSGS,
    SET_CURRENT_MSG
} from './logeduser.reducer'
import { store } from '../store'
import { utilService } from '../../services/util.service'
import { notificationService } from '../../services/notification.service'
import { socketService } from '../../services/socket.service'
import { userService } from '../../services/user.service'
import { messegeService } from '../../services/messege.service'

export async function switchUser(user) {
    utilService.saveToStorage('loggeduser', user)
    socketService.login(user._id)
    const notifications = await notificationService.query(user._id)
    const isNew = notifications.some(notification => notification.isRead === false)
    const messages = await messegeService.query({ byUser: user._id })
    const unreadCnt = await messegeService.query({ byUser: user._id, isRead: true })
    store.dispatch({
        type: SET_USER,
        logedUser: user,
        notifications: notifications,
        isNew: isNew,
        messages: messages,
        unreadCnt: unreadCnt
    })
}

export function loadLoggedUser() {
    const logedUser = utilService.loadFromStorage('loggeduser')
    if (logedUser._id) {
        switchUser(logedUser)
        return logedUser
    }
}

export async function logout() {
    await userService.logout()
    store.dispatch({ type: LOGOUT })
    utilService.saveToStorage('loggeduser', {})
}

export function isLoged() {
    return store.getState().logedUserModule.logedUser.isLoged
}

export function readNotifications() {
    const state = store.getState()
    const notifications = state.logedUserModule.notifications
    notifications.forEach(notification => {
        notification.isRead = true
        notificationService.save(notification)
    })
    store.dispatch({ type: NOTIFICATIONS_READ })
    return notifications
}

export function addNotification(notification) {
    store.dispatch({ type: ADD_NOTIFICATION, notification })
}

export function editLogedUser(user) {
    utilService.saveToStorage('loggeduser', user)
    store.dispatch({ type: EDIT_USER, user })
}

export async function editMessage(chat, type = '') {
    const logedUser = store.getState().logedUserModule.logedUser
    chat.correspandents.push(logedUser)
    chat.isRead = chat.isRead.map(isRead => {
        if (isRead.id === logedUser._id) isRead.isRead = true
        else isRead.isRead = type === 'read' ? isRead.isRead : false
        // false for other users if added somthing new. if only read return same
        return isRead
    })

    console.log('chat:action', chat)

    await messegeService.save(chat)
    store.dispatch({ type: EDIT_MSG, msg: chat })
}

export function editMsgLocal(msg) {
    store.dispatch({ type: EDIT_MSG, msg: msg })
}

export async function addMessage(msg) {
    const addedMsg = await messegeService.save(msg)
    store.dispatch({ type: ADD_MSG, msg: addedMsg })
    return addedMsg._id
}

export async function addMsgLocal(msg) {
    store.dispatch({ type: ADD_MSG, msg: msg })
    return msg._id
}

export async function loadMsgs() {
    const logedUser = store.getState().logedUserModule.logedUser
    const msgs = await messegeService.query({ byUser: logedUser._id })
    store.dispatch({ type: LOAD_MSGS, msgs: msgs })
}

export function setCurrentMsg(msgId) {
    store.dispatch({ type: SET_CURRENT_MSG, msgId })
}

// export function incMsgCount() {
//     const state = store.getState()
//     const unreadCnt = state.logedUserModule.unreadCnt
//     store.dispatch({ type: INC_MSG_CNT})
// }
