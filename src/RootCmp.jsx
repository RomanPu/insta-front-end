import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { Profile } from './pages/Profile'
import {Messenger} from './pages/Messenger'
import { NavBar } from './cmps/NavBar'
import { postService } from './services/post.service'

export function RootCmp() {
    return (
        <div>
            <NavBar/>
            {
                <Routes>
                     <Route path="instush" element={<HomePage />} />
                     <Route path="instush/profile" element={<Profile />} />
                     <Route path="instush/messenger" element={<Messenger />} />
               </Routes>
            }
           
        </div>
    )
}

