import { categoryConstants } from '../constants/category.constant';
import { bookApi } from '../../api';

export const categoryActions = {
    getAllCategoriesAction,
};

function getAllCategoriesAction() {
    return async (dispatch) => {
        dispatch(getAllCategoriesRequest());
        bookApi
            .getAllCategories()
            .then((response) => {
                if (response.type == 'Valid') {
                    dispatch(getAllCategoriesSuccess(response.data));
                } else {
                    dispatch(
                        getAllCategoriesFailure({
                            error: 'Invalid getAllCategories',
                        })
                    );
                }
            })
            .catch((error) => {
                dispatch(
                    getAllCategoriesFailure({
                        error: 'getAllCategories api fail',
                    })
                );
            });
    };

    function getAllCategoriesRequest() {
        return {
            type: categoryConstants.GET_ALL_CATEGORIES_REQUEST,
        };
    }

    function getAllCategoriesSuccess(data) {
        return {
            type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
            payload: data,
        };
    }

    function getAllCategoriesFailure(error) {
        return {
            type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
            payload: error,
        };
    }
}

// function loadMoreAction(page, limit) {
//     return async (dispatch) => {
//         dispatch(loadMoreRequest());
//         bookApi
//             .getAllCategories(page, limit)
//             .then((response) => {
//                 if (response.type == 'Valid') {
//                     console.log(page);
//                     dispatch(loadMoreSuccess(response.data));
//                 } else {
//                     console.log('invalid');
//                     dispatch(loadMoreEnd());
//                 }
//             })
//             .catch((error) => {
//                 dispatch(loadMoreFailure({ error: 'loadMoreBooks api fail' }));
//             });
//     };

//     function loadMoreRequest() {
//         return {
//             type: bookConstants.LOAD_MORE_REQUEST,
//         };
//     }

//     function loadMoreSuccess(data) {
//         return {
//             type: bookConstants.LOAD_MORE_SUCCESS,
//             payload: data,
//         };
//     }

//     function loadMoreFailure(error) {
//         return {
//             type: bookConstants.LOAD_MORE_FAILURE,
//             payload: error,
//         };
//     }

//     function loadMoreEnd() {
//         return {
//             type: bookConstants.LOAD_MORE_END,
//         };
//     }
// }
