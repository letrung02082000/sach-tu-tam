import { eventConstants } from '../constants';
import { eventApi } from '../../api';

export const eventActions = {
    getAllEventsAction,
    loadMoreAction,
    refreshingAction,
};

function getAllEventsAction(page, limit) {
    return async (dispatch) => {
        dispatch(getAllEventsRequest());
        eventApi
            .getEvents(page, limit)
            .then((response) => {
                if (response.type == 'Valid') {
                    dispatch(getAllEventsSuccess(response.data));
                } else {
                    dispatch(
                        getAllEventsFailure({ error: 'Invalid getAllEvents' })
                    );
                }
            })
            .catch((error) => {
                dispatch(
                    getAllEventsFailure({ error: 'getAllEvents api fail' })
                );
            });
    };

    function getAllEventsRequest() {
        return {
            type: eventConstants.GET_ALL_EVENTS_REQUEST,
        };
    }

    function getAllEventsSuccess(data) {
        return {
            type: eventConstants.GET_ALL_EVENTS_SUCCESS,
            payload: data,
        };
    }

    function getAllEventsFailure(error) {
        return {
            type: eventConstants.GET_ALL_EVENTS_FAILURE,
            payload: error,
        };
    }
}

function loadMoreAction(page, limit) {
    return async (dispatch) => {
        dispatch(loadMoreRequest());
        eventApi
            .getEvents(page, limit)
            .then((response) => {
                if (response.type == 'Valid') {
                    console.log(response.data);
                    dispatch(loadMoreSuccess(response.data));
                } else {
                    console.log('Invalid');
                    dispatch(loadMoreEnd());
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch(loadMoreFailure({ error: 'loadMoreEvents api fail' }));
            });
    };

    function loadMoreRequest() {
        return {
            type: eventConstants.LOAD_MORE_EVENTS_REQUEST,
        };
    }

    function loadMoreSuccess(data) {
        return {
            type: eventConstants.LOAD_MORE_EVENTS_SUCCESS,
            payload: data,
        };
    }

    function loadMoreFailure(error) {
        return {
            type: eventConstants.LOAD_MORE_EVENTS_FAILURE,
            payload: error,
        };
    }

    function loadMoreEnd() {
        return {
            type: eventConstants.LOAD_MORE_EVENTS_END,
        };
    }
}

function refreshingAction() {
    return {
        type: eventConstants.REFRESHING_EVENTS_REQUEST,
    };
}
