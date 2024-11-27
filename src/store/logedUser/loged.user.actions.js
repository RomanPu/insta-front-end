import { SET_USER, LOGOUT, NOTIFICATIONS_READ, ADD_NOTIFICATION, EDIT_USER } from './logeduser.reducer'
import { store } from '../store'
import { utilService } from '../../services/util.service'
import { notificationService } from '../../services/notification.service'
import { socketService} from '../../services/socket.service'

export async function switchUser(user) {
    utilService.saveToStorage('loggeduser', user)
    socketService.login(user._id)
    const notifications = await notificationService.query(user._id)
    console.log('notifications: switch', notifications)
    const isNew = notifications.some(notification => notification.isRead === false)
    console.log('notifications:', isNew)
    store.dispatch({ type: SET_USER, logedUser: user, notifications: notifications,
         isNew: isNew} )
}
export function logout() {
    store.dispatch({ type: LOGOUT})
    utilService.saveToStorage('loggeduser', {})
}

export function isLoged() {
    return store.getState().logedUserModule.logedUser.isLoged
}

export function readNotifications() {
    console.log('readNotifications')
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