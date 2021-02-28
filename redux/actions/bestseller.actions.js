import { bestsellerConstants } from '../constants/bestseller.constants';
import { bookApi } from '../../api';

export const bestsellerActions = {
    getBestseller,
    // loadMoreBestseller,
};

function getBestseller() {
    const page = 1;
    const limit = 10;

    return async (dispatch) => {
        dispatch(getBestsellerRequest());
        bookApi
            .getBestseller(page, limit)
            .then((response) => {
                if (response.type == 'Valid') {
                    dispatch(getBestsellerSuccess(response.data));
                } else {
                    dispatch(
                        getBestsellerFailure({ error: 'Invalid getBestseller' })
                    );
                }
            })
            .catch((error) => {
                dispatch(
                    getBestsellerFailure({ error: 'getBestseller api fail' })
                );
            });
    };

    function getBestsellerRequest() {
        return {
            type: bestsellerConstants.GET_TEN_BESTSELLER_REQUEST,
        };
    }

    function getBestsellerSuccess(data) {
        return {
            type: bestsellerConstants.GET_TEN_BESTSELLER_SUCCESS,
            payload: data,
        };
    }

    function getBestsellerFailure(error) {
        return {
            type: bestsellerConstants.GET_TEN_BESTSELLER_FAILURE,
            payload: error,
        };
    }
}

// function loadMoreBestseller(page, limit) {
//     return async (dispatch) => {
//         dispatch(loadMoreRequest());
//         bookApi
//             .getAllBooks(page, limit)
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
