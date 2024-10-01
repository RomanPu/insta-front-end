import * as React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserById } from '../store/users/users.actions';


import PostPreview from './PostPreview';

export function PostDeteiled() {
    const { _id} = useParams()
    const post = useSelector(storeState => storeState.postsModule
        .posts.find(post => post._id === _id))
    return <PostPreview type = "deteiled" post={post} user = {getUserById(post.useId)}/>
}
 