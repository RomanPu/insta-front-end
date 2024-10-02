import { useSelector } from 'react-redux'
import { MinUserCard } from './MinUserCard'

export function SuggedestedFriends( {type = ""} ) {

    const users = useSelector(storeState => storeState.usersModule.users)

    return <div className = "freinds-block">
        <div className='header'>
            <h2>Suggested Friends</h2>
            <h1>See All</h1>
        </div>
        <ul className = "suggedested-friends">{users.map((user) => 
        <li key = {user._id}><MinUserCard user = {user}/></li>)}</ul>
    </div>
}

