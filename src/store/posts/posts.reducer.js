export const ADD_POST = "ADD_POST"
export const SET_POSTS = "SET_POSTS"
export const EDIT_POST = "EDIT_POST "

const initialState = {
  posts: [],
}

export function postsReducer(state = initialState, action = {}) {
  var newState = state
  switch (action.type) {
    case ADD_POST:
      const updatedPosts = [...state.posts, action.post]
      return { ...state, posts: updatedPosts }
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      }
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.post._id ? action.post : post
        }),
      }

    default:
      return state
  }
}
