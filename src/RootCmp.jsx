import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom'

import { HomePage } from './pages/HomePage'
import { Profile } from './pages/Profile'
import { Messenger } from './pages/Messenger'
import { NavBar } from './cmps/NavBar'
import { PostDeteiled } from './cmps/PostDeteiled'
import { CreatePost } from './cmps/CreatePost'
import { Explore } from './pages/Explore'
import { LoginModal } from './cmps/LoginModal'
import { LoginPage } from './pages/LoginPage'
import { SignUpPage } from './pages/SignUpPage'
import { UserMsg } from './cmps/UserMsg'
import { EditProfile } from './pages/EditProfile'
import { MessengerInbox } from './cmps/MessengerInbox'
import { CreateMsgModal } from './cmps/CreateMsgModal'
import { MessengerChat } from './cmps/MessengerChat'
import { switchUser, loadMsgs } from './store/logedUser/loged.user.actions'
import { LoadPosts } from './store/posts/posts.actions'
import { LoadUsers } from './store/users/users.actions'
import { utilService } from './services/util.service'

export function RootCmp() {
    const [loading, setLoading] = useState(true)
    const [login, setLogin] = useState(false)
    const location = useLocation()
    console.log('start')

    useEffect(() => {
        console.log('useEffect')
        async function loadDb() {
            const logeduser = utilService.loadFromStorage('loggeduser') || {}
            console.log('logeduser', logeduser)
            if (Object.keys(logeduser).length !== 0) {
                await switchUser(logeduser)
                await LoadPosts()
                await LoadUsers()
                await loadMsgs()
                setLoading(false)
                setLogin(false)
            } else setLogin(true)
            console.log(login)
        }
        loadDb()
    }, [location])
    if (login) return <LoginPage />
    if (loading) return <div>Loading...</div>
    const isNavOn = location.pathname === '/login' || location.pathname === '/signup'
    return (
        <div className="main-layout">
            {!isNavOn && <NavBar />}
            <UserMsg />
            {
                <Routes>
                    <Route path="/messenger" element={<Messenger />}>
                        <Route path="/messenger/chat/:_id" element={<MessengerChat />} />
                        <Route path="/messenger/inbox" element={<MessengerInbox />} />
                        <Route path="/messenger/create-msg" element={<CreateMsgModal />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/edit-profile/:_id" element={<EditProfile />} />
                    <Route path="/" element={<HomePage />}>
                        <Route path="/post/:p_id" element={<PostDeteiled />} />
                        <Route path="/login/:type" element={<LoginModal />} />
                    </Route>
                    <Route path="/profile/:_id" element={<Profile />}>
                        <Route path="/profile/:_id/post/:p_id" element={<PostDeteiled />} />
                    </Route>
                    <Route path="/messenger" element={<Messenger />} />
                    <Route path="/createpost" element={<CreatePost />} />
                    <Route path="/explore" element={<Explore />}>
                        <Route path="/explore/post/:p_id" element={<PostDeteiled />} />
                    </Route>
                </Routes>
            }
        </div>
    )
}
