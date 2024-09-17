import { changeName } from "../store/logedUser/loged.user.actions";
import { addUser } from "../store/users/users.actions";
import { addPost } from "../store/posts/posts.actions";
import { useSelector } from 'react-redux'
import { useEffect } from "react";


export function LogedUser(){
    const name = useSelector(storeState => storeState.logedUserModule.name)
    const users = useSelector(storeState => storeState.usersModule.names)
    const posts = useSelector(storeState => storeState.postsModule.posts)

    useEffect (()=>{
        console.log(users)
        changeName("romansky")
        addUser("shlomi")
        addPost("hYYYYYYYYYYYYYYY")
    },[])
    
    // if( name != "romansky") changeName("romansky")

    //console.log("here")
    
    return <div>
        <div>user name {name} </div>
        <div>users conected {users} </div> 
        <div>users conected {posts} </div>     
        </div>

}