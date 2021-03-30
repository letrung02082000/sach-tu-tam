import { eventConstants } from '../constants';

const initalState = {
    isFetching: false,
    hasError: false,
    loadingMore: false,
    currentPage: 1,
    endOfList: false,
    data: [],
};

export function eventReducer(state = initalState, action) {
    switch (action.type) {
        case eventConstants.GET_ALL_EVENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case eventConstants.GET_ALL_EVENTS_SUCCESS:
            return {
                isFetching: false,
                hasError: false,
                data: action.payload,
                currentPage: 1,
            };
        case eventConstants.GET_ALL_EVENTS_FAILURE:
            return {
                ...state,
                isFetching: false,
                hasError: true,
                ...action.payload,
            };
        case eventConstants.LOAD_MORE_EVENTS_REQUEST:
            return {
                ...state,
                loadingMore: true,
            };
        case eventConstants.LOAD_MORE_EVENTS_SUCCESS:
            return {
                isFetching: false,
                loadingMore: false,
                hasError: false,
                data: [...state.data, ...action.payload],
                currentPage: state.currentPage + 1,
            };
        case eventConstants.LOAD_MORE_EVENTS_FAILURE:
            return {
                ...state,
                loadingMore: false,
                hasError: true,
                ...action.payload,
            };
        case eventConstants.LOAD_MORE_EVENTS_END:
            return {
                ...state,
                endOfList: true,
            };
        case eventConstants.REFRESHING_EVENTS_REQUEST:
            return {
                ...state,
                hasError: false,
                endOfList: false,
            };
        default:
            return state;
    }
}
