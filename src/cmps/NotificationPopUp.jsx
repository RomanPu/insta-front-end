
import { useEffect, useState} from 'react'
import { Notification } from './Notification'
import { useSelector } from 'react-redux'


export function NotificationPopUp({onClose}) {
    const [show, setShow] = useState("")// for slide effect
    const loggedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const post = useSelector(storeState => storeState.postsModule.posts.find(post => post._id === "949Px"))
    console.log('post', post)
    useEffect(() => {
        setShow("show")
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
                   <Notification byUser = {loggedUser} about = {"like your comment lllll llllll llllll llllll"} body = {"ggggg"}
                   createdAt={new Date()} post = {post}/>
                </ul>
            </div>
    )
}