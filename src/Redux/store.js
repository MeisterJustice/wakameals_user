import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'



import {
    userSigninReducer,
    done
} from './reducers'



const user = localStorage.getItem("token") || null



// const user = signin

export const initialState = {
    userSignin: { user},
    done: {done: false}
}

const  reducers = combineReducers({
     //USER STORE
     userSignin: userSigninReducer, 
     done: done
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers,initialState,  composeEnhancer(applyMiddleware(thunk)))


export default store;