import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function manageAmenityReducer(state = initialState.manageAmenity, action) {
      switch(action.type) {
          case types.MANAGE_AMENITY_LOAD_SUCCESS:
                  return Object.assign({}, state, {
                    amenity: action.data
                  });
          case types.DEFAULT_AMENITY_LOAD_SUCCESS:
                  return Object.assign({}, state, {
                    amenity: initialState.manageAmenity.amenity
                  });
          case types.SET_AMENITY_VENUE_SUCCESS:
                return Object.assign({}, state, {
                    amenity: Object.assign({}, state.amenity, {
                                  VenueID: action.data
                                })
                  });
          case types.CREATE_AMENITY_SUCCESS:
                      return state;
          case types.DELETE_AMENITY_SUCCESS:
                    return state;
         case types.ENABLE_AMENITY_SUCCESS:
                    return state;
         case types.REDIRECT_MANAGE_AMENITY_SUCCESS:
                     return Object.assign({}, state, {
                      amenity: action.data
                    });
          case types.LOAD_MANAGEAMENITY_VENUES_SUCCESS:
        //  console.log(action.data);
                      return Object.assign({}, state, {
                       venues: action.data
                     });


         default:
                    return state;
      }
}
