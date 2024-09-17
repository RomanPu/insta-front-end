import { createStore, combineReducers } from 'redux'

import { usersReducer } from './users/users.reducer'
import { postsReducer } from './posts/posts.reducer'
import { logedUserReducer } from './logedUser/logeduser.reducer'


const rootReducer = combineReducers({
    postsModule: postsReducer,
    usersModule: usersReducer,
    logedUserModule: logedUserReducer,
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)

// For debug:
// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



