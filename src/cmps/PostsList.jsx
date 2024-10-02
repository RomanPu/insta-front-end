import { useSelector } from 'react-redux'
// import { useEffect } from "react";

import PostPreview from "./PostPreview"
import { useEffect } from 'react'
import { LoadPosts } from '../store/posts/posts.actions'
// LoadPosts()

export function PostsList() {
    // const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)

    useEffect(() => {
        LoadPosts()
    }, [])

    // console.log("logedUser", logedUser)


    const posts = useSelector(storeState => storeState.postsModule.posts)
    return <ul className = "posts-list">{posts.map((post) => 
    <li key = {post._id}><PostPreview post = {post}/></li>)}</ul>
}

