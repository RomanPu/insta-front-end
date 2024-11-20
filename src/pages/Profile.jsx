import React, { useEffect, useRef } from 'react'
import { PostGallery } from '../cmps/PostGallery'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import { LoadUsers } from '../store/users/users.actions'
import { LoadPosts } from '../store/posts/posts.actions'

import { Avatar } from '../cmps/Avatar'

import { ProfilesList } from '../cmps/ProfilesList'

export function Profile() {
    const [followingList, setFollowingList] = useState(false)
    const [followersList, setFollowersList] = useState(false)
    const { _id } = useParams()
    const allPosts = useSelector(storeState => storeState.postsModule.posts)
    const posts = allPosts.filter(post => post.userId === _id)
    const user = useSelector(storeState => storeState.usersModule.users.find(user => user._id === _id))
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => {
        setIsExpanded(true)
    }

    return (
        <main className="profile-conteiner">
            <dev className = "profile">
                <div className="profile-header">
                    <div className="pro-pic">
                        <Avatar picUrl={user.avatarPic} />
                    </div>
                    <div className="user-info">
                        <h1>{user.username}</h1>
                        <div className="stats">
                            <p>
                                <span>{user.posts.length}</span> 
                                <span>posts</span> 
                            </p>
                            <p onClick={() => setFollowersList(true)}>
                                <span>{user.followers.length}</span>
                                <span>followers</span> 
                            </p>
                            {followersList && <ProfilesList user={user} type={'followers'} onClose={setFollowersList} />}
                            <p onClick={() => setFollowingList(true)}>
                                <span>{user.following.length}</span>
                                <span>following</span>
                            </p>
                            {followingList && <ProfilesList user={user} type={'following'} onClose={setFollowingList} />}
                        </div>
                        <h2>{user.username}</h2>
                        <div className={'body'}>
                            {isExpanded ? user.body : `${user.body.substring(0, 100)}... `}
                            {!isExpanded && (
                                <span className="more-link" onClick={toggleExpand}>
                                    {' '}
                                    more
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="profile-nav">
                    <button>
                        <Posts />
                        <span>POSTS</span>
                    </button>
                    <button>
                        <Reels />
                        <span>REELS</span>
                    </button>
                    <button>
                        <Tagged />
                        <span>TAGGED</span>
                    </button>
                </div>
                <section className="gallery">
                    <PostGallery posts={posts} type={'profile-view'} />
                </section>
                <Outlet />
            </dev>
        </main>
    )
}

function Posts() {
    return (
        <svg
            aria-label=""
            className="x1lliihq x1n2onr6 x5n08af"
            fill="currentColor"
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
        >
            <title></title>
            <rect
                fill="none"
                height="18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="18"
                x="3"
                y="3"
            ></rect>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="9.015"
                x2="9.015"
                y1="3"
                y2="21"
            ></line>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="14.985"
                x2="14.985"
                y1="3"
                y2="21"
            ></line>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="9.015"
                y2="9.015"
            ></line>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="14.985"
                y2="14.985"
            ></line>
        </svg>
    )
}

function Reels() {
    return (
        <svg
            aria-label=""
            className="x1lliihq x1n2onr6 x1roi4f4"
            fill="currentColor"
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
        >
            <title></title>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="2.049"
                x2="21.95"
                y1="7.002"
                y2="7.002"
            ></line>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="13.504"
                x2="16.362"
                y1="2.001"
                y2="7.002"
            ></line>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="7.207"
                x2="10.002"
                y1="2.11"
                y2="7.002"
            ></line>
            <path
                d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            ></path>
            <path
                d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                fillRule="evenodd"
            ></path>
        </svg>
    )
}

function Tagged() {
    ;<svg
        aria-label=""
        className="x1lliihq x1n2onr6 x1roi4f4"
        fill="currentColor"
        height="12"
        role="img"
        viewBox="0 0 24 24"
        width="12"
    >
        <title></title>
        <path
            d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
        ></path>
    </svg>
}
