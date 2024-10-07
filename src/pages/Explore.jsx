import React from 'react';
import { PostGallery } from '../cmps/PostGallery';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { useEffect } from 'react'
import { LoadPosts } from '../store/posts/posts.actions'

export function Explore(){
    const posts = useSelector(storeState => storeState.postsModule.posts)
    console.log("gallery", posts)

    useEffect(() => {
        LoadPosts()
    }, [])

    return <div className="explore-page">
        <PostGallery posts = {posts}/>
        <Outlet/>
    </div>
}