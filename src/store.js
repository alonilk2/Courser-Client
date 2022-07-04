import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from './Reducers/authReducer';
import { courseReducer } from './Reducers/courseReducer';

var initialState = {}

const Red = combineReducers({
    user : authReducer,
    course: courseReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Red, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;