import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
})

const BASE_URL = process.env.NODE_ENV !== 'development' ? '/api/' : '//localhost:3030/api/'

const BASE_USER_URL = BASE_URL + 'user/'
const BASE_AUTH_URL = BASE_URL + 'auth/'

export const userService = {
    login,
    logout,
    signup,

    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getFilterFromSearchParams,
    createComment
}

const STORAGE_KEY = 'users'

async function query(filterBy) {
    try {
        var { data: posts } = await axios.get(BASE_USER_URL, { params: filterBy })
        return posts
    } catch (error) {
        throw error
    }
}

async function getById(id) {
    const url = BASE_USER_URL + id
    var { data: user } = await axios.get(url)
    return user
}

async function remove(id) {
    const url = BASE_USER_URL + id
    var { data: res } = await axios.delete(url)
    return res
}

async function save(userToSave) {
    const method = userToSave._id ? 'put' : 'post'
    // userToSave._id = "test"
    const { data: saveduser } = await axios[method](BASE_USER_URL, userToSave)
    return saveduser
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

async function login(credentials) {
    const { data: user } = await axios.post(BASE_AUTH_URL + 'login', credentials)
    if (user) {
        return user
    }
}

async function signup(credentials) {
    const { data: user } = await axios.post(BASE_AUTH_URL + 'signup', credentials)
    return user
}

async function logout() {
    await axios.post(BASE_AUTH_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}
