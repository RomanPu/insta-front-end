import { useSelector } from 'react-redux'
// import { useEffect } from "react";

import PostPreview from './PostPreview'
import { useEffect } from 'react'
import { LoadPosts } from '../store/posts/posts.actions'
//import seenAllImg from '../assets/imgs/seen-all.png'
// LoadPosts()

export function PostsList({ _id }) {
    const user = useSelector(storeState => storeState.usersModule.users.find(user => user._id === _id))
    const allPosts = useSelector(storeState => storeState.postsModule.posts)
    var posts = allPosts.filter(post => user.following.map(follow => follow === post.userId).includes(true))
    var unfollowed = allPosts.filter(post => posts.some(followedPost => followedPost._id === post._id) === false)
    var unfollowed = unfollowed.filter(post => post.userId !== _id)

    

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
            <div className="end-of-followed">
                <img src={'/img/seen-all.png'} alt="profile" />
                <h2>You're all caught up</h2>
                <p>You've seen all new posts from the past 3 days.</p>
            </div>
            {unfollowed.map(post => (
                <li key={post._id}>
                    <PostPreview post={post} />
                </li>
            ))}
        </ul>
    )
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
