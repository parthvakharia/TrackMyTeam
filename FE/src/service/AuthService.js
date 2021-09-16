import axios from './Axios';
const BASE_URL = '/auth';

export const login = async (loginDetails) => {
    const message = await axios.post(`${BASE_URL}/login`, loginDetails);
    return message;
}

export const register = async (userDetails) => {
    const message = await axios.post(`${BASE_URL}/register`, userDetails);
    return message;
}

export const getLoggedInUser = async (token) => {
    const message = await axios.get(`${BASE_URL}/logged-in-user-data/${token}`);
    return message;
}