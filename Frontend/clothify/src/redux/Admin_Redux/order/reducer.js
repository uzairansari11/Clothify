import * as types from './types';

const initialState = {
  isLoading: false,
  isError: false,
  orderData: [],
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
        orderData: action.payload,
      };
    }

    default:
      return state;
  }
};
