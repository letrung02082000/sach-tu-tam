import { cartConstants } from '../constants';

const initialState = [];

export function cartReducer(state = initialState, action) {
    if (action.type === cartConstants.ADD_TO_CART) {
        return [...state, action.payload];
    } else if (action.type === cartConstants.REMOVE_FROM_CART) {
        const newState = state.filter(
            (value) => value._id.toString() !== action.payload._id.toString()
        );
        return newState;
    } else {
        return state;
    }
}
