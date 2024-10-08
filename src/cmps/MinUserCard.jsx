import { Avatar } from "./Avatar";
import React from "react";
import { utilService } from "../services/util.service";
import { useNavigate } from "react-router-dom";

export function MinUserCard({user, time = ""}) {
    const navigate = useNavigate();
    return <a onClick={ () => navigate(`../instush/profile/${user._id}`) }><div className= {`min-user-card`} >
                <Avatar  picUrl = {user.avatarPic}/>
                <h1>{user.name}</h1>
                {time && <h2>{utilService.createPostTimeFormat(time)}</h2>}
                {/* <h3>Folowed</h3> */}
                 </div>
            </a>
}