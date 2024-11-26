import { MinUserCard } from './MinUserCard.jsx'
import { useSelector } from 'react-redux'
import { useEffectStopScroll } from '../customHooks/useEffectStopScroll'

export function ProfilesList({ user, type = '', likedUsersList = '', onClose }) {
    const allUsers = useSelector(storeState => storeState.usersModule.users)
    let fillteredUsers = []
    if (type === 'likes' && likedUsersList.length > 0) {
        fillteredUsers = allUsers.filter(u => likedUsersList.map(userId => userId === u._id).includes(true))
    } else if (type === 'followers' || type === 'following') {
        fillteredUsers = allUsers.filter(u => user[type].map(userId => userId === u._id).includes(true))
    }

    useEffectStopScroll()

    return (
        <div className="profiles-conteiner">
            <ul className="profiles-list">
                <div className="header">
                    <h1>{type}</h1>
                    <div className="close" onClick={() => onClose(false)}>
                        <CloseIcon />
                    </div>
                </div>
                {!(fillteredUsers.length === 0) &&
                    fillteredUsers.map(user => (
                        <div className="profile-row" key={user._id}>
                            <MinUserCard user={user}/>
                        </div>
                    ))}
            </ul>
        </div>
    )
}

const CloseIcon = () => (
    <svg
        aria-label="Close"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height="18"
        role="img"
        viewBox="0 0 24 24"
        width="18"
    >
        <title>Close</title>
        <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="21"
            x2="3"
            y1="3"
            y2="21"
        ></line>
        <line
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            x1="21"
            x2="3"
            y1="21"
            y2="3"
        ></line>
    </svg>
)
// function ProfilePreview({ user }) {
//     re
// }
