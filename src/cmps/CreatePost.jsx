import { postService} from '../services/post.service'
import { useSelector } from 'react-redux'
import { useState ,useEffect} from 'react';

export function CreatePost(){
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    const [state , setState] = useState("pic-select")

    // useEffect(() => {
    //     console.log('logedUser', logedUser)
    // }, [])


    // postService.createPost(logedUser)
    return (
        <div className="create-post">
            <div className="create-post-conteiner">
                {state === "pic-select" && <div className='left'> <PicSelect/></div>}
                {null && <div className='right'> </div>}
            </div>
        </div>
    )
}

function PicSelect(){
    return (
        <div className="pic-select">
            <h1>Choose a photo</h1>
            <div className="pic-select-conteiner">
                <div className="pic-select-item">
                    <img src="" alt=""/>
                </div>
            </div>
        </div>
    )
}