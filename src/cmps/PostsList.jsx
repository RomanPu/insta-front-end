import { useSelector } from 'react-redux'
// import { useEffect } from "react";

import PostPreview from "./PostPreview"
import { PostAddSharp } from '@mui/icons-material'

export function PostsList() {
    const posts = useSelector(storeState => storeState.postsModule.posts)
    console.log(posts)
    if (posts.length) return <PostPreview user = {posts[0].author} date ={posts[0].createdAt} content = {posts[0].body}/>
    return <div>loading</div>
}

