import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, beginVenuesAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadVenuesSuccess(data) {
  return {type: types.LOAD_VENUESMAIN_SUCCESS, data};
}

export function filterBy (filterString) {
  return {type: types.FILTER_VENUES_DATA, filterString};
}

export function sortBy (sortKey) {
  return {type: types.SORT_VENUES_DATA, sortKey};
}
export function ManageVenueLoadSuccess (data) {
  return {type: types.MANAGE_VENUE_LOAD_SUCCESS,  data};
}
export function DefaultVenueLoadSuccess (data) {
  return {type: types.DEFAULT_VENUE_LOAD_SUCCESS,  data};
}
export function createVenueSuccess (data) {
  return {type: types.CREATE_VENUE_SUCCESS,  data};
}
export function deleteVenueSuccess (data) {
  return {type: types.DELETE_VENUE_SUCCESS,  data};
}
export function enableVenueSuccess (data) {
  return {type: types.ENABLE_VENUE_SUCCESS,  data};
}



export function loadVenuesMain() {
  // make async call to api
  return function(dispatch) {
        dispatch( beginVenuesAjaxCall());
        return venuesApi.getAllVenues().then(data => {
             dispatch(loadVenuesSuccess(data));
         }).catch(error => {
             dispatch(ajaxCallError(error));
             throw(error);
         });
     };
 }

 export function loadVenueByID(ID) {
   // make async call to api, handle promise, dispatch action when promise is resolved
   return function(dispatch) {
         dispatch( beginAjaxCall());
         return venuesApi.getVenueByID(ID).then(data => {
              dispatch(ManageVenueLoadSuccess(data));
          }).catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
      };
  }

  export function LoadDefaultVenue() {
    // make async call to api, handle promise, dispatch action when promise is resolved
    return function(dispatch) {
          dispatch(DefaultVenueLoadSuccess());
       };
   }

   export function saveVenue(venue) {
     return function (dispatch, getState) {
       dispatch(beginAjaxCall());
       return venuesApi.saveVenue(venue).then(venue => {
           dispatch(createVenueSuccess(venue));
       }).catch(error => {
         dispatch(ajaxCallError(error));
         throw(error);
       });
     };
   }

   export function disableVenue(venue) {
     return function (dispatch, getState) {
       dispatch(beginAjaxCall());
       return venuesApi.deleteVenue(venue).then(venue => {
           dispatch(deleteVenueSuccess(venue));
       }).catch(error => {
         dispatch(ajaxCallError(error));
         throw(error);
       });
     };
   }

   export function enableVenue(venue) {
     return function (dispatch, getState) {
       dispatch(beginAjaxCall());
       return venuesApi.enableVenue(venue).then(venue => {
           dispatch(enableVenueSuccess(venue));
       }).catch(error => {
         dispatch(ajaxCallError(error));
         throw(error);
       });
     };
   }
