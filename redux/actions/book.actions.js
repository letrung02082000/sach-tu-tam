import { bookConstants } from '../constants/book.constants';
import { bookApi } from '../../api';

export const bookActions = {
    getAllBooksAction,
};

function getAllBooksAction() {
    return async (dispatch) => {
        dispatch(getAllBooksRequest());
        bookApi
            .getAllBooks()
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
}

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
