import { bookApi } from '../../api';
import { cartConstants } from '../constants';

export const cartActions = {
    addToCartAction,
    removeFromCartAction,
    refreshCartAction,
    updateCartAction,
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

function updateCartAction(bookId, quantity) {
    return {
        type: cartConstants.UPDATE_CART,
        payload: { bookId, quantity },
    };
}

function refreshCartAction(cart) {
    return async (dispatch) => {
        let newCart = [];
        for (let book of cart) {
            const res = await bookApi.getBookById(book._id);
            if (res.type == 'Valid') {
                res.data.orderQuantity = book.orderQuantity;
                newCart.push(res.data);
            }
        }

        dispatch({
            type: cartConstants.REFRESH_CART,
            payload: newCart,
        });
    };
}
