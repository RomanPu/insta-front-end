import { useParams } from 'react-router'
import { useEffect, useState, useRef } from 'react'
import { MinUserCard } from './MinUserCard'
import { Avatar } from './Avatar'
import { EmojiPicker, EmojiIcon } from './imojiPicker'
import { editMessage } from '../store/logedUser/loged.user.actions'
import { useSelector } from 'react-redux'
import { utilService } from '../services/util.service'
import { Link } from 'react-router-dom'
import { Loader } from './Loader'

export function MessengerChat() {
    const chatId = useParams()._id
    const [msg, setMsg] = useState('')
    const chat = useSelector(storeState => storeState.logedUserModule.messages.filter(msg => msg._id === chatId)[0])
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)

    setAsRead()

    async function setAsRead() {
        chat.correspandents = chat.correspandents.filter(correspandent => correspandent._id !== logedUser._id)
        if (!chat.isRead.some(isRead => isRead.id === logedUser._id)) {
            await editMessage(chat)
        }
        utilService.saveToStorage('currentMsg', chat._id)
    }

    async function onSendMsg() {
        if (!msg) return
        chat.messages.push({ author: logedUser._id, content: msg, createdAt: Date.now() })
        await editMessage(chat)
        setMsg('')
    }

    if (!chat) return <Loader isLoaderOn={true} />
    console.log(chat)
    return (
        <div className="messenger-chat-conteiner">
            <div className="messenger-chat-header">
                <MinUserCard user={chat.correspandents[0]} followButton={false} />
            </div>
            <div className="corespandent-profile">
                <div className="profile-avatar">
                    <Avatar picUrl={chat.correspandents[0].avatarPic} />
                </div>
                <h1>{chat.correspandents[0].fullname}</h1>
                <h2>{chat.correspandents[0].username}</h2>
                <Link to={`../../../profile/${logedUser._id}`} className="view-profile-btn">
                    View profile
                </Link>
            </div>
            <div className="messenger-chat-messages">
                {chat.messages.map((msg, idx) => (
                    <Message key={idx} msg={msg} logedUserId={logedUser._id} />
                ))}
            </div>
            <WriteMsg setMsg={setMsg} msg={msg} sendMsg={onSendMsg} />
        </div>
    )
}

function Message({ msg, logedUserId }) {
    const correspandent = useSelector(storeState => storeState.usersModule.users.find(user => user._id === msg.author))
    return (
        <div className={`message ${logedUserId === correspandent._id ? 'my-message' : 'correspandent-message'}`}>
            <Avatar picUrl={correspandent.avatarPic} />
            <div className="message-content">
                <p>{msg.content}</p>
            </div>
        </div>
    )
}

const MessengerIcon = () => (
    <svg
        aria-label=""
        className="x1lliihq x1n2onr6 x5n08af"
        fill="currentColor"
        height="96"
        role="img"
        viewBox="0 0 96 96"
        width="96"
    >
        <title></title>
        <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z"></path>
    </svg>
)

function WriteMsg({ setMsg, msg, sendMsg }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const textareaRef = useRef(null)

    function handleEmojiSelect(e) {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        setMsg(prev => prev + emoji)
    }

    function handleCommentChange(event) {
        setMsg(event.target.value)
    }

    return (
        <div className="write-msg">
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
                <button onClick={() => setShowEmojiPicker(prev => !prev)}>{<EmojiIcon />}</button>
                <textarea
                    ref={textareaRef}
                    className="text-area"
                    type="text"
                    placeholder="Message..."
                    value={msg}
                    onChange={handleCommentChange}
                />
                {msg && (
                    <button className="send-msg-btn" onClick={sendMsg}>
                        Send
                    </button>
                )}
            </div>
        </div>
    )
}
