import { useSelector } from 'react-redux'
import { Avatar } from './Avatar';
import { MinUserCard } from './MinUserCard';
import { Link } from 'react-router-dom';

export function MessengerSideBar() {
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    return (
    <div className="messenger-side-bar">
        <div className="profile">
            <div className="profile-header">
                <h1>{logedUser.username}</h1>
                <ArrowDown/>
                <Link to= {"../messenger/create-msg"}><ComposeMsg/></Link>
            </div>
            <div className='profile-pic'><Avatar picUrl = {logedUser.avatarPic}/></div>
            <div className="active-message-header">
                <h2>Messages</h2>
            </div>
            <ActiveMesagesList/>
        </div>
    </div>)
}


function ActiveMesagesList() {
    const {_id} = useSelector(storeState => storeState.logedUserModule.logedUser)
    const logedUser = useSelector(storeState => storeState.usersModule.users.find(user => user._id === _id))
    const actArr = [logedUser, logedUser, logedUser, logedUser, logedUser]

    console.log('actArr:', actArr)  

    return (
        <ul className="active-messages-list">
            {actArr.map((user) => {
                return  <li key={user._id}><MinUserCard user = {user} followButton = {false}
                type = {"both"}/></li>
            })}
        </ul>
    )

}


function ArrowDown() {
    return (
        <svg aria-label="Down chevron icon" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12">
            <title>Down chevron icon</title>
            <path d="M12 17.502a1 1 0 0 1-.707-.293l-9-9.004a1 1 0 0 1 1.414-1.414L12 15.087l8.293-8.296a1 1 0 0 1 1.414 1.414l-9 9.004a1 1 0 0 1-.707.293Z"></path>
        </svg>
    );
}

function ComposeMsg() {
    return (
        <svg aria-label="New message" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
            <title>New message</title>
            <path d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <path d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.848" x2="20.076" y1="3.924" y2="7.153"></line>
        </svg>
    );
}