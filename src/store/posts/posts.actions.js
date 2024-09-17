import { ADD_POST , LOAD_POSTS} from "./posts.reducer"
import { store } from '../store'
import { postService } from '../../services/post.service'

export function addPost(newPost) {
    store.dispatch({type: ADD_POST,post: newPost})  
}

export async function LoadPosts(newPosts) {
    try {
        console.log('newPosts:', newPosts)
        const savedPosts = await postService.saveAll(newPosts)
        store.dispatch({type: LOAD_POSTS,posts: savedPosts})  
    } catch (error) {     
        console.log('failed to load posts:', error)
        throw error
    }
}