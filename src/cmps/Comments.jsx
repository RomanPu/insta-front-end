import * as React from 'react';
import { Avatar } from './Avatar';


export function Comments({comments}) {

  return <ul className='comments-list'>
    {comments.map(comment => <Comment comment={comment} />)}
  </ul>

}

function Comment({comment}) {
  return <li key={comment._id}>
    <div>
      <Avatar/>
      <p>{comment.author}</p>
    </div>
    <p>{comment.body}</p>
  </li>    
}
