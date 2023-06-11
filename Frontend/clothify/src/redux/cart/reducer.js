import * as types from "./types";

const initialState = {
    isLoading: false,
    isError: false,
    cartData: [],

};

export const cartReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case types.cart_Loading_status: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case types.cart_Error_status: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        case types.cart_Get_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                cartData: action.payload,
            };
        }

        case types.cart_Add_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                cartData: [...state.cartData, action.payload],
            };
        }
        case types.cart_Delete_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                cartData: state.cartData.filter((ele) => ele._id !== action.payload._id),
            };
        }


        default:
            return state;
    }
};
