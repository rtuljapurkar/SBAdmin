import * as types from './actionTypes';
import venuesApi from '../api/venuesApi';
import {beginAjaxCall, beginAmenitiesAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAmenitiesSuccess(data) {
  return {type: types.LOAD_AMENITIES_SUCCESS, data};
}
export function filterBy (filterString) {
  return {type: types.FILTER_AMENITIES_DATA, filterString};
}
export function filterByType (filterType) {
  return {type: types.FILTER_AMENITIES_BYTYPE_DATA, filterType};
}

export function sortBy (sortKey) {
  return {type: types.SORT_AMENITIES_DATA, sortKey};
}
export function loadAmenitiesVenuesSuccess (data) {
  return {type: types.AMENITIES_VENUE_LOAD_SUCCESS,  data};
}

export function DefaultAmenityLoadSuccess (data) {
  return {type: types.DEFAULT_AMENITY_LOAD_SUCCESS,  data};
}
export function createAmenitySuccess (data) {
  return {type: types.CREATE_AMENITY_SUCCESS,  data};
}
export function deleteAmenitySuccess (data) {
  return {type: types.DELETE_AMENITY_SUCCESS,  data};
}
export function enableAmenitySuccess (data) {
  return {type: types.ENABLE_AMENITY_SUCCESS,  data};
}
export function manageAmenitySuccess (data) {
  return {type: types.REDIRECT_MANAGE_AMENITY_SUCCESS,  data};
}
export function setAmenityVenueIDSuccess (data) {
  return {type: types.SET_AMENITY_VENUE_SUCCESS,  data};
}
export function loadVenuesSuccess(data) {
  return {type: types.LOAD_MANAGEAMENITY_VENUES_SUCCESS, data};
}
export function loadAmenityByIDSuccess(data) {
  return {type: types.MANAGE_AMENITY_LOAD_SUCCESS, data};
}
export function manageAmenitiesSuccess(data) {
  return {type: types.MANAGE_LOADALL_AMENITIES_SUCCESS, data};
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


 export function loadAmenities(venueId) {
         return function(dispatch) {
         dispatch( beginAmenitiesAjaxCall());
         return venuesApi.getAllAmenities(venueId).then(data => {
              dispatch(loadAmenitiesSuccess(data));
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
               dispatch(loadAmenitiesVenuesSuccess(data));
           }).catch(error => {
               dispatch(ajaxCallError(error));
               throw(error);
           });
       };
   }

   export function getAmenityByID(ID) {
     // make async call to api
     return function(dispatch) {
           dispatch( beginAjaxCall());
           return venuesApi.getAmenityByID(ID).then(data => {
                dispatch(loadAmenityByIDSuccess(data));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
        };
    }

   export function loadDefaultAmenity(venueID) {
     return function(dispatch) {
           dispatch(DefaultAmenityLoadSuccess(venueID));
        };
    }

   export function saveAmenity(amenity) {
     return function (dispatch, getState) {
       dispatch(beginAjaxCall());

       return venuesApi.saveAmenity(amenity).then(amenity => {
           dispatch(createAmenitySuccess(amenity));
       }).catch(error => {
         dispatch(ajaxCallError(error));
         throw(error);
       });
     };
   }

   export function disableAmenity(amenity) {
     return function (dispatch, getState) {
       dispatch(beginAjaxCall());
       return venuesApi.deleteAmenity(amenity).then(amenity => {
           dispatch(deleteAmenitySuccess(amenity));
       }).catch(error => {
         dispatch(ajaxCallError(error));
         throw(error);
       });
     };
   }

   export function enableAmenity(amenity) {
     return function (dispatch, getState) {
       dispatch(beginAjaxCall());
       return venuesApi.enableAmenity(amenity).then(amenity => {
           dispatch(enableAmenitySuccess(amenity));
       }).catch(error => {
         dispatch(ajaxCallError(error));
         throw(error);
       });
     };
   }

   export function manageAmenity(amenity) {
     return function (dispatch, getState) {
         dispatch(manageAmenitySuccess(amenity));
     };
   }

   export function setAmenityVenueID(venueID) {
     return function (dispatch, getState) {
         dispatch(setAmenityVenueIDSuccess(venueID));
     };
   }

   export function manageAmenities(venueId) {
           return function(dispatch) {
           dispatch( beginAmenitiesAjaxCall());
           return venuesApi.getAllAmenities(venueId).then(data => {
                dispatch(manageAmenitiesSuccess(data));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
        };
    }
