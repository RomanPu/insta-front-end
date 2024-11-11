import { Outlet } from 'react-router'
import { LogedUser } from '../cmps/LogedUser'
import { PostsList } from '../cmps/PostsList'
import { SuggedestedFriends } from '../cmps/SuggedestedFriends'
import { userService } from '../services/user.service'
import { useSelector } from 'react-redux'
// import { userService } from "../services/user.service";

export function HomePage() {
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)

    userService.createUsers()

    return (
        <div className="home-page-conteiner">
            <section className="home-page">
                <section className="posts-section">
                    <PostsList _id={logedUser._id} />
                </section>
                <section className="side-bar">
                    <LogedUser />
                    <SuggedestedFriends />
                </section>
                <Outlet />
            </section>
        </div>
    )
}
