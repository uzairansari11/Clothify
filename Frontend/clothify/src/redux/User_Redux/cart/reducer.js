import * as types from './types';

const initialState = {
  isLoading: false,
  isError: false,
  cartData: [],
};

export const cartReducer = (state = initialState, action) => {
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
      const updatedCartData = [...state.cartData];
      const index = updatedCartData.findIndex(
        (ele) =>
          ele.productId == action.payload.productId &&
          ele.size == action.payload.size,
      );

      if (index !== -1) {
        updatedCartData[index] = action.payload;
      } else {
        updatedCartData.push(action.payload);
      }

      return {
        ...state,
        isLoading: false,
        isError: false,
        cartData: updatedCartData,
      };
    }

    case types.cart_Delete_Success_status: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        cartData: state.cartData.filter(
          (ele) => ele._id !== action.payload._id,
        ),
      };
    }
    case types.cart_Update_Success_status: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        cartData: state.cartData.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele,
        ),
      };
    }
    case types.cart_Delete_All_Success_status: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        cartData: action.payload,
      };
    }
    default:
      return state;
  }
};
