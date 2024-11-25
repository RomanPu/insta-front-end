import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate, Link } from 'react-router-dom'
import { userService } from '../services/user.service'
import { showErrorMsg } from '../services/event-bus.service'
import { switchUser } from '../store/logedUser/loged.user.actions'
import { logout } from '../store/logedUser/loged.user.actions'

import logo from '../assets/imgs/Sticker.png'

export function LoginModal({layout = ""}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { type} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (type === 'pop-up') document.body.classList.add('no-scroll')
        return () => document.body.classList.remove('no-scroll')

    }, [])

    async function onLogin(ev) {
        ev.preventDefault()

        try {
            const user = await userService.login({username, password})
            // console.log('user:', user)
            await switchUser(user)
            navigate('/')
            // console.log('Logged in:', user)
        } catch (err) {
            showErrorMsg(`Cannot login`)
        } 
    }

    function onUsernameChange(ev) {
        setUsername(ev.target.value)
    }

    function onPasswordChange(ev) {
        setPassword(ev.target.value)
    }

    function onLogOut(ev) {
        ev.preventDefault()
        console.log('logging out')

        logout()
        navigate('/login')
    }

    return (
        <div className= {`login-modal ${type} ${layout}`}>
            <div className='close' onClick={() => navigate(-1)}>{<BlackX />}</div>
            <img className = {logo} src={logo} alt="Instagram Logo" />
            <form onSubmit = {onLogin}>
                <label className={!username && "no-txt"} htmlFor="username">
                    <span className='username-p-holder'>Phone number, username, or email</span>
                    <input className={username && "no-txt"} onChange = {onUsernameChange} type="text" placeholder="Phone number, username, or email" />
                </label>
                <label className={!password && "no-txt"} htmlFor="password">
                    <span className='password-p-holder'>Password</span>
                    <input onChange = {onPasswordChange}type="password" placeholder="Password" />
                </label>
                <button>Log in</button>
                {type === 'pop-up' && <button className='logout' onClick= {onLogOut}>Log out</button>}
            </form>
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