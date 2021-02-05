import { userConstants } from '../constants';

const initialState = {
    isFetching: false,
    isLoggedIn: false,
    _id: '',
    email: '',
    password: '',
    token: '',
};

export function registerReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                ...state,
                isFetching: true,
                isLoggedIn: false,
                ...action.payload,
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: true,
                ...action.payload,
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                isLoggedIn: false,
                ...action.payload,
            };
        default:
            return state;
    }
}
