import * as React from 'react';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import imgUrl from '../assets/imgs/camili.jpeg'

import { useEffectUpdate } from '../customHooks/useEffectUpdate';
import { editPost } from '../store/posts/posts.actions';
import { useState} from 'react';
import { postService } from '../services/post.service'; 
import { MinUserCard } from './MinUserCard';
import { Comments } from './Comments';
import PostPreview from './PostPreview';

export function PostDeteiled() {
    const { _id} = useParams()
    const post = useSelector(storeState => storeState.postsModule
        .posts.find(post => post._id === _id))
    return <PostPreview type = "deteiled" post={post}/>
    // const { _id} = useParams()
    // // console.log('postId:', postId)
    // const post = useSelector(storeState => storeState.postsModule
    //     .posts.find(post => post._id === _id))

    // const { author, createdAt, body, likes, comments, isFollowed } = post;
    // const [isLiked, setIsLiked] = useState(false);
    // const [comment, setComment] = useState('');
    
    // function handleLike(){
    //     setIsLiked(prev => !prev)
    //     console.log('like', likes)
    // }
    
    // function handleCommentSubmit() {
    //     const com = postService.createComment("rom", comment, "123")
    //     editPost({...post, comments: [...comments, com]})
    //     setComment('')
    // }
    
    // function handleCommentChange(event) {
    //     setComment(event.target.value);
    // }
    
    // useEffectUpdate(() => {editPost({...post, likes: isLiked ? likes + 1 : likes - 1})},[isLiked])

    // return (
    //     <div className="deteild-view">
    //   <MinUserCard/>
    //   <img src={imgUrl} alt="post-img"/>
    //   <div className='actions'>
    //       <FavoriteIcon onClick={handleLike} sx={{ color: isLiked ? red[500] : 'inherit' }}/>
    //       <ShareIcon />
    //       <Link to={`post/${post._id}`}>
    //         <MapsUgcRoundedIcon />
    //       </Link>
    //   </div>
    //   <div className="likes">{`${likes} likes`}</div>
    //   <div className="body">{body}</div>
    //   <div className="comment-section">
    //       <input
    //         type="text"
    //         placeholder="Add a comment"
    //         value={comment}
    //         onChange={handleCommentChange}
    //         // style={{ width: '100%', padding: '8px', marginTop: '10px' }}
    //       />
    //       <button
    //         onClick={handleCommentSubmit}
    //         // style={{ padding: '8px 16px', marginTop: '10px', cursor: 'pointer' }}
    //       >
    //         Submit
    //       </button>
    //     </div>
    //      <Comments comments={comments}/>
    // </div>
    // )
}
 