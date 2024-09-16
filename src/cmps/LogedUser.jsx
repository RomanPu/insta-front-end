import { changeName } from "../store/logeduser.actions";
import { useSelector } from 'react-redux'
import { useEffect } from "react";


export function LogedUser(){
    const name = useSelector(storeState => storeState.logedUserModule.name)

    // useEffect (()=>{
        
    //     console.log("here")
    // },[])

    if( name != "romansky") changeName("romansky")

    //console.log("here")
    
    return <div>user name {name}</div>

}