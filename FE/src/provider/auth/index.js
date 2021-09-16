import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import reducer from './Reducer';
import * as SecureStore from 'expo-secure-store';
import * as AuthService from '../../service/AuthService';
import { SET_TOKEN, SET_USER, IS_Logged_In_Check, IS_LOADING, GLOBAL_ERROR } from './ActionTypes';

const initialState = {
    isLoading: false,
    error: null,
    user: null,
    isLoggedInCheck: false,
    token: undefined,
};

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const signIn = async (payload) => {
        let actions = [];
        try {
            dispatch({ type: IS_LOADING, payload: true });
            const { token, user } = await AuthService.login(payload);

            console.log(Platform.OS)
            if (Platform.OS !== 'web')
                await SecureStore.setItemAsync('token', token, { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

            actions = [
                { type: SET_USER, payload: user },
                { type: SET_TOKEN, payload: token },
                { type: IS_LOADING, payload: false },
            ];
        } catch (e) {
            actions = [
                { type: IS_LOADING, payload: false },
                { type: GLOBAL_ERROR, payload: e },
            ];
        }
        actions.map(dispatch);
    };

    const register = async (payload) => {
        try {
            dispatch({ type: IS_LOADING, payload: true });

            await AuthService.register(payload);

            dispatch({ type: IS_LOADING, payload: false });
        } catch (e) {
            const actions = [
                { type: IS_LOADING, payload: false },
                { type: GLOBAL_ERROR, payload: e },
            ];
            actions.map(dispatch);
        }
    };

    const isLoggedIn = async () => {
        let actions = [];
        try {
            let token = '';
            dispatch({ type: IS_LOADING, payload: true });

            if (Platform.OS !== 'web')
                token = await SecureStore.getItemAsync('token', { keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY });

            if (!token) throw new Error('No token found. Please login');

            const user = await AuthService.getLoggedInUser(token);
            actions = [
                { type: SET_USER, payload: user },
                { type: SET_TOKEN, payload: token },
                { type: IS_LOADING, payload: false },
                { type: IS_Logged_In_Check, payload: true },
            ];
            actions.map(dispatch);
            return !!token;
        } catch (e) {
            const actions = [
                { type: IS_LOADING, payload: false },
                { type: GLOBAL_ERROR, payload: e },
                { type: IS_Logged_In_Check, payload: true },
            ];
            actions.map(dispatch);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    const { isLoggedInCheck } = state;

    return <Provider value={{
        store: state,
        dispatch,
        signIn,
        register,
        isLoggedIn
    }}>
        {isLoggedInCheck && children}
    </Provider>;
};

export const useAuthContext = () => {
    const authContext = useContext(AuthContext);
    if (!authContext)
        throw new Error('AuthContext can only be called inside auth context provider');

    return authContext;
}

export default AuthProvider;

