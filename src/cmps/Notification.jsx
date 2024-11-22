import { Avatar } from './Avatar'
import { utilService } from '../services/util.service'



export function Notification( {type = 'profile',about,  body, createdAt, postId, byUser} ) {
    return (
        Deteils({byUser,about,  body, createdAt})
    )
}

function Deteils({byUser,about,  body, createdAt}) {
    const timeStr =utilService.createPostTimeFormat(createdAt)
    return (
        <li key={byUser._id}>
            <div className="notification-deteils">
                <div className="avatar">
                    <Avatar picUrl={byUser.avatarPic} />
                </div>
                <div className="content">
                    <p>
                        <span style={{ fontWeight: 600 }}>{byUser.username} </span>
                        <span>{about}</span>
                        <span>{body}</span>
                        <span>{timeStr}</span>
                    </p>
                </div>
            </div>
        </li>
    )
}