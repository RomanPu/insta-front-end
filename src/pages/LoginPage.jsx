import { LoginModal } from '../cmps/LoginModal'
import { Link } from 'react-router-dom'

export function LoginPage() {
    return (
        <div className="login-conteiner">
            <div className="intro-img">
                <div className="img-conteiner">
                    <img
                        src="https://www.instagram.com/static/images/homepage/screenshot1-2x.jpg/9144d6673849.jpg"
                        alt="Instagram"
                    />
                </div>
            </div>
            <div className="login-secetion">
                <LoginModal layout={'page-view'} />
                <div className="sign-up">
                    <p>
                        Don't have an account?{' '}
                        <Link to={'../signup'} rel="stylesheet" href="">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
