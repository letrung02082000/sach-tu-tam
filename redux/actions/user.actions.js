import { userConstants } from '../constants';
import { userApi } from '../../api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const userActions = {
    loginAction,
    registerAction,
};

function loginAction(email, password) {
    return (dispatch) => {
        dispatch(requestLogin({ email }));

        userApi.login(email, password).then(
            (result) => {
                if (result.type == 'Invalid') {
                    console.log(result);
                    dispatch(failureLogin({ error: 'login invalid' }));
                    return;
                } else {
                    if (result.status == 'Failure') {
                        console.log(result);
                        dispatch(failureLogin({ error: 'login failure' }));
                        return;
                    } else if (result.status == 'Success') {
                        console.log(result);
                        dispatch(successLogin(result.data));
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
                    dispatch(failureRegister('Invalid register'));
                    return;
                } else {
                    if (result.status == 'Success') {
                        dispatch(successRegister(result.data));
                        return;
                    } else if (result.status == 'Failure') {
                        dispatch(failureRegister('Register error'));
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
