import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, beginPOIAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadPointOfInterestSuccess(data) {
  return {type: types.LOAD_POI_SUCCESS, data};
}
export function filterBy (filterString) {
  return {type: types.FILTER_POI_DATA, filterString};
}
export function sortBy (sortKey) {
  return {type: types.SORT_POI_DATA, sortKey};
}
export function loadPOIVenuesSuccess (data) {
  return {type: types.POI_VENUE_LOAD_SUCCESS,  data};
}

export function DefaultPOILoadSuccess (data) {
  return {type: types.DEFAULT_POI_LOAD_SUCCESS,  data};
}
export function createPOISuccess (data) {
  return {type: types.CREATE_POI_SUCCESS,  data};
}
export function deletePOISuccess (data) {
  return {type: types.DELETE_POI_SUCCESS,  data};
}
export function enablePOISuccess (data) {
  return {type: types.ENABLE_POI_SUCCESS,  data};
}
export function managePOISuccess (data) {
  return {type: types.REDIRECT_MANAGE_POI_SUCCESS,  data};
}
export function setPOIVenueIDSuccess (data) {
  return {type: types.SET_POI_VENUE_SUCCESS,  data};
}
export function managePointOfInterestsSuccess(data) {
  return {type: types.MANAGE_LOADALL_POI_SUCCESS, data};
}
export function loadVenuesSuccess(data) {
  return {type: types.LOAD_MANAGEPOI_VENUES_SUCCESS, data};
}
export function loadPOIByIDSuccess(data) {
  return {type: types.MANAGE_POI_LOAD_SUCCESS, data};
}

 export function loadPointOfInterests(venueId) {
         return function(dispatch) {
         dispatch( beginPOIAjaxCall());
         return venuesApi.getPointOfInterests(venueId).then(data => {
              dispatch(loadPointOfInterestSuccess(data));
          }).catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
      };
  }

  export function getVenueByID(ID) {
    // make async call to api
    return function(dispatch) {
          dispatch( beginAjaxCall());
          return venuesApi.getVenueByID(ID).then(data => {
               dispatch(loadPOIVenuesSuccess(data));
           }).catch(error => {
               dispatch(ajaxCallError(error));
               throw(error);
           });
       };
   }

   export function getPOIByID(ID) {
     // make async call to api
     return function(dispatch) {
           dispatch( beginAjaxCall());
           return venuesApi.getPOIByID(ID).then(data => {
                dispatch(loadPOIByIDSuccess(data));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
        };
    }

   export function loadDefaultPOI(venueID) {
     // make async call to api, handle promise, dispatch action when promise is resolved
     return function(dispatch) {
           dispatch(DefaultPOILoadSuccess(venueID));
        };
    }

   export function savePOI(poi) {
     return function (dispatch, getState) {
       dispatch(beginAjaxCall());
       return venuesApi.savePOI(poi).then(poi => {
           dispatch(createPOISuccess(poi));
       }).catch(error => {
         dispatch(ajaxCallError(error));
         throw(error);
       });
     };
   }

   export function disablePOI(poi) {
     return function (dispatch, getState) {
       dispatch(beginAjaxCall());
       return venuesApi.deletePOI(poi).then(poi => {
           dispatch(deletePOISuccess(poi));
       }).catch(error => {
         dispatch(ajaxCallError(error));
         throw(error);
       });
     };
   }

   export function enablePOI(poi) {
     return function (dispatch, getState) {
       dispatch(beginAjaxCall());
       return venuesApi.enablePOI(poi).then(poi => {
           dispatch(enablePOISuccess(poi));
       }).catch(error => {
         dispatch(ajaxCallError(error));
         throw(error);
       });
     };
   }

   export function managePOI(poi) {
     return function (dispatch, getState) {
         dispatch(managePOISuccess(poi));
     };
   }

   export function setPOIVenueID(venueID) {
     return function (dispatch, getState) {
         dispatch(setPOIVenueIDSuccess(venueID));
     };
   }

   export function managePointOfInterests(venueId) {
           return function(dispatch) {
           dispatch( beginPOIAjaxCall());
           return venuesApi.getPointOfInterests(venueId).then(data => {
                dispatch(managePointOfInterestsSuccess(data));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
        };
    }

    export function loadVenues() {
      // make async call to api
      return function(dispatch) {
            dispatch( beginAjaxCall());
            return venuesApi.getAllVenues().then(data => {
                 dispatch(loadVenuesSuccess(data));
             }).catch(error => {
                 dispatch(ajaxCallError(error));
                 throw(error);
             });
         };
     }
