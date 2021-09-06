import React, { createContext, useReducer, useContext } from 'react';
import reducer from './Reducer';

const initialState = {
  isLoading: false,
  error: null,
  user: null,
  groups: null,
};

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ store: state, dispatch }}>{children}</Provider>;
};

export const useStoreContext = () => {
  const storeContext = useContext(StoreContext);
  if (!storeContext)
    throw new Error('Store Context can only be called inside store context provider');

  return storeContext;
}

export default StoreProvider;

