import { cartConstants } from '../constants';

const initialState = {
    quantity: 0,
    data: [],
};

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case cartConstants.ADD_TO_CART:
            const newBook = action.payload;
            newBook.orderQuantity = 1;
            const newData = [...state.data, newBook];

            return {
                data: newData,
                quantity: state.quantity + 1,
            };

        case cartConstants.REMOVE_FROM_CART: {
            const newState = state.data.filter(
                (value) =>
                    value._id.toString() !== action.payload._id.toString()
            );

            return {
                data: newState,
                quantity: newState.length,
            };
        }

        case cartConstants.REFRESH_CART: {
            return {
                data: [...action.payload],
                quantity: action.payload.length,
            };
        }

        case cartConstants.UPDATE_CART: {
            let newData = state.data.map((child) => {
                if (child._id == action.payload.bookId) {
                    child.orderQuantity = action.payload.quantity;
                }
                return child;
            });

            return {
                data: newData,
                quantity: newData.length,
            };
        }

        case cartConstants.CLEAR_CART: {
            return {
                data: [],
                quantity: 0,
            };
        }

        default:
            return state;
    }
}
