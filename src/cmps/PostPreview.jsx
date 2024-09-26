import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import imgUrl from '../assets/imgs/camili.jpeg'

import { useEffectUpdate } from '../customHooks/useEffectUpdate';
import { editPost } from '../store/posts/posts.actions';
import { postService } from '../services/post.service'; 
import { MinUserCard } from './MinUserCard';
import { Comments } from './Comments';
import { EmojiIcon, EmojiPicker } from './ImojiPicker';

export default function PostPreview({post, type = 'post-preview'}) {

  const { author, createdAt, body, _id, likes, comments, isFollowed } = post;
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleExpand = () => {
      setIsExpanded(!isExpanded);
  };


  function handleLike(){
    setIsLiked(prev => !prev)
    console.log('like', likes)
  }

  function handleCommentSubmit() {
    const textarea = textareaRef.current;
    textarea.style.height = '18px'; // Reset height

    const com = postService.createComment("rom", comment, "123")
    editPost({...post, comments: [...comments, com]})
    setComment('')
  }

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  useEffect(() => {
    const textarea = textareaRef.current;

    const adjustHeight = () => {
        textarea.style.height = '18px'; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to scrollHeight
    };

    textarea.addEventListener('input', adjustHeight);

    return () => {
        textarea.removeEventListener('input', adjustHeight);
    };
  }, []);

  useEffectUpdate(() => {editPost({...post, likes: isLiked ? likes + 1 : likes - 1})},[isLiked])

  const handleEmojiSelect = (e) => {
    console.log("emoji", e);
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(prev => prev + emoji);
    // setShowEmojiPicker(false);
};

  return <div className= {`post-view`} >
    <div className={type}>
      {type==="deteiled" && <img src={imgUrl} alt="post-img"/>}
       <div className = "preview-and-comments">
      <MinUserCard user= {{name: author, followed: "followed", date: createdAt}}/>
      {type==="post-preview" && <img src={imgUrl} alt="post-img"/>}
      <div className='actions'>
          <div onClick={handleLike} > 
            { !isLiked ? <LikeIcon /> : <UnlikeIcon />}
          </div>
          {type === "post-preview" && <Link to={`post/${post._id}`}>
            <Component />
          </Link>}
          <ShareIcon />
          <div className='save-icon'><Save /></div>
      </div>
      <div className="likes">{`${likes} likes`}</div>
      <div className={`body-${isExpanded ? 'expanded' : 'collapsed'}`}>
          {isExpanded ? body : `${body.substring(0, 100)}... `}
          {!isExpanded && (
              <span className="more-link" onClick={toggleExpand}>
                  more
              </span>
          )}
      </div>
      <div className="comment-section">
          <textarea
            ref={textareaRef}
            className='text-area'
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={handleCommentChange}
          />
          {comment && <button onClick={handleCommentSubmit}>Post</button>}
          <button onClick={() => setShowEmojiPicker(prev => !prev)}>{<EmojiIcon/>}</button>
          {showEmojiPicker && <div className='emoji-picker'>
              <EmojiPicker onSelect={ handleEmojiSelect} />
            </div>}
        </div>
        {type === "deteiled" && <Comments comments={comments}/>}
    </div>
    </div>
  </div>
}

function ShareIcon(){
  return (
    <svg
        aria-label="Share"
        className="x1lliihq x1n2onr6 xyb1xck"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
    >
        <title>Share</title>
        <line
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="22"
            x2="9.218"
            y1="3"
            y2="10.083"
        ></line>
        <polygon
            fill="none"
            points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
        ></polygon>
    </svg>
);
}

function Component() {
      return (
          <svg
              aria-label="Comment"
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
          >
              <title>Comment</title>
              <path
                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
              ></path>
          </svg>
      );
}

function LikeIcon(){
  return (
    <svg
        aria-label="Like"
        className="x1lliihq x1n2onr6 xyb1xck"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
    >
        <title>Like</title>
        <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
    </svg>
);
}

function UnlikeIcon(){
  return (
    <svg
        aria-label="Unlike"
        className="x1lliihq x1n2onr6 xxk16z8"
        fill="red"
        height="24"
        role="img"
        viewBox="0 0 48 48"
        width="24"
    >
        <title>Unlike</title>
        <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
    </svg>
);
}

function Save(){
  return (
    <svg
        aria-label="Save"
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
    >
        <title>Save</title>
        <polygon
            fill="none"
            points="20 21 12 13.44 4 21 4 3 20 3 20 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        ></polygon>
    </svg>
);
}


