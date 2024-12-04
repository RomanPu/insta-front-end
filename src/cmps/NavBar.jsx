import { useEffect } from 'react'
import { useState } from 'react'
import { NavBarAction } from './NavBarAction'
import {
    HomeIcon,
    SearchIcon,
    ExploreIcon,
    ReelsIcon,
    MessengerIcon,
    NotificationsIcon,
    NewPostIcon,
    SettingsIcon
} from '../assets/imgs/NavBarSvgs'
import { Avatar } from './Avatar'
import { useSelector } from 'react-redux'
import poster from '../assets/imgs/Sticker.png'
import { useLocation } from 'react-router'
import { NotificationPopUp } from './NotificationPopUp'
import { SearchPopUp } from './SearchPopUp'
import { socketService} from '../services/socket.service'
import { addNotification } from '../store/logedUser/loged.user.actions'
import { editPostLocal } from '../store/posts/posts.actions'

export function NavBar() {
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const location = useLocation()
    const [corrPage, setCorrPage] = useState('home')
    const newNotification = useSelector(storeState => storeState.logedUserModule.newNotification)
    const [activateNotificationPopUp, setActivateNotificationPopUp] = useState(false)
    const [activateSearchPopUp, setActivateSearchPopUp] = useState(false)
    const pageNameArr = ['search', 'explore', 'reels', 'messenger', 'notifications', 'create', `profile`, 'more']

    useEffect(() => {
        socketService.on('notification', (notificationId) => {
            addNotification(notificationId)
            editPostLocal(notificationId.post.postId)
        })
        return () => {
            socketService.logout()
        }
    },[])

    useEffect(() => {
        const page = pageNameArr.find(pageName => location.pathname.includes(pageName)) || 'home'
        setCorrPage(page)
    }, [location])

    return (
        <div className={!activateNotificationPopUp && !activateSearchPopUp && corrPage !== 'messenger' ? "nav-bar-container" : "nav-bar-container small"}>
            <ul className= {"nav-bar"}>
                <div key={'ins-logo'} className="insta-logo">
                    <img src={poster} alt="Instagram Logo" />
                </div>
                <li className={corrPage === 'home' ? 'bold' : ''} key={'home'}>
                    <NavBarAction name={'Home'} link={'/'} icon={<HomeIcon />} />
                </li>
                <li className={corrPage === 'search' ? 'bold' : ''} key={'search'}>
                    <NavBarAction name={'Search'} icon={<SearchIcon />}
                    actionFunc = {setActivateSearchPopUp} />
                </li>
                <li className={corrPage === 'explore' ? 'bold' : ''} key={'explore'}>
                    <NavBarAction name={'Explore'} icon={<ExploreIcon />} link={'/explore'} />
                </li>
                <li className={corrPage === 'reels' ? 'bold' : ''} key={'reels'}>
                    <NavBarAction name={'Reels'} icon={<ReelsIcon />} />
                </li>
                <li className={corrPage === 'messenger' ? 'bold' : ''} key={'messenger'}>
                   <NavBarAction name={'Messages'} icon={<MessengerIcon />} link={'./messenger/inbox'}/>
                </li>
                <li className={corrPage === 'notifications' ? 'bold' : ''} key={'notifications'}>
                    <NavBarAction name={'Notifications'} icon={<NotificationsIcon />}
                     actionFunc = {setActivateNotificationPopUp} notificationsIconOn = 
                     {newNotification}/>
                </li>
                <li className={corrPage === 'create' ? 'bold' : ''} key={'create'}>
                    <NavBarAction name={'Create'} icon={<NewPostIcon />} link={'/createpost'} />
                </li>
                <li className={corrPage === 'profile' ? 'bold' : ''} key={'profile'}>
                    <NavBarAction
                        name={'Profile'}
                        link={`/profile/${logedUser._id}`}
                        icon={<Avatar picUrl={logedUser.avatarPic} />}
                    />
                </li>
                <li className={corrPage === 'more' ? 'bold' : ''} key={'more'}>
                    <NavBarAction name={'More'} icon={<SettingsIcon />} />
                </li>
            </ul>
            {activateNotificationPopUp && <NotificationPopUp onClose={setActivateNotificationPopUp} />}
            {activateSearchPopUp && <SearchPopUp onClose={setActivateSearchPopUp} />}
        </div>
    )
}
