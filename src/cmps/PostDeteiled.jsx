import zIndex from '@mui/material/styles/zIndex'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar } from './Avatar'

export function PostDeteiled() {
    const { _id} = useParams()
    // console.log('postId:', postId)
    const post = useSelector(storeState => storeState.postsModule
        .posts.find(post => post._id === _id))

    return (
        <div style={{ zIndex: 1000, position: 'fixed', top: 400}}>
            <h1>PostDeteiled</h1>
            <Avatar/>
            {/* <h2>{post._id}</h2>
            <p>{post.body}</p> */}
        </div>
    )
}
 