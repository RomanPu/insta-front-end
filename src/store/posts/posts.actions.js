import { SET_POSTS, EDIT_POST , ADD_POST} from "./posts.reducer"
import { store } from '../store'
import { postService } from '../../services/post.service'


export async function LoadPosts() {
    try {
        const newPosts = await postService.query()
        const savedPosts = await postService.saveAll(newPosts)
        store.dispatch({type: SET_POSTS,posts: savedPosts})  
    } catch (error) {     
        throw error
    }
}

export async function setPosts(newPosts) {
    try {
        store.dispatch({type: SET_POSTS, posts: newPosts})  
    } catch (error) {      
        throw error
    }
}

export async function editPost(post) {
    try {
            const savedPost = await postService.save(post)   
            store.dispatch({type: EDIT_POST, post: {...savedPost}})
                  
    } catch (error) {     
        throw error
    }
}

export async function addPost(post) {
    try {
        const savedPost = await postService.save(post)   
        store.dispatch({type: ADD_POST, post: savedPost})
    } catch (error) {     
        throw error
    }
}