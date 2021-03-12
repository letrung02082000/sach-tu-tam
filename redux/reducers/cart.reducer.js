import { cartConstants } from '../constants';

const initialState = {
    quantity: 0,
    data: [],
};

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case cartConstants.ADD_TO_CART:
            const newData = [...state.data, action.payload];
            return {
                data: newData,
                quantity: state.quantity + 1,
            };
        case cartConstants.REMOVE_FROM_CART: {
            const newState = state.data.filter(
                (value) =>
                    value._id.toString() !== action.payload._id.toString()
            );
            console.log(state);
            console.log(newState);
            return {
                data: newState,
                quantity: newState.length,
            };
        }
        case cartConstants.REFRESH_CART: {
            console.log(state);
            return {
                data: [...action.payload],
                quantity: action.payload.length,
            };
        }
        default:
            return state;
    }
}
