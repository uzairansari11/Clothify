import * as types from "./types";
const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    totalCount: 0,
};

export const adminProductReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.product_Loading_status: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case types.product_Error_status: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        }
        case types.product_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                products: payload.data,
                totalCount: payload.totalCount,
            };
        }

        case types.product_Delete_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                products: [...state.products.filter((ele) => ele._id !== payload._id)],
            }
        }

        case types.product_Update_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                products: [...state.products.map((ele) => ele._id === payload._id ? ele = payload : ele)]
            }
        }

        case types.product_Add_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                products: [...state.products, payload]

            }
        }
        default:
            return state;
    }
};
