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

function refreshCartAction() {}
