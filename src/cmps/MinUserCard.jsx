import { Avatar } from "./Avatar";
import React from "react";
import { utilService } from "../services/util.service";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserById } from '../store/users/users.actions'


export function MinUserCard({user, time = ""}) {
    const navigate = useNavigate();
    const {_id} = useSelector(storeState => storeState.logedUserModule.logedUser)
    const {following,}= getUserById(_id)
    // const author = utilService.getUserById(user._id)
    const [isFollowed, setIsFollowed] = useState(following.map(like => like === user._id).includes(true));


    // useEffectUpdate(() => { 
    //     if (isFollowed) {
    //       editPost({...post, likes: [...likes, user._id]})
    //     }
    //     else {
    //       editPost({...post, likes: likes.filter(like => like !== user._id)})
    //     }
    // },[isFollowed])

    function onChangeFollow(){
        setIsFollowed(prev => !prev)
        console.log('follow', followers)
      }

    return <a onClick={ () => navigate(`../instush/profile/${user._id}`) }><div className= {`min-user-card`} >
                <Avatar  picUrl = {user.avatarPic}/>
                <h1>{user.name}</h1>
                {time && <h2>{utilService.createPostTimeFormat(time)}</h2>}
                {isFollowed && <botton className = "followed">Followed</botton>}
                {!isFollowed && <botton className = "follow">Follow</botton>}
                 </div>
            </a>
}