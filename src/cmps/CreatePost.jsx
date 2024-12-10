import { createPost } from '../store/posts/posts.actions'
import { useSelector } from 'react-redux'
import { useState, useRef } from 'react'
import { uploadService } from '../services/img.upload.service'
import { EmojiIcon, EmojiPicker } from './ImojiPicker'
import { Link, useNavigate } from 'react-router-dom'

export function CreatePost() {
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const [state, setState] = useState('pic-select')
    const [gImgUrl, setGImgUrl] = useState(null)
    const [post, setPost] = useState('')
    const navigate = useNavigate()

    function getImgUrl(imgUrl) {
        setGImgUrl(imgUrl.secure_url)
        // setState(prev => prev ="pic-crop")
    }

    async function onCreatePost() {
        await createPost(logedUser, post, gImgUrl)
        navigate('/')
    }

    return (
        <div className="create-post">
            <div className="create-post-conteiner">
                <Link to={'/'}>
                    <div className="close">{<WhiteX />}</div>
                </Link>
                {state === 'pic-post' && (
                    <div className="header">
                        <span onClick={() => setState('pic-select')}>
                            <BackIcon />
                        </span>
                        <h1>Create new post</h1>
                        <button onClick={() => onCreatePost()}>Share</button>
                    </div>
                )}
                {state === 'pic-select' && (
                    <div className="left">
                        <PicSelect getImgUrl={getImgUrl} setState={setState} />
                    </div>
                )}
                {/* {state === "pic-crop" && <div className='left'> 
                    <PicCrop imgUrl = {gImgUrl} setState={setState}/></div>} */}
                {state === 'pic-post' && (
                    <div className="left">
                        <img src={gImgUrl} alt="no"></img>
                    </div>
                )}
                {state === 'pic-post' && (
                    <div className="right">
                        <WritePost logedUser={logedUser} post={post} setPost={setPost} />{' '}
                    </div>
                )}
            </div>
        </div>
    )
}

function PicCrop({ imgUrl, setState }) {
    return (
        <div className="pic-crop">
            <div className="header">
                <span onClick={() => setState('pic-select')}>
                    <BackIcon />
                </span>
                <h1>Crop</h1>
                <button onClick={() => setState('pic-filter')}>
                    <BackIcon />
                    Next
                </button>
            </div>
            <img src={imgUrl.secure_url} alt={'fdf'}></img>
        </div>
    )
}

function WritePost({ setPost, post, logedUser }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [count, setCount] = useState(0)
    const textareaRef = useRef(null)

    function handleEmojiSelect(e) {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        setPost(prev => prev + emoji)
    }

    function handleCommentChange(event) {
        setPost(event.target.value)
        setCount(event.target.value.length)
    }
    // const [comment, setComment] = useState('');
    return (
        <div className="write-post">
            <div className="header">
                <Avatar picUrl={logedUser.avatarPic} />
                <h1>{logedUser.username}</h1>
            </div>
            {showEmojiPicker && (
                <div className="emoji-picker">
                    <EmojiPicker
                        onSelect={handleEmojiSelect}
                        showEmojiPicker={showEmojiPicker}
                        setShowEmojiPicker={setShowEmojiPicker}
                    />
                </div>
            )}
            <div className="comment-section">
                <textarea
                    ref={textareaRef}
                    className="text-area"
                    type="text"
                    placeholder=""
                    value={post}
                    onChange={handleCommentChange}
                />
                <div className="emoji-and-count">
                    <button onClick={() => setShowEmojiPicker(prev => !prev)}>{<EmojiIcon />}</button>
                    <span>{count}/2,200</span>
                </div>
            </div>
        </div>
    )
}

function PicSelect({ getImgUrl, setState }) {
    const fileInputRef = useRef(null)
    const [loading, setLoading] = useState(false)

    function onSelectImg() {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    async function onFileChange(event) {
        const file = event.target.files[0]
        if (file) {
            setLoading(true)
            let imgUrl = await uploadService.uploadImg(file)
            setLoading(false)
            getImgUrl(imgUrl)
            setState('pic-post')
        }
    }
    return (
        <div className="pic-select">
            <h1>Create new post</h1>
            <div className="pic-select-conteiner">
                {loading ? <div className='loader'></div> :<MediaIcon />}
                {!loading && <h2>Drag photos and videos here</h2>}
                {!loading && <button onClick={onSelectImg} type="button">
                    Select from computer
                </button>}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={onFileChange}
                    accept="img/*"
                    id="imgUpload"
                />
            </div>
            {/* {selectOn && <ImgUploader/>} */}
        </div>
    )
}

function MediaIcon() {
    return (
        <svg
            aria-label="Icon to represent media such as images or videos"
            className="x1lliihq x1n2onr6 x5n08af"
            fill="currentColor"
            height="77"
            role="img"
            viewBox="0 0 97.6 77.3"
            width="96"
        >
            <title>Icon to represent media such as images or videos</title>
            <path
                d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                fill="currentColor"
            ></path>
            <path
                d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                fill="currentColor"
            ></path>
            <path
                d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                fill="currentColor"
            ></path>
        </svg>
    )
}

import React from 'react'
import { Avatar } from './Avatar'

function BackIcon() {
    return (
        <svg
            aria-label="Back"
            className="x1lliihq x1n2onr6 x5n08af"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
        >
            <title>Back</title>
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="2.909"
                x2="22.001"
                y1="12.004"
                y2="12.004"
            ></line>
            <polyline
                fill="none"
                points="9.276 4.726 2.001 12.004 9.276 19.274"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            ></polyline>
        </svg>
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
