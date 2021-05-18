import { userConstants } from '../constants';
import { userApi } from '../../api';

export const userActions = {
    loginSuccessAction,
    registerAction,
    registerRefresh,
    logout,
    updateInfo,
};

function loginSuccessAction(user) {
    return {
        type: userConstants.LOGIN_SUCCESS,
        payload: user,
    };
}

function registerAction(name, email, password) {
    return (dispatch) => {
        dispatch(requestRegister({ email }));

        userApi.register(name, email, password).then(
            (result) => {
                if (result.type == 'Invalid') {
                    dispatch(
                        failureRegister({
                            ...result,
                            type: 'Invalid',
                        })
                    );
                    return;
                } else {
                    if (result.status == 'Success') {
                        dispatch(
                            successRegister({
                                ...result.data,
                                type: 'Valid',
                                status: 'Success',
                            })
                        );
                        return;
                    } else if (result.status == 'Fail') {
                        dispatch(
                            failureRegister({
                                ...result,
                                type: 'Valid',
                                status: 'Fail',
                            })
                        );
                        return;
                    }
                }
            },
            (error) => {
                dispatch(failureRegister(error));
                return;
            }
        );
    };

    function requestRegister(user) {
        return {
            type: userConstants.REGISTER_REQUEST,
            payload: user,
        };
    }

    function successRegister(user) {
        return {
            type: userConstants.REGISTER_SUCCESS,
            payload: user,
        };
    }

    function failureRegister(error) {
        return {
            type: userConstants.REGISTER_FAILURE,
            payload: error,
        };
    }
}

function registerRefresh() {
    return {
        type: userConstants.REGISTER_REFRESH,
    };
}

function logout() {
    return {
        type: userConstants.LOGOUT,
    };
}

function updateInfo(user) {
    return {
        type: userConstants.UPDATE_INFO,
        payload: user,
    };
}
