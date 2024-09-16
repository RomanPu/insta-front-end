export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'

const initialState = {
    count: 10,
    users: [],
    watchedUser : null
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {

        default:
        return newState   
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
