
import { useEffect, useState} from 'react'
import { Notification } from './Notification'
import { useSelector } from 'react-redux'
import { readNotifications } from '../store/logedUser/loged.user.actions'

export function NotificationPopUp({onClose}) {
    const [show, setShow] = useState("")// for slide effect
    const notifications = useSelector(storeState => storeState.logedUserModule.notifications)

    useEffect(() => {
        setShow("show")
        readNotifications()
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleClickOutside() {
        setTimeout(() => {
            onClose(false)
            setShow("hide")
        }, 300)

    }

    return (
            <div className={`notification-pop-up ${show}`}>
                <h3>Notifications</h3>
                <ul className="notification-pop-up-body">
                    {notifications.map(notification => { return <Notification byUser = {notification.byUser} 
                    about = {notification.about} body = {notification.body}
                   createdAt={+notification.createdAt} post = {notification.post}/>})}
                </ul>
            </div>
    )
}