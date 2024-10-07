import React from 'react';
import { PostGallery } from '../cmps/PostGallery';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';

export function Explore(){
    const posts = useSelector(storeState => storeState.postsModule.posts)
    console.log("gallery", posts)

    return <div className="explore-page">
        <PostGallery posts = {posts}/>
        <Outlet/>
    </div>
}