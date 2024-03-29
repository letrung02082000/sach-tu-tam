import { postConstants } from '../constants';

const initalState = {
    isFetching: false,
    hasError: false,
    loadingMore: false,
    currentPage: 1,
    endOfList: false,
};

export function postReducer(state = initalState, action) {
    switch (action.type) {
        case postConstants.GET_ALL_POSTS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case postConstants.GET_ALL_POSTS_SUCCESS:
            return {
                isFetching: false,
                hasError: false,
                data: action.payload,
                currentPage: 1,
            };
        case postConstants.GET_ALL_POSTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                hasError: true,
                ...action.payload,
            };
        case postConstants.LOAD_MORE_REQUEST:
            return {
                ...state,
                loadingMore: true,
            };
        case postConstants.LOAD_MORE_SUCCESS:
            return {
                isFetching: false,
                loadingMore: false,
                hasError: false,
                data: [...state.data, ...action.payload],
                currentPage: state.currentPage + 1,
            };
        case postConstants.LOAD_MORE_FAILURE:
            return {
                ...state,
                loadingMore: false,
                hasError: true,
                ...action.payload,
            };
        case postConstants.LOAD_MORE_END:
            return {
                ...state,
                endOfList: true,
            };
        case postConstants.REFRESHING_REQUEST:
            return {
                ...state,
                hasError: false,
                endOfList: false,
            };
        default:
            return state;
    }
}
