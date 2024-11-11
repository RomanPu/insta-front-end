import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { Profile } from './pages/Profile'
import { Messenger } from './pages/Messenger'
import { NavBar } from './cmps/NavBar'
import { PostDeteiled } from './cmps/PostDeteiled'
import { CreatePost } from './cmps/CreatePost'
import { Explore } from './pages/Explore'

export function RootCmp() {
    return (
        <div className="main-layout">
            <NavBar />
            {
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route path="/post/:p_id" element={<PostDeteiled />} />
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
