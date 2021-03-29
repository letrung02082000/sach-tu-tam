import { bookConstants } from '../constants';

const initalState = {
    isFetching: false,
    hasError: false,
    loadingMore: false,
    currentPage: 1,
    endOfList: false,
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
                currentPage: 1,
            };
        case bookConstants.GET_ALL_BOOKS_FAILURE:
            return {
                ...state,
                isFetching: false,
                hasError: true,
                ...action.payload,
            };
        case bookConstants.LOAD_MORE_REQUEST:
            return {
                ...state,
                loadingMore: true,
            };
        case bookConstants.LOAD_MORE_SUCCESS:
            return {
                isFetching: false,
                loadingMore: false,
                hasError: false,
                data: [...state.data, ...action.payload],
                currentPage: state.currentPage + 1,
            };
        case bookConstants.LOAD_MORE_FAILURE:
            return {
                ...state,
                loadingMore: false,
                hasError: true,
                ...action.payload,
            };
        case bookConstants.LOAD_MORE_END:
            return {
                ...state,
                endOfList: true,
            };
        case bookConstants.REFRESHING_REQUEST:
            return {
                ...state,
                hasError: false,
                endOfList: false,
            };
        default:
            return state;
    }
}
