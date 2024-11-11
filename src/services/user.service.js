import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { LoadUsers, setUsers } from '../store/users/users.actions.js'

import pic1 from '../assets/imgs/pic1.jpeg'
import pic2 from '../assets/imgs/pic2.jpeg'
import pic3 from '../assets/imgs/pic3.jpeg'
import pic4 from '../assets/imgs/pic4.jpeg'
import pic5 from '../assets/imgs/pic5.jpeg'

export const userService = {
	query,
	save,
	remove,
	getById,
	createUser,
	getDefaultFilter,
	getFilterFromSearchParams,
	saveAll,
	createComment,
	createUsers
}

const STORAGE_KEY = 'users'

async function query(filterBy) {
	try {
		let users = await storageService.query(STORAGE_KEY)
		if (filterBy) {
			const { minPosts = 0, name = '', role = '' } = filterBy
			users = users.filter(
				user =>
					user.role.toLowerCase().includes(role.toLowerCase()) &&
					user.name.toLowerCase().includes(name.toLowerCase()) &&
					user.posts.length >= minPosts
			)
		}
		return users
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

async function saveAll(usersToSave) {
	let savedUsers = []
	for (const userToSave of usersToSave) {
		if (userToSave._id) {
			savedUsers.push(await storageService.put(STORAGE_KEY, userToSave))
		} else {
			savedUsers.push(await storageService.post(STORAGE_KEY, userToSave))
		}
	}
	return savedUsers
}

function save(userToSave) {
	if (userToSave._id) {
		return storageService.put(STORAGE_KEY, userToSave)
	} else {
		return storageService.post(STORAGE_KEY, userToSave)
	}
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

async function createUsers() {
	let users = utilService.loadFromStorage(STORAGE_KEY)
	if (!users || !users.length) {
		users = [
			{
				_id: '',
				avatarPic: pic1,
				name: 'John Doe',
				userName: 'Admin',
				posts: [],
				createdAt: utilService.randomPastTime(),
				followers: [],
				following: [],
				body: utilService.makeLorem(50)
			},
			{
				_id: '',
				avatarPic: pic2,
				name: 'Jane Smith',
				userName: 'Editor',
				posts: [],
				createdAt: utilService.randomPastTime(),
				followers: [],
				following: [],
				body: utilService.makeLorem(50)
			},
			{
				_id: '',
				avatarPic: pic3,
				name: 'Alice Johnson',
				userName: 'Viewer',
				posts: [],
				createdAt: utilService.randomPastTime(),
				followers: [],
				following: [],
				body: utilService.makeLorem(50)
			},
			{
				_id: '',
				avatarPic: pic4,
				name: 'Bob Brown',
				userName: 'Editor',
				posts: [],
				createdAt: utilService.randomPastTime(),
				followers: [],
				following: [],
				body: utilService.makeLorem(50)
			},
			{
				_id: '',
				avatarPic: pic5,
				name: 'Charlie Black',
				userName: 'Viewer',
				posts: [],
				createdAt: utilService.randomPastTime(),
				followers: [],
				following: [],
				body: utilService.makeLorem(50)
			}
		]
		LoadUsers(users)
	}
	setUsers(users)
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
