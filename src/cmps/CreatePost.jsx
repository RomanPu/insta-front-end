import { postService} from '../services/post.service'
import { useSelector } from 'react-redux'

export function CreatePost(){
    const logedUser = useSelector(storeState => storeState.logedUserModule.logedUser)
    console.log('CreatePost',logedUser)
    postService.createPost(logedUser)
    return (
        <div className="create-post">
            created post!!!!!
        </div>
    )
}