import { combineReducers } from 'redux';
import signInReducer from './user.reducer';

const appReducers = combineReducers({ signInReducer });

const rootReducer = (state, action) => {
    return appReducers(state, action);
};

export default rootReducer;
