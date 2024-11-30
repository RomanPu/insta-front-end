import { Outlet } from 'react-router';
import { MessengerSideBar } from '../cmps/MessengerSideBar';

export function Messenger() {
    return <div className="messenger-conteiner">
        <MessengerSideBar/>
        <Outlet/>
    </div>
}
