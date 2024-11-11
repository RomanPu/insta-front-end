import { Link } from "react-router-dom"

export function NavBarAction({ icon = "", link = "/", name = "" }) {
  return (
    <div className="nav-bar-action">
      <Link to={link} className="nav-bar-buttom-link">
        <div className="nav-bar-buttom-content">
          <span className="nav-bar-icon">{icon}</span>
          <div className="nav-bar-buttom-name">{name}</div>
        </div>
      </Link>
    </div>
  )
}
