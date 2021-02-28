import { bestsellerConstants } from '../constants/bestseller.constants';

const initialState = {
    isFetching: false,
    hasError: false,
    loadingMore: false,
    currentPage: 1,
    endOfList: false,
};
export function bestsellerReducer(state = initialState, action) {
    switch (action.type) {
        case bestsellerConstants.GET_TEN_BESTSELLER_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case bestsellerConstants.GET_TEN_BESTSELLER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                hasError: false,
                currentPage: 1,
                data: action.payload,
            };
        case bestsellerConstants.GET_TEN_BESTSELLER_FAILURE:
            return {
                ...state,
                isFetching: false,
                hasError: false,
                ...action.payload,
            };
        default:
            return state;
    }
}
