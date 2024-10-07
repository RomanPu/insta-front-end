import { Link } from 'react-router-dom';

export function NavBarAction({icon = "", link = "instush", name = ""}) {
    console.log('action', link, name)
    return (
        <div className="nav-bar-action">
            <Link to={link} className="nav-bar-buttom-link">
                <div className="nav-bar-buttom-content">
                    <span className="nav-bar-icon">
                        {icon && icon}
                    </span>
                    <div className="nav-bar-buttom-name">
                        {name && name}
                    </div>
                </div>
            </Link>
        </div>
    )
}