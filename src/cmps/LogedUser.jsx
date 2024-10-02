import { useSelector } from 'react-redux'
import {useState, useEffect } from 'react'

import { Avatar } from './Avatar'
import { switchUser } from '../store/logedUser/loged.user.actions'
import { getUserById } from '../store/users/users.actions'



export function LogedUser(){
    const users = useSelector(storeState => storeState.usersModule.users)
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const [switchOn, setSwitchOn] = useState(false)

    useEffect(() => {
        switchUser({_id: users[0]._id, name: users[0].name, userName: users[0].name,
             avatarPic: users[0].avatarPic}) 
    },[])

    //drop box with all users when click button switch
    function switchUserOn(){
        setSwitchOn(prev => !prev)
    }

    function oNselctedUser(ev){
        //console.log('ev.target.value',ev.target)
        const user = getUserById(ev.target.value)
        switchUser({_id: user._id, name: user.name, userName: user.name,
            avatarPic: user.avatarPic})
        setSwitchOn(prev => !prev)
    }

    console.log('logedUser', logedUser.avatarPic)
  
    return <div className='logged-user'>
        <Avatar picUrl = {users[0].avatarPic}/>
        <div className='user-info'>
            <h1>{logedUser.userName}</h1>
            <p>{logedUser.name}</p>
        </div>
        {!switchOn && <button onClick={switchUserOn}>Switch</button>}
        {switchOn && <select onChange={oNselctedUser} name="users" id="users">
            {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
        </select>}
    </div>
}