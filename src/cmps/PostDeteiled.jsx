import * as React from 'react'

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostPreview from './PostPreview'


export function PostDeteiled() {
    const { p_id } = useParams()
    const post = useSelector(storeState => storeState.postsModule.posts.find(post => post._id === p_id))
    const user = useSelector(storeState => storeState.usersModule.users.find(user => user._id === post.userId))
    
    return <PostPreview type="deteiled" post={post} user={user} />
}
