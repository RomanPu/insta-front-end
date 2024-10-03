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
        <Avatar picUrl={comment.authorAvatar}/>
      </div >
      <div className='content'>
        <p><span style={{fontWeight: 600}}>{comment.author} </span><span>{comment.body}</span></p>
      </div>
    </div>
  </li>    
}
