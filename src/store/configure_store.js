import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import { reducers } from '../reducers/reducer'
import {reducer as toastrReducer} from 'react-redux-toastr'

export default function configureStore(initialState, middleware) {
 let middlewares = [thunk, middleware];

 const reducer = combineReducers({
   initialState,
   reducers,
   routing: routerReducer,
   toastr: toastrReducer
 })

 const store = createStore(reducer, applyMiddleware(...middlewares))

 return store
}