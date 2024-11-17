import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
export const postService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getFilterFromSearchParams,
    saveAll,
    createComment
}

const STORAGE_KEY = 'posts'

async function query(filterBy) {
    try {
        let posts = await storageService.query(STORAGE_KEY)
        if (filterBy) {
            const { minLikes = 0, author = '', category = '' } = filterBy
            posts = posts.filter(
                post =>
                    post.category.toLowerCase().includes(category.toLowerCase()) &&
                    post.author.toLowerCase().includes(author.toLowerCase()) &&
                    post.likes >= minLikes
            )
        }
        return posts
    } catch (error) {
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
    for (const postToSave of postsToSave) {
        if (postToSave._id) {
            savedPosts.push(await storageService.put(STORAGE_KEY, postToSave))
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
