import { favoriteConstants } from '../constants/favorite.constants';

const initialState = {
    isFetching: false,
    hasError: false,
    loadingMore: false,
    currentPage: 1,
    endOfList: false,
};
export function favoriteReducer(state = initialState, action) {
    switch (action.type) {
        case favoriteConstants.GET_TEN_FAVORITE_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case favoriteConstants.GET_TEN_FAVORITE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                hasError: false,
                currentPage: 1,
                data: action.payload,
            };
        case favoriteConstants.GET_TEN_FAVORITE_FAILURE:
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
