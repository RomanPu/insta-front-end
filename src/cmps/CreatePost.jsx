import { postService} from '../services/post.service'
import { useSelector } from 'react-redux'

export function CreatePost(){
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    postService.createPost(logedUser)
    //console.log('CreatePost')
    return (
        <div className="create-post">
            created post!!!!!
        </div>
    )
}