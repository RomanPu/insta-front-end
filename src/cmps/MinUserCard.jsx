import { Avatar } from "./Avatar";
import React from "react";
import { utilService } from "../services/util.service";

export function MinUserCard({user}) {
    return <div className= {`min-user-card`} >
                <Avatar />
                <h1>{user.name}</h1>
                <h2>{utilService.createPostTimeFormat(user.createdAt)}</h2>
                <h3>Folowed</h3>
            </div>
}