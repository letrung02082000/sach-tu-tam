import { favoriteConstants } from '../constants/favorite.constants';
import { bookApi } from '../../api';

export const favoriteActions = {
    getFavorite,
};

function getFavorite() {
    const page = 1;
    const limit = 10;

    return async (dispatch) => {
        dispatch(getFavoriteRequest());
        bookApi
            .getFavorite(page, limit)
            .then((response) => {
                if (response.type == 'Valid') {
                    dispatch(getFavoriteSuccess(response.data));
                } else {
                    dispatch(
                        getFavoriteFailure({ error: 'Invalid getFavorite' })
                    );
                }
            })
            .catch((error) => {
                dispatch(getFavoriteFailure({ error: 'getFavorite api fail' }));
            });
    };

    function getFavoriteRequest() {
        return {
            type: favoriteConstants.GET_TEN_FAVORITE_REQUEST,
        };
    }

    function getFavoriteSuccess(data) {
        return {
            type: favoriteConstants.GET_TEN_FAVORITE_SUCCESS,
            payload: data,
        };
    }

    function getFavoriteFailure(error) {
        return {
            type: favoriteConstants.GET_TEN_FAVORITE_FAILURE,
            payload: error,
        };
    }
}
