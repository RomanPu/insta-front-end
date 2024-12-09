import { useSelector } from 'react-redux'
// import { useEffect } from "react";

import PostPreview from './PostPreview'
import { useEffect } from 'react'
import { LoadPosts } from '../store/posts/posts.actions'
// LoadPosts()

export function PostsList({ _id }) {
    const user = useSelector(storeState => storeState.usersModule.users.find(user => user._id === _id))
    const allPosts = useSelector(storeState => storeState.postsModule.posts)
    var posts = allPosts.filter(post => user.following.map(follow => follow === post.userId).includes(true))
    posts = shuffleArray(posts)
    // posts.sort((a, b) => b.createdAt - a.createdAt)
    //if new user followed - update posts
    useEffect(() => {
        LoadPosts()
    }, [user])

    return (
        <ul className="posts-list">
            {posts.map(post => (
                <li key={post._id}>
                    <PostPreview post={post} />
                </li>
            ))}
        </ul>
    )
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
