import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { registerReducer } from './register.reducer';
import { bookReducer } from './book.reducer';

const rootReducer = combineReducers({
    authReducer,
    registerReducer,
    bookReducer,
});

export default rootReducer;
