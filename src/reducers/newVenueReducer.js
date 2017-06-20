import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';
import PropTypes from 'prop-types';


export default function postReducer(state = initialState.newVenue, action) {
      switch(action.type) {
         default:
          return state;
      }
}
