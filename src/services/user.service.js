import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/user/' :
    '//localhost:3030/api/user/'

export const userService = {
    query,
    save,
    remove,
    getById,
    createUser,
    getDefaultFilter,
    getFilterFromSearchParams,
    saveAll,
    createComment
}

const STORAGE_KEY = 'users'

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
    var { data: user } = await axios.get(url)
    return user
}

async function remove(id) {
    const url = BASE_URL + id
    var { data: res } = await axios.delete(url)
    return res
}

async function saveAll(usersToSave) {
    let savedPosts = []
    for (const postToSave of postsToSave) {
        await save(postToSave)
    }
    return savedPosts
}

async function save(userToSave) {
    const method = userToSave._id ? 'put' : 'post'
    const { data: saveduser } = await axios[method](BASE_URL, userToSave)
    return saveduser
}

function createUser(name = '', role = '', posts = []) {
    return {
        name,
        role,
        posts
    }
}

function getDefaultFilter() {
    return {
        role: '',
        minPosts: 0,
        name: ''
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


function createComment(author, body, authorId) {
    return {
        author,
        body,
        authorId,
        createdAt: Date.now(),
        likedList: [],
        _id: utilService.makeId()
    }
}
