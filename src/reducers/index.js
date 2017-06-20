import {combineReducers} from 'redux';
import posts from './postReducer';
import session from './sessionReducer';
import venues from './venueReducer';
import loadingStatus from './ajaxStatusReducer';
import newPost from './newPostReducer';
import newVenue from './newVenueReducer';
import initialState from './initialState';
import { routerReducer } from 'react-router-redux';

const appReducer = combineReducers({
    routing: routerReducer,
    session: session,
    venues: venues,
    loadingStatus: loadingStatus,
    posts: posts,
    newPost: newPost,
    newVenue: newVenue
});

export const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT_SUCCESS') {
        state = initialState;
    }
    return appReducer(state, action);
};
