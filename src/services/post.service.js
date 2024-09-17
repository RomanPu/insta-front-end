import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const postService = {
    query,
    save,
    remove,
    getById,
    createPost,
    getDefaultFilter,
    getFilterFromSearchParams
}

const STORAGE_KEY = 'posts'

_createPosts()
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

function save(postToSave) {
    if (postToSave.id) {
        return storageService.put(STORAGE_KEY, postToSave)
    } else {
        postToSave.isPublished = false
        return storageService.post(STORAGE_KEY, postToSave)
    }
}

function createPost(author = '', category = '', likes = 0) {
    return {
        author,
        likes,
        category
    }
}

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
        posts = [
            { id: 'p1', author: 'John Doe', likes: 100, category: 'Technology' },
            { id: 'p2', author: 'Jane Smith', likes: 80, category: 'Cooking' },
            { id: 'p3', author: 'Alice Johnson', likes: 100, category: 'Travel' },
            { id: 'p4', author: 'Bob Brown', likes: 40, category: 'Office' },
            { id: 'p5', author: 'Charlie Black', likes: 40, category: 'Cooking' }
        ]
        utilService.saveToStorage(STORAGE_KEY, posts)
    }
}