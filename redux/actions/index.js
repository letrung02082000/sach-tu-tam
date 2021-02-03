export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export function setLoginState({ username, password }) {
    if (username.toString() === 'test' && password.toString() === 'test') {
        return {
            type: LOGIN_SUCCESS,
            payload: loginData,
        };
    } else {
        return {
            type: LOGIN_ERROR,
        };
    }
}
