export const ADD_USER = 'INCREMENT'

const initialState = {
    names: ["rony","tony"]
}

export function usersReducer(state = initialState, action) {
    // var newState = state
    switch (action.type) {
        case ADD_USER:
            const updatedNames = [...state.names, action.name];
            console.log(updatedNames);
            return { ...state, names: updatedNames };
        default:
        return state 
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
