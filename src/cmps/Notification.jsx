import { Avatar } from './Avatar'
import { Link } from 'react-router-dom'
import { utilService } from '../services/util.service'



export function Notification( {about,  body, createdAt, post, byUser} ) {
    return (
        Deteils({byUser,about,  body, createdAt, post})
    )
}

function Deteils({byUser,about,  body, createdAt, post}) {
    const timeStr =utilService.createPostTimeFormat(createdAt)
    return (
        <li className = {"notification-entry"}key={byUser._id}>
            <div className="notification-deteils">
                <div className="avatar">
                    <Avatar picUrl={byUser.avatarPic} />
                </div>
                <div className="content">
                    <p>
                        <Link to={`../profile/${byUser._id}`}>{byUser.username} </Link>
                        <span>{about}</span>
                        <span>{body}</span>
                        <span className='createdAt'>{timeStr}</span>
                    </p>
                </div>
            </div>
            {post && <Link to = {`../post/${post.postId}`}><img src = {post.picUrl} /></Link>}
        </li>
    )
}