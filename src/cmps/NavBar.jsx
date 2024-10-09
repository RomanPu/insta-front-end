import * as React from 'react';
import { NavBarAction} from './NavBarAction';
import { HomeIcon, SearchIcon, ExploreIcon, ReelsIcon, MessengerIcon, 
NotificationsIcon, NewPostIcon, SettingsIcon } from '../assets/imgs/NavBarSvgs';
import { Avatar } from './Avatar';
import { useSelector } from 'react-redux';


import { InstagramLogo } from '../assets/imgs/LogoSvgs';

export function NavBar() {
  const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
  console.log('nav bar log', logedUser)

  return <ul className="nav-bar" > 
            <div key={"ins-logo"} className='insta-logo'><InstagramLogo/></div>
            <li key={"home"}><NavBarAction name={"Home"} link={"instush"} icon={<HomeIcon />} /></li>
            <li key={"search"}><NavBarAction name={"Search"} icon={<SearchIcon />} /></li>
            <li key={"explore"}><NavBarAction name={"Explore"}  icon={<ExploreIcon/>}  link={"instush/explore"}/></li>
            <li key={"reels"}><NavBarAction name={"Reels"}  icon={<ReelsIcon />} /></li>
            <li key={"messeges"}><NavBarAction name={"Messeges"}  icon={<MessengerIcon />} /></li>
            <li key={"notifications"}><NavBarAction name={"Notifications"}  icon={<NotificationsIcon />} /></li>
            <li key={"create"}><NavBarAction name={"Create"}  icon={<NewPostIcon />} link={"instush/createpost"} /></li>
            <li key={"profile"}><NavBarAction name={"Profile"} link={`instush/profile/${logedUser._id}`} icon={<Avatar/>} /></li>
            <li key={"more"}><NavBarAction name={"More"}  icon={<SettingsIcon />} /></li>
  </ul>  
}