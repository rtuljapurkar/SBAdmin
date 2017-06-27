import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';

function sortData (data, sortKey) {
      const multiplier =  1;
      data.sort((a, b) => {
        const aVal = a[sortKey] || 0;
        const bVal = b[sortKey] || 0;
        return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
      });
      return data;
    }
    
export default function managePOIReducer(state = initialState.managePOI, action) {
      switch(action.type) {
          case types.MANAGE_POI_LOAD_SUCCESS:
                  return Object.assign({}, state, {
                    poi: action.data
                  });
          case types.DEFAULT_POI_LOAD_SUCCESS:
              return Object.assign({}, state, {
                    poi: Object.assign({}, initialState.managePOI.poi, {
                                  VenueID: action.data
                                })
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
        case types.LOAD_MANAGEPOI_VENUES_SUCCESS:
                    return Object.assign({}, state, {
                     venues: action.data
                   });
        case types.MANAGE_LOADALL_POI_SUCCESS:
        {
            return Object.assign({}, state, {
               pointOfInterests: sortData(action.data, "POIName")
             });
        }
         default:
                    return state;
      }
}
