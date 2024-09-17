export const ADD_POST = 'ADD_POST'
export const SET_POSTS = 'SET_POSTS'

const initialState = {
    posts: []
}




export function postsReducer(state = initialState, action = {}) {
    // var newState = state
    switch (action.type) {
        case ADD_POST:
            const updatedPosts = [...state.posts, action.post];
            return { ...state, posts: updatedPosts };
        case SET_POSTS:
            return {
                ...state,
                posts: action.posts
            }

        default:
            return state 
    }


}
