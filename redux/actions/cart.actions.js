import { bookApi } from '../../api';
import { cartConstants } from '../constants';

export const cartActions = {
    addToCartAction,
    removeFromCartAction,
    refreshCartAction,
};

function addToCartAction(book) {
    return {
        type: cartConstants.ADD_TO_CART,
        payload: book,
    };
}

function removeFromCartAction(book) {
    return {
        type: cartConstants.REMOVE_FROM_CART,
        payload: book,
    };
}

function refreshCartAction(cart) {
    return async (dispatch) => {
        let newCart = [];
        for (let book of cart) {
            const newBook = await bookApi.getBookById(book._id);
            if (newBook.type == 'Valid') newCart.push(newBook.data);
        }

        dispatch({
            type: cartConstants.REFRESH_CART,
            payload: newCart,
        });
    };
}
