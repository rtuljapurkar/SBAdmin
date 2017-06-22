import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function postReducer(state = initialState.manageVenue, action) {
      switch(action.type) {
          case types.MANAGE_VENUE_LOAD_SUCCESS:
                  return Object.assign({}, state, {
                    venue: action.data
                  });
          case types.DEFAULT_VENUE_LOAD_SUCCESS:
                  return Object.assign({}, state, {
                    venue: initialState.manageVenue.venue
                  });
          case types.CREATE_VENUE_SUCCESS:
                      return state;
          case types.DELETE_VENUE_SUCCESS:
                    return state;
         default:
                    return state;
      }
}
