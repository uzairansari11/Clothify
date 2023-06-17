import * as types from "./types";
const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  totalCount: 0,
};

export const productReducer = (state = initialState, { type, payload }) => {
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
    default:
      return state;
  }
};
