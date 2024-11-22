
import { useEffect, useState } from 'react'


export function NotificationPopUp({onClose}) {
    const [show, setShow] = useState("")// for slide effect
    useEffect(() => {
        setShow("show")
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleClickOutside(event){

        setShow("hide")
        //wait for animation to end
        setTimeout(() => {
            onClose(false)
        }, 300)
    }

    return (
            <div className={`notification-pop-up ${show}`}>
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