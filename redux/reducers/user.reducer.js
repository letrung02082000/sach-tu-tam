import * as t from '../actions/';

const initialState = {
    isSignedIn: false,
    userId: '',
    token: '',
};

export default signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isSignedIn: true,
            };
        case t.LOGIN_ERROR:
            return {
                ...state,
                isSignedIn: false,
            };
        default:
            return state;
    }
};
