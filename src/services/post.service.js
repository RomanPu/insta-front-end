import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/post/' :
    '//localhost:3030/api/post/'

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
        var { data: posts } = await axios.get(BASE_URL, { params: filterBy })
        return posts
    } catch (error) {
        throw error
    }
}

async function getById(id) {
    const url = BASE_URL + id
    var { data: post } = await axios.get(url)
    return post
}

async function remove(id) {
    const url = BASE_URL + id
    var { data: res } = await axios.delete(url)
    return res
}

async function saveAll(postsToSave) {
    let savedPosts = []
    for (const postToSave of postsToSave) {
        await save(postToSave)
    }
    return savedPosts
}

async function save(postToSave) {
    const method = postToSave._id ? 'put' : 'post'
    const { data: savedpost } = await axios[method](BASE_URL, postToSave)
    return savedpost
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
