import { useSelector } from 'react-redux'
// import { useEffect } from "react";

import PostPreview from "./PostPreview"

export function PostsList() {
    const posts = useSelector(storeState => storeState.postsModule.posts)
    return <ul className = "posts-list">{posts.map((post) => 
    <li key = {post._id}><PostPreview post = {post}/></li>)}</ul>
}

