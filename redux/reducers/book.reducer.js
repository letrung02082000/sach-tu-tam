import { bookConstants } from '../constants';

const initalState = {
    isFetching: false,
    hasError: false,
};

export function bookReducer(state = initalState, action) {
    switch (action.type) {
        case bookConstants.GET_ALL_BOOKS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case bookConstants.GET_ALL_BOOKS_SUCCESS:
            return {
                isFetching: false,
                hasError: false,
                data: action.payload,
            };
        case bookConstants.GET_ALL_BOOKS_FAILURE:
            return {
                ...state,
                isFetching: false,
                hasError: true,
                ...action.payload,
            };
        default:
            return state;
    }
}
