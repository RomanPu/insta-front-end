import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import {LoadPosts, setPosts, addPost} from '../store/posts/posts.actions'

export const postService = {
    query,
    save,
    remove,
    getById,
    createPost,
    getDefaultFilter,
    getFilterFromSearchParams,
    saveAll,
    createComment,
    createPost
}

const STORAGE_KEY = 'posts'

// _createPosts()

async function query(filterBy) {
    try {
        let posts = await storageService.query(STORAGE_KEY)
        if (filterBy) {
            const { minLikes = 0, author = '', category = '' } = filterBy
            posts = posts.filter(post =>
                post.category.toLowerCase().includes(category.toLowerCase()) &&
                post.author.toLowerCase().includes(author.toLowerCase()) &&
                post.likes >= minLikes
            )
        }
        return posts
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

async function saveAll(postsToSave) {
    let savedPosts = []
    //console.log('postsToSave:', postsToSave)
    for (const postToSave of postsToSave) {
        //console.log('postToSave:', postToSave)
        if (postToSave._id) {
            savedPosts.push( await storageService.put(STORAGE_KEY, postToSave))
        } else {
            savedPosts.push(await storageService.post(STORAGE_KEY, postToSave))
        }
    }
    return savedPosts
}

function save(postToSave) {
    if (postToSave._id) {
        return storageService.put(STORAGE_KEY, postToSave)
    } else {
        return storageService.post(STORAGE_KEY, postToSave)
    }
}

// function createPost(author = '', category = '', likes = 0) {
//     return {
//         author,
//         likes,
//         category
//     }
// }

function getDefaultFilter() {
    return {
        category: '',
        minLikes: 0,
        author: ''
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }

    return filterBy
}

function _createPosts() {
    let posts = utilService.loadFromStorage(STORAGE_KEY)
    if (!posts || !posts.length) {
         posts = ([
            { _id: '', author: 'John Doe', likes: [], category: 'Technology', 
                comments:[],
                 createdAt: utilService.randomPastTime(), body: 'This is a post about technologyyyyyyyyyyyyyyyyy' , picUrl: urlPic },
            { _id: '', author: 'Jane Smith', likes: [], category: 'Cooking' , comments: [],
                 createdAt: utilService.randomPastTime(), body: 'This is a post about cooking', picUrl: urlPic  },
            { _id: '', author: 'Alice Johnson', likes: [], category: 'Travel', comments: [],
                 createdAt: utilService.randomPastTime() , body:  'This is a post about travel', picUrl: urlPic },
            { _id: '', author: 'Bob Brown', likes: [], category: 'Office', comments: [],
                 createdAt: utilService.randomPastTime() , body: 'This is a post about office', picUrl: urlPic },
            { _id: '', author: 'Charlie Black', likes: [], category: 'Cooking', comments: [],
                 createdAt: utilService.randomPastTime(), body: 'This is a post about cooking', picUrl: urlPic },
        ])
        LoadPosts(posts)
    }
    setPosts(posts)
}

async function  createPost(user, body, urlPic) {
    let post = { _id: '', author: user.userName, userId: user._id, likes: [], category: 'Technology', 
        comments:[],
         createdAt: utilService.randomPastTime(), body: body, picUrl: urlPic }
         await addPost(post)
}

// [{author: "tony", userId: "", _Id: "1sfsdgd", body: "very good!!", likedList: [], createdAt: 1632872400000},
// {author: "sharony", userId: "", _Id: "cdfg", body: "not bad", likedList: [], createdAt: 1632872400000}]

function createComment(author, body, authorId, authorAvatar) {
    return {
        author,
        body,
        authorId,
        authorAvatar,
        createdAt: Date.now(),
        likedList: [],
        _id: utilService.makeId()
    }
}