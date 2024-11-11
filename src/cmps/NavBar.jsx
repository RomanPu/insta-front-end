import React from "react"
import { useState } from "react"
import { NavBarAction } from "./NavBarAction"
import {
  HomeIcon,
  SearchIcon,
  ExploreIcon,
  ReelsIcon,
  MessengerIcon,
  NotificationsIcon,
  NewPostIcon,
  SettingsIcon,
} from "../assets/imgs/NavBarSvgs"
import { Avatar } from "./Avatar"
import { useSelector } from "react-redux"
import poster from "../assets/imgs/Sticker.png"
import { useLocation } from "react-router"

import { InstagramLogo } from "../assets/imgs/LogoSvgs"

export function NavBar() {
  const logedUser = useSelector(
    (storeState) => storeState.logedUserModule.logedUser,
  )
  const location = useLocation()
  const [corrPage, setCorrPage] = useState("home")
  // var isSelctedArr = [false, false, false, false, false, false, false, false, false]
  const pageNameArr = [
    "search",
    "explore",
    "reels",
    "messeges",
    "notifications",
    "create",
    `profile`,
    "more",
  ]

  React.useEffect(() => {
    const page =
      pageNameArr.find((pageName) => location.pathname.includes(pageName)) ||
      "home"
    setCorrPage(page)
  }, [location])

  return (
    <ul className="nav-bar">
      <div key={"ins-logo"} className="insta-logo">
        <img src={poster} alt="Instagram Logo" />
      </div>
      <li className={corrPage === "home" ? "bold" : ""} key={"home"}>
        <NavBarAction name={"Home"} link={"/"} icon={<HomeIcon />} />
      </li>
      <li className={corrPage === "search" ? "bold" : ""} key={"search"}>
        <NavBarAction name={"Search"} icon={<SearchIcon />} />
      </li>
      <li className={corrPage === "explore" ? "bold" : ""} key={"explore"}>
        <NavBarAction
          name={"Explore"}
          icon={<ExploreIcon />}
          link={"/explore"}
        />
      </li>
      <li className={corrPage === "reels" ? "bold" : ""} key={"reels"}>
        <NavBarAction name={"Reels"} icon={<ReelsIcon />} />
      </li>
      <li className={corrPage === "messeges" ? "bold" : ""} key={"messeges"}>
        <NavBarAction name={"Messeges"} icon={<MessengerIcon />} />
      </li>
      <li
        className={corrPage === "notifications" ? "bold" : ""}
        key={"notifications"}
      >
        <NavBarAction name={"Notifications"} icon={<NotificationsIcon />} />
      </li>
      <li className={corrPage === "create" ? "bold" : ""} key={"create"}>
        <NavBarAction
          name={"Create"}
          icon={<NewPostIcon />}
          link={"/createpost"}
        />
      </li>
      <li className={corrPage === "profile" ? "bold" : ""} key={"profile"}>
        <NavBarAction
          name={"Profile"}
          link={`/profile/${logedUser._id}`}
          icon={<Avatar picUrl={logedUser.avatarPic} />}
        />
      </li>
      <li className={corrPage === "more" ? "bold" : ""} key={"more"}>
        <NavBarAction name={"More"} icon={<SettingsIcon />} />
      </li>
    </ul>
  )
}
