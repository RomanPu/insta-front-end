import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../services/user.service'
import { SearchBar } from './SearchBar'
import { MinUserCard } from './MinUserCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { messegeService } from '../services/messege.service'


export function CreateMsgModal() {
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const [result, setResult] = useState([])
    const [selected, setSelected] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        document.body.classList.add('no-scroll')
        return () => document.body.classList.remove('no-scroll')

    }, [])

    async function onCreateMsg() {
        console.log(selected)
        if (!selected.length) return
        const msgId = await messegeService.save({correspandents: 
            [...selected.map(user => user._id), logedUser._id]})
        navigate(`../chat/${msgId}`)
    }   

    // {
    //     "userId": "674714992f2842ab4aceacee",
    //     "body": "test",
    //     "owner": "674714992f2842ab4aceacee",
    //     "byUser": "6745d4876652dd4b3f7bc52a",
    //     "correspandent": "6745d4876652dd4b3f7bc52a"
    //   }

    function onSelectUser(ev, user) { 
        setSelected(prev => [...prev, user])
    }

    async function onSerach(search) {
        if (!search) return setResult([])
        const res = await userService.query({ username: search })
        setResult(res)
    }

    return (
        <div className= {`create-msg-modal`}>
            <div className="create-msg-header">
                <span className='place-holder'>r</span>
                <h1>New message</h1>
                <Link to={"../inbox"}><BlackX/></Link>
            </div>
            <div className="search-bar-conteiner">
                <span>To:</span>
                <div className="selected-users">
                    {selected.map(user => (
                        <div className='selected-user' key={user._id}>
                            <h2>{user.username}</h2>
                            <button onClick={() => setSelected(selected.filter(u => u._id !== user._id))}><BlueX/></button>
                        </div>
                    ))}
                </div>
                <SearchBar onSearch={onSerach} type = {"messenger"}/>
            </div>
            <div className="search-results">
                { result.length > 0 && <ul>
                    {result.map(user => (               
                        <li key={user._id}>
                            <button onClick={(ev) => onSelectUser(ev, {_id: user._id, username: user.username})}>
                                <MinUserCard user={user} type={'both'} followButton={false} />
                            </button>
                        </li>
                    ))}
                </ul>}
            </div>
            <button onClick={onCreateMsg} className={`pre-user-selct-btn ${!selected.length ? "" : "user-selected"}`}>Chat</button>
        </div>
    )
}

function BlackX() {
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
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
            ></polyline>
            <line
                fill="none"
                stroke="black"
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

function BlueX({ onClick }) {
    return (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="blue"
            cursor="pointer"
        >
            <path d="M18.3 5.71a1 1 0 00-1.42 0L12 10.59 7.12 5.71a1 1 0 00-1.42 1.42L10.59 12l-4.89 4.88a1 1 0 001.42 1.42L12 13.41l4.88 4.89a1 1 0 001.42-1.42L13.41 12l4.89-4.88a1 1 0 000-1.42z" />
        </svg>
    )
}