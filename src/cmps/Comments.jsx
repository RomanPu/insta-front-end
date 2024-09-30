import * as React from 'react';
import { Avatar } from './Avatar';


export function Comments({comments}) {

  return <ul className='comments-list'>
    {comments.map(comment => <Comment comment={comment} />)}
  </ul>

}

function Comment({comment}) {
  return <li  key={comment._id}>
    <div className='comment'>
      <div className='avatar'>
        <Avatar/>
      </div>
        <span>{comment.author}</span>
      <p>{comment.body}</p>
    </div>
  </li>    
}
