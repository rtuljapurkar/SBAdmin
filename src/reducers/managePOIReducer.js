import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function managePOIReducer(state = initialState.managePOI, action) {
      switch(action.type) {
          case types.MANAGE_POI_LOAD_SUCCESS:
                  return Object.assign({}, state, {
                    poi: action.data
                  });
          case types.DEFAULT_POI_LOAD_SUCCESS:
                  return Object.assign({}, state, {
                    poi: initialState.managePOI.poi
                  });
          case types.SET_POI_VENUE_SUCCESS:
                return Object.assign({}, state, {
                    poi: Object.assign({}, state.poi, {
                                  VenueID: action.data
                                })
                  });
          case types.CREATE_POI_SUCCESS:
                      return state;
          case types.DELETE_POI_SUCCESS:
                    return state;
         case types.ENABLE_POI_SUCCESS:
                    return state;
         case types.REDIRECT_MANAGE_POI_SUCCESS:
                     return Object.assign({}, state, {
                      poi: action.data
                    });

         default:
                    return state;
      }
}
