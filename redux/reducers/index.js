import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { registerReducer } from './register.reducer';
import { bookReducer } from './book.reducer';
import { bestsellerReducer } from './bestseller.reducer';

const rootReducer = combineReducers({
    authReducer,
    registerReducer,
    bookReducer,
    bestsellerReducer,
});

export default rootReducer;
