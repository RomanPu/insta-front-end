
import { useEffect } from 'react'


export function NotificationPopUp({onClose}) {

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleClickOutside = event => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            onClose()
        }
    }

    return (
            <div className="notification-pop-up">
                <div className="notification-pop-up-header">
                    <h3>Notifications</h3>
                    {/* <button onClick={() => setNotification(null)}>X</button> */}
                </div>
                <div className="notification-pop-up-body">
                    {/* {notification.map(notif => (
                        <div key={notif._id} className="notification-pop-up-item">
                            <Avatar size="small" user={notif.byUser} />
                            <p>
                                <span className="bold">{notif.byUser.username}</span> {notif.action} your post
                            </p>
                        </div>
                    ))} */}
                </div>
            </div>
        
    )
}