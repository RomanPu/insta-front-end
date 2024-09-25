import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { Profile } from './pages/Profile'
import {Messenger} from './pages/Messenger'
import { NavBar } from './cmps/NavBar'
import { PostDeteiled } from './cmps/PostDeteiled'

export function RootCmp() {
    return (
        <div className='main-layout'>
            <NavBar/>
            {
                <Routes>
                     <Route path="/instush" element={<HomePage />} />
                     <Route path="/instush/profile" element={<Profile />} />
                     <Route path="/instush/messenger" element={<Messenger />} />
                     <Route path="/instush/post/:_id" element={<PostDeteiled/>} />
               </Routes>
            }
        </div>
    )
}

