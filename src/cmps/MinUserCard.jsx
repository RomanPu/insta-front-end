import { Avatar } from "./Avatar";
import React from "react";
import { utilService } from "../services/util.service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { getUserById ,editUser} from '../store/users/users.actions'
import { useEffectUpdate } from "../customHooks/useEffectUpdate";


export function MinUserCard({user, time = "", followButton = true}) {
    const navigate = useNavigate();
    const {_id} = useSelector(storeState => storeState.logedUserModule.logedUser)
    const author = useSelector(storeState => storeState.usersModule.users.find(u => u._id === user._id))
    const loggedUser = useSelector(storeState => storeState.usersModule.users.find(user => user._id === _id))
    const [isFollowed, setIsFollowed] = useState( loggedUser.following.map(follow => follow === author._id).includes(true))
    
    useEffectUpdate(() => { 
        if(isFollowed && !loggedUser.following.map(like => like === user._id).includes(true)){
            editUser({...author, followers: [...author.followers, _id]})
            editUser({...loggedUser, following: [...loggedUser.following, author._id]})
        }
        else {
            editUser({...loggedUser, following: loggedUser.following.filter(follow => follow !== _id)})
        }
    },[isFollowed])

    useEffect(() => { 
        setIsFollowed(prev => prev = loggedUser.following.map(follow => follow === author._id).includes(true))
    },[loggedUser])

    function onChangeFollow(){
        setIsFollowed(prev => !prev)
    }

    return <div className= {`min-user-card`}>
                <a onClick={ () => navigate(`../instush/profile/${author._id}`) }> 
                    <Avatar  picUrl = {author.avatarPic}/>
                    <h1>{author.name}</h1>
                </a>
                {time && <h2>{utilService.createPostTimeFormat(time)}</h2>}
                {isFollowed && followButton && <button onClick = {onChangeFollow} className = "followed">Followed</button>}
                {!isFollowed && followButton && <button onClick = {onChangeFollow} className = "follow">Follow</button>}
            </div>
}