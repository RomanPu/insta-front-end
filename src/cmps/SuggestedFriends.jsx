import { useSelector } from 'react-redux'
import { MinUserCard } from './MinUserCard'

export function SuggestedFriends( {type = ""} ) {

    const users = useSelector(storeState => storeState.postsModule.posts)

    return <ul className = "posts-list">{users.map((user) => 
    <li key = {user._id}><MinUserCard user = {user}/></li>)}</ul>
}

