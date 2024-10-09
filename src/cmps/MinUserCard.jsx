import { Avatar } from "./Avatar";
import React from "react";
import { utilService } from "../services/util.service";
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import { useSelector } from "react-redux";
import { getUserById ,editUser} from '../store/users/users.actions'
import { useEffectUpdate } from "../customHooks/useEffectUpdate";


export function MinUserCard({user, time = ""}) {
    const navigate = useNavigate();
    const {_id} = useSelector(storeState => storeState.logedUserModule.logedUser)
    const loggedUser= getUserById(_id)
    const author = getUserById(user._id)
    const [isFollowed, setIsFollowed] = useState(loggedUser.following.map(like => like === user._id).includes(true));


    useEffectUpdate(() => { 
        if(isFollowed && !loggedUser.following.map(like => like === user._id).includes(true)){
            editUser({...author, followers: [...author.followers, _id]})
            editUser({...loggedUser, following: [...loggedUser.following, _id]})
        }
        else {
            editUser({...loggedUser, following: loggedUser.following.filter(follow => follow !== _id)})
        }
    },[isFollowed])

    function onChangeFollow(){
        setIsFollowed(prev => !prev)
    }

    return <div className= {`min-user-card`}>
                <a onClick={ () => navigate(`../instush/profile/${user._id}`) }> 
                    <Avatar  picUrl = {user.avatarPic}/>
                    <h1>{user.name}</h1>
                </a>
                {time && <h2>{utilService.createPostTimeFormat(time)}</h2>}
                {isFollowed && <button onClick = {onChangeFollow} className = "followed">Followed</button>}
                {!isFollowed && <button onClick = {onChangeFollow} className = "follow">Follow</button>}
            </div>
}