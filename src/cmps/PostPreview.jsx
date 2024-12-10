import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { editPost } from '../store/posts/posts.actions'
import { postService } from '../services/post.service'
import { MinUserCard } from './MinUserCard'
import { Comments } from './Comments'
import { EmojiIcon, EmojiPicker } from './ImojiPicker'
import { Avatar } from './Avatar'

import { ProfilesList } from './ProfilesList'

export default function PostPreview({ post, type = 'post-preview' }) {
    const user = useSelector(storeState => storeState.usersModule.users.find(user => user._id === post.userId))
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)

    // console.log('posttttttttttttttt:', post)

    const { author, createdAt, body, picUrl, likes, comments, isFollowed } = post
    const [isLiked, setIsLiked] = useState(likes.map(like => like === logedUser._id).includes(true))
    const [comment, setComment] = useState('')
    const [isExpanded, setIsExpanded] = useState(type === 'deteiled' ? true : false)
    const textareaRef = useRef(null)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [likesList, setLikesList] = useState(false)
    const navigate = useNavigate()

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    useEffect(() => {
        if (type === 'deteiled') document.body.classList.add('no-scroll')
        return () => document.body.classList.remove('no-scroll')
    }, [])

    useEffectUpdate(() => {
        if (isLiked) {
            ;(async () => {
                editPost({ ...post, likes: [...likes, logedUser._id] }, 'like')
            })()
        } else {
            ;(async () => {
                editPost({ ...post, likes: likes.filter(like => like !== logedUser._id) })
            })()
        }
    }, [isLiked])

    function handleLike() {
        setIsLiked(prev => !prev)
    }

    function handleCommentSubmit() {
        const textarea = textareaRef.current
        textarea.style.height = '18px' // Reset height

        const com = postService.createComment(logedUser.username, comment, logedUser._id, logedUser.avatarPic)
        editPost({ ...post, comments: [...comments, com] }, 'comment', com.body)
        setComment('')
    }

    function handleCommentChange(event) {
        setComment(event.target.value)
    }

    useEffect(() => {
        const textarea = textareaRef.current

        const adjustHeight = () => {
            textarea.style.height = '18px' // Reset height
            textarea.style.height = `${textarea.scrollHeight}px` // Set height to scrollHeight
        }

        textarea.addEventListener('input', adjustHeight)

        return () => {
            textarea.removeEventListener('input', adjustHeight)
        }
    }, [])

    // useEffectUpdate(() => {editPost({...post, likes: isLiked ? likes + 1 : likes - 1})},[isLiked])

    const handleEmojiSelect = e => {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        setComment(prev => prev + emoji)
        // setShowEmojiPicker(false);
    }

    return (
        <div className={`post-view`}>
            <div className="preview-and-comments">
                <div className="post-container">
                    <div className={type}>
                        <div className="header">
                            <MinUserCard
                                user={{
                                    username: user.username,
                                    followed: 'followed',
                                    avatarPic: user.avatarPic,
                                    _id: user._id
                                }}
                                time={createdAt}
                                followButton={false}
                            />
                            {type === 'deteiled' && (
                                <div className="dots">
                                    <Dots />
                                </div>
                            )}
                        </div>
                        <div className="p-img">
                            <img src={picUrl} alt="post-img" />
                        </div>
                        <div className="actions">
                            <div onClick={handleLike}>{!isLiked ? <LikeIcon /> : <UnlikeIcon />}</div>
                            {type === 'post-preview' && (
                                <Link to={`post/${post._id}`}>
                                    <Component />
                                </Link>
                            )}
                            <ShareIcon />
                            <div className="save-icon">
                                <Save />
                            </div>
                        </div>
                        <div className="likes" onClick={() => setLikesList(true)}>{`${likes.length} likes`}</div>
                        {likesList && <ProfilesList likedUsersList={likes} onClose={setLikesList} type={'likes'} />}
                        <div className="body-and-comments">
                            <div className={`body-${isExpanded ? 'expanded' : 'collapsed'} body`}>
                                {type === 'deteiled' && <Avatar picUrl={user.avatarPic} />}
                                <p>
                                    <span style={{ fontWeight: 600 }}>{author} </span>
                                    {isExpanded ? body : `${body.substring(0, 100)}... `}
                                    {!isExpanded && (
                                        <span className="more-link" onClick={toggleExpand}>
                                            {' '}
                                            more
                                        </span>
                                    )}
                                </p>
                            </div>
                            {type === 'deteiled' && (
                                <div>
                                    <Comments comments={comments} />
                                </div>
                            )}
                        </div>
                        <div />
                        <div className="comment-section">
                            {type === 'deteiled' && (
                                <button onClick={() => setShowEmojiPicker(prev => !prev)}>{<EmojiIcon />}</button>
                            )}
                            <textarea
                                ref={textareaRef}
                                className="text-area"
                                type="text"
                                placeholder="Add a comment"
                                value={comment}
                                onChange={handleCommentChange}
                            />
                            {comment && (
                                <button className=".send" onClick={handleCommentSubmit}>
                                    Post
                                </button>
                            )}
                            {type === 'post-preview' && (
                                <button onClick={() => setShowEmojiPicker(prev => !prev)}>{<EmojiIcon />}</button>
                            )}
                            <EmojiPicker
                                onSelect={handleEmojiSelect}
                                showEmojiPicker={showEmojiPicker}
                                setShowEmojiPicker={setShowEmojiPicker}
                            />
                        </div>
                    </div>
                    {type === 'deteiled' && (
                        <div className="close-dteiled-post" onClick={() => navigate(-1)}>
                            {<WhiteX />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function WhiteX() {
    return (
        <svg
            aria-label="Close"
            className="x1lliihq x1n2onr6 x9bdzbf"
            fill="currentColor"
            height="18"
            role="img"
            viewBox="0 0 24 24"
            width="18"
        >
            <title>Close</title>
            <polyline
                fill="none"
                points="20.643 3.357 12 12 3.353 20.647"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
            ></polyline>
            <line
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                x1="20.649"
                x2="3.354"
                y1="20.649"
                y2="3.354"
            ></line>
        </svg>
    )
}

function ShareIcon() {
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
    )
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
    )
}

function LikeIcon() {
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
    )
}

function UnlikeIcon() {
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
    )
}

function Save() {
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
    )
}

function Dots() {
    return (
        <svg
            aria-label="More options"
            className="x1lliihq x1n2onr6 x5n08af"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
        >
            <title>More options</title>
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
    )
}
