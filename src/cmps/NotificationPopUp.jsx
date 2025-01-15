import { useEffect, useState, useRef } from 'react'
import { Notification } from './Notification'
import { useSelector } from 'react-redux'
import { readNotifications } from '../store/logedUser/loged.user.actions'

export function NotificationPopUp({ onClose }) {
    const [show, setShow] = useState('') // for slide effect
    const notifications = useSelector(storeState => storeState.logedUserModule.notifications)
    const popupRef = useRef(null)

    useEffect(() => {
        setShow('show')
        readNotifications()
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleClickOutside(event) {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            handleClose()

            console.log('clicked outside')
        }
    }
    function handleClose() {
        setShow('hide')
        setTimeout(() => {
            onClose(false)
        }, 100)
    }
    return (
        <div ref={popupRef} className={`notification-pop-up ${show}`}>
            <h3>Notifications</h3>
            <ul className="notification-pop-up-body">
                {notifications.map(notification => (
                    <Notification
                        key={notification._id}
                        byUser={notification.byUser}
                        about={notification.about}
                        body={notification.body}
                        createdAt={+notification.createdAt}
                        post={notification.post}
                        onClose={handleClose}
                    />
                ))}
            </ul>
        </div>
    )
}
