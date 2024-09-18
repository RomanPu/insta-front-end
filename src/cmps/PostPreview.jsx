import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import imgUrl from '../assets/imgs/camili.jpeg'

import { useEffectUpdate } from '../customHooks/useEffectUpdate';
import { utilService } from '../services/util.service';
import { editPost } from '../store/posts/posts.actions';
import { useState} from 'react';
import { Comments } from './Comments';
import { postService } from '../services/post.service'; 





export default function PostPreview({post}) {

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

  return (
    <Card  sx={{ width: '100%', marginBottom: 1}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="post">
            {author}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheader={utilService.getTimeString(createdAt)}
      />
      <CardMedia
        component="img"
        height="194"
        image = {imgUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             {body}
        </Typography>
      </CardContent>
        <CardActions >
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon  sx={{ color: isLiked ? red[500] : 'inherit' }}/>
          </IconButton>

          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <CardContent>
        <Typography variant="body2" color="text.secondary">
            {`${likes} likes`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comments:
        </Typography>
        {comments && <Comments comments={comments}/>}
        <TextField
          variant="standard"
          fullWidth
          value={comment}
          onChange={handleCommentChange}
          sx={{ marginTop: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          sx={{ marginTop: 1 }}
        >
          Submit
        </Button>
        </CardContent>
    </Card>
  );
}