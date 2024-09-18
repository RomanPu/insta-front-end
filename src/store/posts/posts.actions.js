import { SET_POSTS, EDIT_POST , ADD_POST} from "./posts.reducer"
import { store } from '../store'
import { postService } from '../../services/post.service'

export function addPost(newPost) {
    store.dispatch({type: ADD_POST,post: newPost})  
}

export async function LoadPosts(newPosts) {
    try {
        console.log('newPosts:', newPosts)
        const savedPosts = await postService.saveAll(newPosts)
        store.dispatch({type: SET_POSTS,posts: savedPosts})  
    } catch (error) {     
        console.log('failed to load posts:', error)
        throw error
    }
}

export async function setPosts(newPosts) {
    try {
        store.dispatch({type: SET_POSTS, posts: newPosts})  
    } catch (error) {      
        console.log('failed to set posts:', error)
        throw error
    }
}

export async function editPost(post) {
    try {
            // postService.save(post)
            store.dispatch({type: EDIT_POST, post: post})
    } catch (error) {     
        console.log('failed to load posts:', error)
        throw error
    }
}