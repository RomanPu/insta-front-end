import { useSelector } from 'react-redux'

import { Avatar } from './Avatar'
import { Link } from 'react-router-dom'

export function LogedUser() {
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)

    return (
        <div className="logged-user">
            <Avatar picUrl={logedUser.avatarPic} />
            <div className="user-info">
                <h1>{logedUser.username}</h1>
                <p>{logedUser.username}</p>
            </div>
            <Link to="/login/pop-up">Switch</Link>
        </div>
    )
}
