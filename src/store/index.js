import React, { createContext, useReducer } from "react";
import reducer from "./Reducer";

const initialState = {
  user: null,
  groups: null,
};

const StoreContext = createContext();
const { Provider, Consumer } = StoreContext;
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const Dispatch = (type, payload) => {
    dispatch({ type, payload });
  };

  return (
    <Provider value={{ store: state, dispatch: Dispatch }}>{children}</Provider>
  );
};

export default StoreContext;
export { StoreProvider, Provider, Consumer };
