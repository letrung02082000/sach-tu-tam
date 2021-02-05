import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { registerReducer } from './register.reducer';

const rootReducer = combineReducers({ authReducer, registerReducer });

export default rootReducer;
