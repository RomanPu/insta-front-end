import { useSelector } from 'react-redux'
import { MinUserCard } from './MinUserCard'
import { getUserById } from '../store/users/users.actions'

export function SuggedestedFriends({ type = '' }) {
    const { _id } = useSelector(storeState => storeState.logedUserModule.logedUser)
    const loggedUser = getUserById(_id)
    const allUsers = useSelector(storeState => storeState.usersModule.users)
    const romovedLoggedUser = allUsers.filter(user => user._id !== _id)
    const users = romovedLoggedUser.filter(user => !loggedUser.following.some(follow => follow === user._id))
    console.log(users)

    return (
        <div className="freinds-block">
            <div className="header">
                <h2>Suggested for you</h2>
                <h1>See All</h1>
            </div>
            <ul className="suggedested-friends">
                {users.map(user => (
                    <li key={user._id}>
                        <MinUserCard user={user} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
