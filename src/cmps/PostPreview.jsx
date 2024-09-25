import * as React from 'react';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import { Link } from 'react-router-dom';

import imgUrl from '../assets/imgs/camili.jpeg'

import { useEffectUpdate } from '../customHooks/useEffectUpdate';
import { editPost } from '../store/posts/posts.actions';
import { useState} from 'react';
import { postService } from '../services/post.service'; 
import { MinUserCard } from './MinUserCard';
import { Comments } from './Comments';

export default function PostPreview({post, type = 'post-preview'}) {

  const { author, createdAt, body, _id, likes, comments, isFollowed } = post;
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');

  function handleLike(){
    setIsLiked(prev => !prev)
    console.log('like', likes)
  }

  function handleCommentSubmit() {
    const com = postService.createComment("rom", comment, "123")
    editPost({...post, comments: [...comments, com]})
    setComment('')
  }

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  useEffectUpdate(() => {editPost({...post, likes: isLiked ? likes + 1 : likes - 1})},[isLiked])

  console.log('comments:', comments)

  return <div className= {`post-view`} >
    <div className={type}>
      {type==="deteiled" && <img src={imgUrl} alt="post-img"/>}
       <div className = "preview-and-comments">
      <MinUserCard/>
      {type==="post-preview" && <img src={imgUrl} alt="post-img"/>}
      <div className='actions'>
          <FavoriteIcon onClick={handleLike} sx={{ color: isLiked ? red[500] : 'inherit' }}/>
          <ShareIcon />
          {type === "post-preview" && <Link to={`post/${post._id}`}>
            <MapsUgcRoundedIcon />
          </Link>}
      </div>
      <div className="likes">{`${likes} likes`}</div>
      <div className="body">{body}</div>
      <div className="comment-section">
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={handleCommentChange}
            // style={{ width: '100%', padding: '8px', marginTop: '10px' }}
          />
          <button
            onClick={handleCommentSubmit}
            // style={{ padding: '8px 16px', marginTop: '10px', cursor: 'pointer' }}
          >
            Submit
          </button>
        </div>
        {type === "deteiled" && <Comments comments={comments}/>}
    </div>
    </div>
  </div>
}

// (
   
//   <CardActions >
//     <IconButton onClick={handleLike} aria-label="add to favorites">
//       <FavoriteIcon  sx={{ color: isLiked ? red[500] : 'inherit' }}/>
//     </IconButton>
//     <IconButton aria-label="share">
//       <ShareIcon />
//     </IconButton>
//     <Link to={`post/${post._id}`}>
//     <IconButton aria-label="comment">
//       <MapsUgcRoundedIcon />
//     </IconButton>
//     </Link>
//   </CardActions>

// );