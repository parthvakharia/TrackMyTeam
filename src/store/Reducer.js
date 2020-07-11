import React from "react";
import { SET_USER } from "./ActionTypes";
import * as _ from "lodash";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
export default reducer;
