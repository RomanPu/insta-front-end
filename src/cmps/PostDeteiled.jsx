import * as React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserById } from '../store/users/users.actions';


import PostPreview from './PostPreview';

export function PostDeteiled() {
    const { p_id} = useParams()
    const post = useSelector(storeState => storeState.postsModule
        .posts.find(post => post._id === p_id))
        console.log("Dpost",post)
    return <PostPreview type = "deteiled" post={post} user = {getUserById(post.userId)}/>
}
 