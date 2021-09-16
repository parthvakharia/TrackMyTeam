import React from 'react';
import { SET_USER, IS_Logged_In_Check, IS_LOADING, GLOBAL_ERROR, SET_TOKEN } from './ActionTypes';
import * as _ from 'lodash';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case GLOBAL_ERROR:
      return {
        ...state,
        error: payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload
      }
    case IS_Logged_In_Check:
      return {
        ...state,
        isLoggedInCheck: payload
      }
    default:
      return state;
  }
};
export default reducer;
