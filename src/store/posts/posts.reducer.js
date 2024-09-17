export const ADD_POST = 'POST'

const initialState = {
    posts: ["fsgsagdsg","tgadgdgdgdgdvgd"]
}

export function postsReducer(state = initialState, action) {
    // var newState = state
    switch (action.type) {
        case ADD_POST:
            const updatedPosts = [...state.posts, action.post];
            return { ...state, posts: updatedPosts };
        default:
        return state 
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
