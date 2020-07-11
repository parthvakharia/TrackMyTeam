import React from 'react';
import { SET_USER, IS_LOADING, GLOBAL_ERROR } from './ActionTypes';
import * as _ from 'lodash';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case IS_LOADING:
      console.log('isLoading', payload);
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
    default:
      return state;
  }
};
export default reducer;
