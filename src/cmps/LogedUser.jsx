import { useSelector } from 'react-redux'
import {useState } from 'react'

import { Avatar } from './Avatar'
import { switchUser } from '../store/logedUser/loged.user.actions'
import { getUserById } from '../store/users/users.actions'



export function LogedUser(){
    const users = useSelector(storeState => storeState.usersModule.users)
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const [switchOn, setSwitchOn] = useState(false)

    //drop box with all users when click button switch
    function switchUserOn(){
        setSwitchOn(prev => !prev)
    }

    function oNselctedUser(ev){
        //console.log('ev.target.value',ev.target)
        const user = getUserById(ev.target.value)
        switchUser(user)
        setSwitchOn(prev => !prev)
    }
  
    return <div className='logged-user'>
        <Avatar />
        <div className='user-info'>
            <h1>user</h1>
            <p>{logedUser.name}</p>
        </div>
        {!switchOn && <button onClick={switchUserOn}>switch</button>}
        {switchOn && <select onChange={oNselctedUser} name="users" id="users">
            {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
        </select>}
    </div>
}