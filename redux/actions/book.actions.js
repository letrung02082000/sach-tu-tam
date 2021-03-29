import { bookConstants } from '../constants/book.constants';
import { bookApi } from '../../api';

export const bookActions = {
    getAllBooksAction,
    loadMoreAction,
    refreshingAction,
};

function getAllBooksAction(page, limit) {
    return async (dispatch) => {
        dispatch(getAllBooksRequest());
        bookApi
            .getAllBooks(page, limit)
            .then((response) => {
                if (response.type == 'Valid') {
                    dispatch(getAllBooksSuccess(response.data));
                } else {
                    dispatch(
                        getAllBooksFailure({ error: 'Invalid getAllBooks' })
                    );
                }
            })
            .catch((error) => {
                dispatch(getAllBooksFailure({ error: 'getAllBooks api fail' }));
            });
    };

    function getAllBooksRequest() {
        return {
            type: bookConstants.GET_ALL_BOOKS_REQUEST,
        };
    }

    function getAllBooksSuccess(data) {
        return {
            type: bookConstants.GET_ALL_BOOKS_SUCCESS,
            payload: data,
        };
    }

    function getAllBooksFailure(error) {
        return {
            type: bookConstants.GET_ALL_BOOKS_FAILURE,
            payload: error,
        };
    }
}

function loadMoreAction(page, limit) {
    return async (dispatch) => {
        dispatch(loadMoreRequest());
        bookApi
            .getAllBooks(page, limit)
            .then((response) => {
                if (response.type == 'Valid') {
                    console.log(page);
                    dispatch(loadMoreSuccess(response.data));
                } else {
                    console.log('invalid');
                    dispatch(loadMoreEnd());
                }
            })
            .catch((error) => {
                dispatch(loadMoreFailure({ error: 'loadMoreBooks api fail' }));
            });
    };

    function loadMoreRequest() {
        return {
            type: bookConstants.LOAD_MORE_REQUEST,
        };
    }

    function loadMoreSuccess(data) {
        return {
            type: bookConstants.LOAD_MORE_SUCCESS,
            payload: data,
        };
    }

    function loadMoreFailure(error) {
        return {
            type: bookConstants.LOAD_MORE_FAILURE,
            payload: error,
        };
    }

    function loadMoreEnd() {
        return {
            type: bookConstants.LOAD_MORE_END,
        };
    }
}

function refreshingAction() {
    return {
        type: bookConstants.REFRESHING_REQUEST,
    };
}
