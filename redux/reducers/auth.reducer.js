import AsyncStorage from '@react-native-async-storage/async-storage';
import { userConstants } from '../constants';

const initialState = {
    isFetching: false,
    isLoggedIn: false,
    _id: '',
    email: '',
    password: '',
    token: '',
};

AsyncStorage.getItem('user')
    .then(
        (userData) => {
            if (userData.isLoggedIn == true) {
                initialState.isLoggedIn = true;
            } else {
                initialState.isLoggedIn = false;
            }
        },
        (error) => {
            initialState.isLoggedIn = false;
        }
    )
    .catch((error) => {
        initialState.isLoggedIn = false;
    });

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                isLoggedIn: false,
                isFetching: true,
                ...action.payload,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isFetching: false,
                ...action.payload,
            };
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                isFetching: false,
                ...action.payload,
            };
        case userConstants.LOGOUT:
            return {
                isFetching: false,
                isLoggedIn: false,
                _id: '',
                email: '',
                password: '',
                token: '',
            };
        default:
            return state;
    }
};
