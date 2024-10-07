import React from 'react';
import { Link } from 'react-router-dom';

export function PostGallery({ posts }) {
    // console.log('g-url', posts[0].imgUrl)
    return (
        <div className="post-gallery">
            
                {posts.map(post => { return <span><Link to={`post/${post._id}`}>
                    <img key={post.id} src={post.picUrl} alt="Post" /> 
                    </Link></span>})}
        </div>
    );
}