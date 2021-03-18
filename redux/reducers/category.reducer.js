import { categoryConstants } from '../constants/category.constant';

const initialState = {
    isFetching: false,
    hasError: false,
};
export function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            return {
                ...state,
                isFetching: true,
                hasError: false,
            };
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                hasError: false,
                data: action.payload,
            };
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
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
