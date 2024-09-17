import { changeName } from "../store/logedUser/loged.user.actions";
import { addUser } from "../store/users/users.actions";
import { addPost } from "../store/posts/posts.actions";
import { useSelector } from 'react-redux'
import { useEffect } from "react";


export function LogedUser(){
    const name = useSelector(storeState => storeState.logedUserModule.name)
  
    return <div className = "loged-user"> user name {name} </div>
}