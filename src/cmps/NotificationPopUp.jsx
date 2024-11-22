
import { useEffect, useState } from 'react'
import { Notification } from './Notification'
import { useSelector } from 'react-redux'


export function NotificationPopUp({onClose}) {
    const [show, setShow] = useState("")// for slide effect
    const loggedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
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
                <h3>Notifications</h3>
                <ul className="notification-pop-up-body">
                   <Notification byUser = {loggedUser} about = {"like"} body = {"your comment"}
                   createdAt={new Date()}/>
                </ul>
            </div>
        
    )
}