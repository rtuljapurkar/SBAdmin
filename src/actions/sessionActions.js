import * as types from './actionTypes';
import sessionApi from '../api/sessionApi';
import mockApi from '../api/mockApi';
import auth from '../auth/authenticator';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loginSuccess() {
  return {type: types.LOG_IN_SUCCESS};
}
export function userCreateSuccess() {
  return {type: types.USER_CREATE_SUCCESS};
}

function validateEmail (email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
}

export function loginUser(credentials) {
    let isEmailPresent = false;
    return function(dispatch) {
          dispatch(beginAjaxCall());
        return sessionApi.login(credentials)
        .then( result =>{
                        if(result)
                        {
                            dispatch(loginSuccess());
                        }
        }).catch(error => {
              throw(error);
            });

            // .then(response =>{
            //         dispatch(loginSuccess());

  };
}



export function isEmailTaken(email) {
  // make async call to api
  return function(dispatch) {
        dispatch( beginAjaxCall());
        return sessionApi.isEmailTaken(email).then(response => {
            if(response && response.count && response.count > 0){
                return true;
            }
            else{
                return false;
            }
         }).catch(error => {
             dispatch(ajaxCallError(error));
             throw(error);
         });
     };
 }

 export function isUserNameTaken(username) {
   // make async call to api, handle promise, dispatch action when promise is resolved
   return function(dispatch) {
         dispatch( beginAjaxCall());
         return sessionApi.isUserNameTaken(username).then(response => {
             if(response && response.count && response.count > 0){
                 return true;
             }
             else{
                 return false;
             }
          }).catch(error => {
              dispatch(ajaxCallError(error));
              throw(error);
          });
      };
  }

export function saveUser(user) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return sessionApi.saveUser(user)
        .then( result =>{
                        if(result)
                        {
                            dispatch(userCreateSuccess(user));
                        }
                        else{
                            throw("Error occured while registering..");
                        }
        }).catch(error => {
              throw(error);
            });
  };
}

export function logOutUser() {
  auth.logOut();
  return {type: types.LOG_OUT_SUCCESS};
}
