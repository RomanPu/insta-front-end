import { Outlet } from 'react-router'
import { useLocation } from 'react-router-dom'
import { MessengerSideBar } from '../cmps/MessengerSideBar'

export function Messenger() {
    const location = useLocation()
    const isChatPage = location.pathname.includes('/messenger/chat')

    return (
        <div className="messenger-conteiner">
            <MessengerSideBar className={isChatPage ? 'hide-sidebar' : ''} />
            <Outlet />
        </div>
    )
}
