export const ADD_POST = 'POST'
export const LOAD_POSTS = 'LOAD_POSTS'

const initialState = {
    posts: []
}




export function postsReducer(state = initialState, action = {}) {
    // var newState = state
    switch (action.type) {
        case ADD_POST:
            const updatedPosts = [...state.posts, action.post];
            return { ...state, posts: updatedPosts };
        case LOAD_POSTS:
            return {
                ...state,
                posts: action.posts
            }

        default:
            return state 
    }


}
