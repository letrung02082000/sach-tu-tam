import { store } from '../redux/store';

function authHeader() {
    const user = store.getState().authReducer;

    return {
        headers: {
            id: user._id,
            token: user.token,
        },
    };
}

export default authHeader;
