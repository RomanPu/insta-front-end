import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { Avatar } from './Avatar'
import { switchUser } from '../store/logedUser/loged.user.actions'
import { getUserById } from '../store/users/users.actions'
import { useNavigate } from 'react-router-dom'


export function LogedUser() {
    const users = useSelector(storeState => storeState.usersModule.users)
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const [switchOn, setSwitchOn] = useState(false)
    const navigate = useNavigate()

    function switchUserOn() {
        navigate("login/pop-up")
        setSwitchOn(true)
    }

    async function oNselctedUser(ev) {
        const user = getUserById(ev.target.value)
        switchUser({
            _id: user._id,
            name: user.name,
            username: user.username,
            avatarPic: user.avatarPic
        })
        setSwitchOn(false)
    }

    return (
        <div className="logged-user">
            <Avatar picUrl={logedUser.avatarPic} />
            <div className="user-info">
                <h1>{logedUser.username}</h1>
                <p>{logedUser.name}</p>
            </div>
            {!switchOn && <button onClick={(switchUserOn)}>Switch</button>}
            {switchOn && (
                <select onChange={oNselctedUser} name="users" id="users" value={logedUser._id}>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    )
}
