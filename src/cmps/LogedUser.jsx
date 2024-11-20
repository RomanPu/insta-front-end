import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { Avatar } from './Avatar'
import { switchUser } from '../store/logedUser/loged.user.actions'
import { getUserById } from '../store/users/users.actions'
import { Link, useNavigate } from 'react-router-dom'


export function LogedUser() {
    const users = useSelector(storeState => storeState.usersModule.users)
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const navigate = useNavigate()


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
