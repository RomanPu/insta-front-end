import { Avatar } from './Avatar'
import { Link } from 'react-router-dom'
import { utilService } from '../services/util.service'
import { useState } from 'react'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { useSelector } from 'react-redux'
import { editUser } from '../store/users/users.actions'

export function Notification({ about, body, createdAt, post, byUser, onClose }) {
    return Deteils({ byUser, about, body, createdAt, post, onClose })
}

function Deteils({ byUser, about, body, createdAt, post, onClose }) {
    const timeStr = utilService.createPostTimeFormat(createdAt)
    const { _id } = useSelector(storeState => storeState.logedUserModule.logedUser)
    const loggedUser = useSelector(storeState => storeState.usersModule.users.find(user => user._id === _id))
    const author = useSelector(storeState => storeState.usersModule.users.find(u => u._id === byUser._id))
    const [isFollowed, setIsFollowed] = useState(
        loggedUser.following.map(follow => follow === author._id).includes(true)
    )

    useEffectUpdate(() => {
        if (isFollowed && !loggedUser.following.map(like => like === byUser._id).includes(true)) {
            onFolow()
        } else {
            editUser({
                ...loggedUser,
                following: loggedUser.following.filter(follow => follow !== author._id)
            })
        }
    }, [isFollowed])

    async function onFolow() {
        await editUser({ ...author, followers: [...author.followers, _id] })
        await editUser({ ...loggedUser, following: [...loggedUser.following, author._id] }, 'follow', author._id)
    }

    function onChangeFollow(ev) {
        ev.stopPropagation()
        setIsFollowed(prev => !prev)
    }

    return (
        <li className={'notification-entry'} key={byUser._id}>
            <div className="notification-deteils">
                <div className="avatar">
                    <Avatar picUrl={byUser.avatarPic} />
                </div>
                <div className="content">
                    <p>
                        <Link to={`../profile/${byUser._id}`} onClick={onClose}>
                            {byUser.username}{' '}
                        </Link>
                        <span>{about}</span>
                        <span>{body}</span>
                        <span className="createdAt">{timeStr}</span>
                    </p>
                </div>
            </div>
            {Object.keys(post).length !== 0 && (
                <Link to={`../post/${post.postId}`} onClick={onClose}>
                    <img src={post.picUrl} />
                </Link>
            )}
            {Object.keys(post).length === 0 && isFollowed && (
                <button onClick={ev => onChangeFollow(ev)} className="followed">
                    Followed
                </button>
            )}
            {Object.keys(post).length === 0 && !isFollowed && (
                <button onClick={ev => onChangeFollow(ev)} className="follow">
                    Follow
                </button>
            )}
        </li>
    )
}
