import { SET_POSTS, EDIT_POST , ADD_POST} from "./posts.reducer"
import { store } from '../store'
import { postService } from '../../services/post.service'


export async function LoadPosts() {
    try {
        const newPosts = await postService.query()
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
            const savedPost = await postService.save(post)   
            console.log('edit', savedPost)
            store.dispatch({type: EDIT_POST, post: {...savedPost}})
                  
    } catch (error) {     
        console.log('failed to load posts:', error)
        throw error
    }
}

export async function addPost(post) {
    try {
        const savedPost = await postService.save(post)   
        console.log('edit', savedPost)
        store.dispatch({type: ADD_POST, post: savedPost})             
    } catch (error) {     
        console.log('failed to load posts:', error)
        throw error
    }
}