import * as types from "./type";

const initialState = {
  isLoading: false,
  isError: false,
  wishlistData: [],
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.wishlist_Loading_status: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.wishlist_Error_status: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }

    case types.wishlist_Get_Success_status: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        wishlistData: action.payload,
      };
    }

    case types.wishlist_Add_Success_status: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        wishlistData: [...state.wishlistData, action.payload],
      };
    }
    case types.wishlist_Delete_Success_status: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        wishlistData: state.wishlistData.filter(
          (ele) => ele._id !== action.payload._id
        ),
      };
    }

    default:
      return state;
  }
};
