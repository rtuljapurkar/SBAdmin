import {combineReducers} from 'redux';
import posts from './postReducer';
import session from './sessionReducer';
import venues from './venueReducer';
import loadingStatus from './ajaxStatusReducer';
import venueDetail from './venueDetailReducer';
import newPost from './newPostReducer';
import manageVenue from './manageVenueReducer';
import manageAmenity from './manageAmenityReducer';
import initialState from './initialState';
import { routerReducer } from 'react-router-redux';
import amenities from './amenityReducer';
import pointOfInterests from './pointOfInterestReducer';

const appReducer = combineReducers({
    routing: routerReducer,
    session: session,
    venues: venues,
    loadingStatus: loadingStatus,
    posts: posts,
    newPost: newPost,
    manageVenue: manageVenue,
    manageAmenity: manageAmenity,
    amenities: amenities,
    venueDetail: venueDetail,
    pointOfInterests: pointOfInterests
});

export const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT_SUCCESS') {
        state = initialState;
    }
    return appReducer(state, action);
};
