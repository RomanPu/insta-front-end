import * as React from 'react'

import { useParams } from 'react-router-dom'
import { getUserById } from '../store/users/users.actions'
import { getPostById } from '../store/posts/posts.actions'

import PostPreview from './PostPreview'

export function PostDeteiled() {
	const { p_id } = useParams()
	const post = getPostById(p_id)
	return (
		<PostPreview
			type="deteiled"
			post={post}
			user={getUserById(post.userId)}
		/>
	)
}
