import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

import { Avatar } from './Avatar'
import { switchUser } from '../store/logedUser/loged.user.actions'
import { getUserById } from '../store/users/users.actions'
import { utilService } from '../services/util.service'
import { createPost } from '../store/posts/posts.actions'
import pic1 from '../assets/imgs/pic1.jpeg'
import pic2 from '../assets/imgs/pic2.jpeg'
import pic3 from '../assets/imgs/pic3.jpeg'
import pic4 from '../assets/imgs/pic4.jpeg'
import pic5 from '../assets/imgs/pic5.jpeg'
import user1 from '../assets/imgs/user1.jpeg'
import user2 from '../assets/imgs/user2.jpeg'
import user3 from '../assets/imgs/user3.jpeg'
import user4 from '../assets/imgs/user4.jpeg'
import user5 from '../assets/imgs/user5.jpeg'

export function LogedUser() {
    const users = useSelector(storeState => storeState.usersModule.users)
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const [switchOn, setSwitchOn] = useState(false)
    function switchUserOn() {
        setSwitchOn(prev => !prev)
    }

    async function oNselctedUser(ev) {
        console.log('ev.target.value', ev)
        const user = getUserById(ev.target.value)
        console.log('user', user)
        switchUser({
            _id: user._id,
            name: user.name,
            userName: user.userName,
            avatarPic: user.avatarPic
        })
        setSwitchOn(prev => !prev)

        // const pics = [pic1, pic2, pic3, pic4, pic5, user1, user2, user3, user4, user5]
        // for (let u of users){
        //     console.log('demo', u)
        //     for (let i = 0; i < 3; i++){
        //         const randPic = pics[utilService.getRandomIntInclusive(0, pics.length -1)]
        //        await createPost(u, utilService.makeLorem(), randPic)
        //     }
        // }
    }

    return (
        <div className="logged-user">
            <Avatar picUrl={logedUser.avatarPic} />
            <div className="user-info">
                <h1>{logedUser.userName}</h1>
                <p>{logedUser.name}</p>
            </div>
            {!switchOn && <button onClick={switchUserOn}>Switch</button>}
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
