import React from 'react';
import { Avatar } from '../cmps/Avatar';
import { useSelector } from 'react-redux';
import { useState } from 'react';


export function EditProfile() {
    const [count, setCount] = useState(0)
    const [bio, setBio] = useState('')
    const loggedUser = useSelector(storeState => storeState.logedUserModule.logedUser);

    function handleCommentChange(event) {
        setBio(event.target.value)
        setCount(event.target.value.length)
    }

    return (
        <div className="edit-profile-layout">
            <div className="edit-profile-conteiner">
                <h1>Edit Profile</h1>
                <div className = 'user-card-conteiner'>
                    <div className="user-card" >
                        <Avatar picUrl={loggedUser.avatarPic} />
                        <div className="user-info">
                            <h1>{loggedUser.username}</h1>
                            <p>{loggedUser.username}</p>
                        </div>
                        <button>Change photo</button>       
                    </div> 
                    <div className="write-bio">
                        <textarea
                            // ref={textareaRef}
                            className="text-area"
                            type="text"
                            placeholder="Bio"
                            value={bio}
                            onChange={handleCommentChange}
                        />
                        <div className="emoji-and-count">
                            <span>{count}/150</span>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}