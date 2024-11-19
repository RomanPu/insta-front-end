import { LoginModal } from "../cmps/LoginModal"
import { useState } from "react"

export function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false)
    return (
    <div className="login-conteiner">
        <div className="intro-img"> 
            <div className="img-conteiner">
                <img src="https://www.instagram.com/static/images/homepage/screenshot1-2x.jpg/9144d6673849.jpg" alt="Instagram"/>
            </div>
        </div>
        <div className="login-secetion">
            <LoginModal layout = {"page-view"}/>
            <div className="sign-up">
                <p>Don't have an account? <button onClick={() => setIsSignUp(true)} rel="stylesheet" href="" >Sign up</button></p>
            </div>
        </div>
    </div>)
}