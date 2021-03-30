import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { registerReducer } from './register.reducer';
import { bookReducer } from './book.reducer';
import { bestsellerReducer } from './bestseller.reducer';
import { cartReducer } from './cart.reducer';
import { favoriteReducer } from './favorite.reducer';
import { categoryReducer } from './category.reducer';
import { postReducer } from './post.reducer';
import { eventReducer } from './event.reducer';

const rootReducer = combineReducers({
    authReducer,
    registerReducer,
    bookReducer,
    bestsellerReducer,
    cartReducer,
    favoriteReducer,
    categoryReducer,
    postReducer,
    eventReducer,
});

export default rootReducer;
