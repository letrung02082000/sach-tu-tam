import { postConstants } from '../constants';
import { postApi } from '../../api';

export const postActions = {
    getAllPostsAction,
    loadMoreAction,
    refreshingAction,
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

function loadMoreAction(page, limit) {
    return async (dispatch) => {
        dispatch(loadMoreRequest());
        postApi
            .getPosts(page, limit)
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
                dispatch(loadMoreFailure({ error: 'loadMorePosts api fail' }));
            });
    };

    function loadMoreRequest() {
        return {
            type: postConstants.LOAD_MORE_REQUEST,
        };
    }

    function loadMoreSuccess(data) {
        return {
            type: postConstants.LOAD_MORE_SUCCESS,
            payload: data,
        };
    }

    function loadMoreFailure(error) {
        return {
            type: postConstants.LOAD_MORE_FAILURE,
            payload: error,
        };
    }

    function loadMoreEnd() {
        return {
            type: postConstants.LOAD_MORE_END,
        };
    }
}

// function refreshingAction(page, limit) {
//     return async (dispatch) => {
//         dispatch(refreshingRequest());
//         postApi
//             .getPosts(page, limit)
//             .then((res) => {
//                 if (res.type == 'Valid') {
//                     dispatch(refreshingSuccess(res.data));
//                 } else {
//                     dispatch(
//                         refreshingFailure({ error: 'refreshing invalid' })
//                     );
//                 }
//             })
//             .catch((error) =>
//                 dispatch(refreshingFailure({ err: 'refreshing fail' }))
//             );
//     };

//     function refreshingRequest() {
//         return {
//             type: postConstants.REFRESHING_REQUEST,
//         };
//     }

//     function refreshingSuccess(data) {
//         return {
//             type: postConstants.GET_ALL_POSTS_SUCCESS,
//             payload: data,
//         };
//     }

//     function refreshingFailure(error) {
//         return {
//             type: postConstants.REFRESHING_FAILURE,
//             payload: error,
//         };
//     }
// }

function refreshingAction() {
    return {
        type: postConstants.REFRESHING_REQUEST,
    };
}
