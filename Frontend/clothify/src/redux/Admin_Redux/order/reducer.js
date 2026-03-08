import * as types from './types';

const initialState = {
  isLoading: false,
  isError: false,
  orderData: [],
  totalCount: 0,
};

export const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.order_Loading_status: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.order_Error_status: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case types.order_Get_Success_status: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        orderData: action.payload.orders || action.payload,
        totalCount: action.payload.totalCount ?? (action.payload.orders || action.payload).length,
      };
    }

    default:
      return state;
  }
};
