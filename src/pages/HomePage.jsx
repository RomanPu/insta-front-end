import { Outlet } from 'react-router'
import { LogedUser } from '../cmps/LogedUser'
import { PostsList } from '../cmps/PostsList'
import { SuggedestedFriends } from '../cmps/SuggedestedFriends'
import { LoadUsers } from '../store/users/users.actions'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const isLoggedin = useSelector(storeState => storeState.logedUserModule.isLoggedin)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            await LoadUsers()
            setLoading(false)
        })()
        if (!isLoggedin) navigate('/login')
    }, [])

    if (loading) return <div>Loading...</div>
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
