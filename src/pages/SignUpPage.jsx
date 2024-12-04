import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useNavigate , Link} from 'react-router-dom'
import { userService } from '../services/user.service'
import { showErrorMsg } from '../services/event-bus.service'
import { switchUser } from '../store/logedUser/loged.user.actions'
import { addUser } from '../store/users/users.actions'

import logo from '../assets/imgs/Sticker.png'

export function SignUpPage({layout = ""}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const { type} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (type === 'pop-up') document.body.classList.add('no-scroll')
        return () => document.body.classList.remove('no-scroll')

    }, [])

    async function onSignUp(ev) {
        ev.preventDefault()

        try {
            const user = await userService.signup({username, password, email, fullname})
            addUser(user)
            await switchUser(user)
            navigate('/')
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

    function onFullnameChange(ev) {
        setFullname(ev.target.value)
    }

    function onEmailChange(ev) {
        setEmail(ev.target.value)
    }

    return (
        <div className='signup-page'>
            <div className= {`signup-modal`}>
                <img className = {logo} src={logo} alt="Instagram Logo" />
                <h1>Sign up to see photos and videos from your friends.</h1>
                <form onSubmit = {onSignUp}>
                    <label className={!email && "no-txt"} htmlFor="username">
                        <span className='email-p-holder'>Mobile number or email</span>
                        <input className={email && "no-txt"} onChange = {onEmailChange} type="text" placeholder="Mobile number or email"/>
                    </label>
                    <label className={!password && "no-txt"} htmlFor="password">
                        <span className='password-p-holder'>Password</span>
                        <input onChange = {onPasswordChange}type="password" placeholder="Password" />
                    </label>
                    <label className={!fullname && "no-txt"} htmlFor="username">
                        <span className='fullname-p-holder'>Full Name</span>
                        <input className={fullname && "no-txt"} onChange = {onFullnameChange} type="text" placeholder="Full Name" />
                    </label>
                    <label className={!username && "no-txt"} htmlFor="username">
                        <span className='username-p-holder'>Username</span>
                        <input className={username && "no-txt"} onChange = {onUsernameChange} type="text" placeholder="Username" />
                    </label>
                    <button>Sign up</button>
                </form>
            </div>
            <div className="login-link">
                <p>Have an account? <Link to = {"../login"} rel="stylesheet" href="" >Log in</Link></p>
            </div>
        </div>
    )
}
