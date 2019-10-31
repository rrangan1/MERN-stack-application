import {GET_ERRORS,SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import qs from 'qs';
import jwt_decode from 'jwt-decode';

export const registeruser = (userdata,history) => (dispatch) => {
    const newUserStr = qs.stringify(userdata);
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    axios.post('http://localhost:5000/api/users/createUser',newUserStr,headers)
        .then(res => {
            history.push('/login')
        })
        .catch(err => dispatch(
            {
                type:GET_ERRORS,
                payload:err.response.data
            }
        ) )


};
// Login - Get User Token
export const loginUser = userData => dispatch => {
    const userStr = qs.stringify(userData);
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };

    axios
        .post('http://localhost:5000/api/users/login', userStr,headers)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to ls
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};


