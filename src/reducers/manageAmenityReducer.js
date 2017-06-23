import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function postReducer(state = initialState.manageAmenity, action) {
      switch(action.type) {
          case types.MANAGE_AMENITY_LOAD_SUCCESS:
                  return Object.assign({}, state, {
                    amenity: action.data
                  });
          case types.DEFAULT_AMENITY_LOAD_SUCCESS:
                  return Object.assign({}, state, {
                    amenity: initialState.manageVenue.amenity
                  });
          case types.CREATE_AMENITY_SUCCESS:
                      return state;
          case types.DELETE_AMENITY_SUCCESS:
                    return state;
         case types.ENABLE_AMENITY_SUCCESS:
                    return state;
         default:
                    return state;
      }
}
