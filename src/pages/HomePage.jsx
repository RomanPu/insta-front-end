import { Outlet } from 'react-router'
import { LogedUser } from '../cmps/LogedUser'
import { PostsList } from '../cmps/PostsList'
import { SuggedestedFriends } from '../cmps/SuggedestedFriends'
import { LoadUsers } from '../store/users/users.actions'
import { useSelector } from 'react-redux'
import { useEffect, useState} from 'react'

export function HomePage() {
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await LoadUsers();
            setLoading(false);
        })();
    }, []);

    if (loading) return <div>Loading...</div>;
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
