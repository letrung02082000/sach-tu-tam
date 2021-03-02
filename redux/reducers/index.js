import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { registerReducer } from './register.reducer';
import { bookReducer } from './book.reducer';
import { bestsellerReducer } from './bestseller.reducer';
import { cartReducer } from './cart.reducer';

const rootReducer = combineReducers({
    authReducer,
    registerReducer,
    bookReducer,
    bestsellerReducer,
    cartReducer,
});

export default rootReducer;
