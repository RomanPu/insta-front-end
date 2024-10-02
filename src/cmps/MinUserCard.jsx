import { Avatar } from "./Avatar";
import React from "react";
import { utilService } from "../services/util.service";

export function MinUserCard({user, time = ""}) {
    return <div className= {`min-user-card`} >
                <Avatar  picUrl = {user.avatarPic}/>
                <h1>{user.name}</h1>
                {time && <h2>{utilService.createPostTimeFormat(time)}</h2>}
                {/* <h3>Folowed</h3> */}
            </div>
}