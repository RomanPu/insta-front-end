import { Link, NavLink, useNavigate } from 'react-router-dom'

export function NavBar(){
    return <nav>
    <NavLink to='/instush' >Home</NavLink>
    <NavLink to='/instush/profile' >profile</NavLink>
    <NavLink to='/instush/messenger' >messenger</NavLink>
</nav>
}
