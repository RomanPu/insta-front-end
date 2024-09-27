export const ADD_USER = 'ADD_USER'
export const SET_USERS = 'SET_USERS'
export const EDIT_USER = 'EDIT_USER '

const initialState = {        
    users: []
}

export function usersReducer(state = initialState, action) {
    // var newState = state
    switch (action.type) {
        case ADD_USER:
            const updatedNames = [...state.users, action.name];
            console.log(updatedNames);
            return { ...state, users: updatedNames };
        default:
        return state 
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case EDIT_USER:
        //console.log('action:', action)
        return {
                ...state,
                users: state.users.map(user => { return user._id === action.post._id ? action.post : user})
            };

    }

}
