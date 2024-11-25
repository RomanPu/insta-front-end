import { Avatar } from '../cmps/Avatar';
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import logo from '../assets/imgs/Sticker.png'
import { editUser } from '../store/users/users.actions';
import { useNavigate } from 'react-router-dom';
import { uploadService } from '../services/img.upload.service'


export function EditProfile() {
    const [count, setCount] = useState(0)
    const {_id}= useSelector(storeState => storeState.logedUserModule.logedUser);
    const loggedUser = useSelector(storeState => storeState.usersModule.users.find(user => user._id === _id));
    const [gImgUrl, setGImgUrl] = useState(loggedUser.avatarPic)
    const [bio, setBio] = useState(loggedUser.body)
    const navigate = useNavigate()
    const fileInputRef = useRef(null)

    function onSelectImg() {
        if (fileInputRef.current) {
            fileInputRef.current.click()
            console.log('clicked')
        }
    }

    async function onFileChange(event) {
        const file = event.target.files[0]
        if (file) {
            let imgUrl = await uploadService.uploadImg(file)
            setGImgUrl(imgUrl.secure_url)
        }
    }

    function handleCommentChange(event) {
        setBio(event.target.value)
        setCount(event.target.value.length)
    }

    function onSubmit() {
        // console.log(bio)
        editUser({...loggedUser , body: bio, avatarPic: gImgUrl})
        navigate(-1)
    }

    return (
        <div className="edit-profile-layout">
            <div className="edit-profile-conteiner">
                <h1>Edit Profile</h1>
                <div className = 'user-card-conteiner'>
                    <div className="user-card" >
                        <Avatar picUrl={gImgUrl} />
                        <div className="user-info">
                            <h1>{loggedUser.username}</h1>
                            <p>{loggedUser.username}</p>
                        </div>
                        <button onClick={onSelectImg}>Change photo</button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={onFileChange}
                            accept="img/*"
                            id="imgUpload"
                        />       
                    </div> 
                    <h3>Bio</h3>
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
                    <h3>Gender</h3>
                    <select name="gender-select">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                    </select> 
                    <button className='submit' onClick={onSubmit}>Submit</button>
                    <img className = {logo} src={logo} alt="Instagram Logo" />
                </div>
            </div>
        </div>
    )
}