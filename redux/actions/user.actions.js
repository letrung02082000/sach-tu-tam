import { userConstants } from '../constants';
import { userApi } from '../../api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const userActions = {
    loginAction,
    registerAction,
    registerRefresh,
    logout,
    updateInfo,
};

function loginAction(email, password) {
    return async (dispatch) => {
        dispatch(requestLogin({ email }));

        userApi.login(email, password).then(
            async (result) => {
                if (result.type == 'Invalid') {
                    dispatch(failureLogin({ error: 'login invalid' }));
                    return;
                } else {
                    if (result.status == 'Fail') {
                        dispatch(failureLogin({ error: 'login failure' }));
                        return;
                    } else if (result.status == 'Success') {
                        try {
                            await AsyncStorage.setItem(
                                'user',
                                JSON.stringify(result.data)
                            );

                            dispatch(successLogin(result.data));
                        } catch (error) {
                            dispatch(failureLogin({ error }));
                        }
                        return;
                    }
                }
            },
            (error) => {
                console.log(error);
                dispatch(failureLogin({ error: 'login fail http' }));
                return;
            }
        );
    };

    function requestLogin(user) {
        return {
            type: userConstants.LOGIN_REQUEST,
            payload: user,
        };
    }

    function successLogin(user) {
        return {
            type: userConstants.LOGIN_SUCCESS,
            payload: user,
        };
    }

    function failureLogin(error) {
        return {
            type: userConstants.LOGIN_FAILURE,
            payload: error,
        };
    }
}

function registerAction(email, password) {
    return (dispatch) => {
        dispatch(requestRegister({ email }));

        userApi.register(email, password).then(
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
