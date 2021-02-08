import { userConstants } from '../constants';

const initialState = {
    isFetching: false,
    type: 'Valid',
    status: 'NA',
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
                ...action.payload,
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                ...action.payload,
            };
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                ...action.payload,
            };
        case userConstants.REGISTER_REFRESH:
            return {
                ...state,
                isFetching: false,
                type: 'Valid',
                status: 'NA',
                _id: '',
                email: '',
                password: '',
                token: '',
            };
        default:
            return state;
    }
}
