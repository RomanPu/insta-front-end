import { useSelector } from 'react-redux'
import { MinUserCard } from './MinUserCard'

export function SuggedestedFriends( {type = ""} ) {

    const users = useSelector(storeState => storeState.usersModule.users)

    return <ul className = "suggedested-friends">{users.map((user) => 
    <li key = {user._id}><MinUserCard type = {"suggedested-freinds-preview" }
    user = {user}/></li>)}</ul>
}

