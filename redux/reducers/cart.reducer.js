import { cartConstants } from '../constants';

const initialState = [];

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case cartConstants.ADD_TO_CART:
            return [...state, action.payload];
        case cartConstants.REMOVE_FROM_CART: {
            const newState = state.filter(
                (value) =>
                    value._id.toString() !== action.payload._id.toString()
            );
            return newState;
        }
        case cartConstants.REFRESH_CART: {
            return [...action.payload];
        }
        default:
            return state;
    }
}
