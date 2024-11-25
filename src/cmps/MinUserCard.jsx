import { Avatar } from './Avatar'
import React from 'react'
import { utilService } from '../services/util.service'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserById, editUser } from '../store/users/users.actions'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'

export function MinUserCard({ user, time = '', followButton = true, type = 'only-user' }) {
    const navigate = useNavigate()
    const { _id } = useSelector(storeState => storeState.logedUserModule.logedUser)
    const loggedUser = useSelector(storeState => storeState.usersModule.users.find(user => user._id === _id))
    const author = useSelector(storeState => storeState.usersModule.users.find(u => u._id === user._id))
    const [isFollowed, setIsFollowed] = useState(
        loggedUser.following.map(follow => follow === author._id).includes(true)
    )

    useEffectUpdate(() => {
        if (isFollowed && !loggedUser.following.map(like => like === user._id).includes(true)) {
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

    function onChangeFollow() {
        setIsFollowed(prev => !prev)
    }

    return (
        <div className={`min-user-card`}>
            <a onClick={() => navigate(`../profile/${author._id}`)}>
                <Avatar picUrl={author.avatarPic} />
                {type === 'both' && (
                    <div className="user-info">
                        <h1>{user.username}</h1>
                        <p>{user.username}</p>
                    </div>
                )}
                {type === 'only-user' && <h1>{user.username}</h1>}
            </a>
            {time && <h2>{utilService.createPostTimeFormat(time)}</h2>}
            {isFollowed && followButton && (
                <button onClick={onChangeFollow} className="followed">
                    Followed
                </button>
            )}
            {!isFollowed && followButton && (
                <button onClick={onChangeFollow} className="follow">
                    Follow
                </button>
            )}
        </div>
    )
}
