import * as types from './types';

const initialState = {
  isLoading: false,
  isError: false,
  orderData: [],
};

export const orderReducer = (state = initialState, action) => {
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
    case types.order_Add_Success_status: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        orderData: [...state.orderData, action.payload],
      };
    }

    case types.order_Delete_Success_status: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        orderData: state.orderData.filter(
          (ele) => ele._id !== action.payload._id,
        ),
      };
    }
    case types.order_Update_Success_status: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        orderData: state.orderData.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele,
        ),
      };
    }

   

    default:
      return state;
  }
};
