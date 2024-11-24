import { SET_POSTS, EDIT_POST, ADD_POST } from './posts.reducer'
import { store } from '../store'
import { postService } from '../../services/post.service'
import { utilService } from '../../services/util.service'
import io from 'socket.io-client'

const socket = io('http://localhost:3030') // Replace with your server URL

export async function LoadPosts() {
    try {
        const newPosts = await postService.query()
        store.dispatch({ type: SET_POSTS, posts: newPosts})
    } catch (error) {
        throw error
    }
}

export async function setPosts(newPosts) {
    try {
        store.dispatch({ type: SET_POSTS, posts: newPosts })
    } catch (error) {
        throw error
    }
}

export async function editPost(post) {
    try {
        socket.emit('notification', "like your comment like allot!!!")
        const savedPost = await postService.save(post)
        store.dispatch({ type: EDIT_POST, post: { ...savedPost } })
        console.log("before emit")
        // socket.off('notification')
    } catch (error) {
        throw error
    }
}

export async function addPost(post) {
    try {
        const savedPost = await postService.save(post)
        store.dispatch({ type: ADD_POST, post: savedPost })
    } catch (error) {
        throw error
    }
}

export async function createPost(user, body, urlPic) {
    let post = {
        _id: '',
        author: user.username,
        userId: user._id,
        likes: [],
        category: 'Technology',
        comments: [],
        createdAt: utilService.randomPastTime(),
        body: body,
        picUrl: urlPic
    }
    await addPost(post)
}

export function getPostById(id) {
    return store.getState().postsModule.posts.find(post => post._id === id)
}
