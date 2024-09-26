import { Avatar } from "./Avatar";
import React from "react";
import { utilService } from "../services/util.service";

export function MinUserCard({user, type = 'posts-preview'}) {
    return <div className= {`min-user-card`} >
                <div className= {type} >
                    <Avatar />
                    <h1>{user.name}</h1>
                    <h2>{utilService.createPostTimeFormat(user.date)}</h2>
                    <h3>{user.followed}</h3>
                </div>
            </div>
}