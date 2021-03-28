import { postConstants } from '../constants';
import { postApi } from '../../api';

export const postActions = {
    getAllPostsAction,
    // loadMoreAction,
};

function getAllPostsAction(page, limit) {
    return async (dispatch) => {
        dispatch(getAllPostsRequest());
        postApi
            .getPosts(page, limit)
            .then((response) => {
                if (response.type == 'Valid') {
                    dispatch(getAllPostsSuccess(response.data));
                } else {
                    dispatch(
                        getAllPostsFailure({ error: 'Invalid getAllPosts' })
                    );
                }
            })
            .catch((error) => {
                dispatch(getAllPostsFailure({ error: 'getAllPosts api fail' }));
            });
    };

    function getAllPostsRequest() {
        return {
            type: postConstants.GET_ALL_POSTS_REQUEST,
        };
    }

    function getAllPostsSuccess(data) {
        return {
            type: postConstants.GET_ALL_POSTS_SUCCESS,
            payload: data,
        };
    }

    function getAllPostsFailure(error) {
        return {
            type: postConstants.GET_ALL_POSTS_FAILURE,
            payload: error,
        };
    }
}

// function loadMoreAction(page, limit) {
//     return async (dispatch) => {
//         dispatch(loadMoreRequest());
//         postApi
//             .getAllPosts(page, limit)
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
//                 dispatch(loadMoreFailure({ error: 'loadMorePosts api fail' }));
//             });
//     };

//     function loadMoreRequest() {
//         return {
//             type: PostConstants.LOAD_MORE_REQUEST,
//         };
//     }

//     function loadMoreSuccess(data) {
//         return {
//             type: PostConstants.LOAD_MORE_SUCCESS,
//             payload: data,
//         };
//     }

//     function loadMoreFailure(error) {
//         return {
//             type: PostConstants.LOAD_MORE_FAILURE,
//             payload: error,
//         };
//     }

//     function loadMoreEnd() {
//         return {
//             type: PostConstants.LOAD_MORE_END,
//         };
//     }
// }
