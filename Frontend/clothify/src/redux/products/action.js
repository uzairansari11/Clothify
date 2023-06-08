import { get_product_from_api } from "./api";
import * as types from "./types";
export const isLoadingHandler = () => {
  return {
    type: types.product_Loading_status,
  };
};

export const isErrorHandler = () => {
  return {
    type: types.product_Error_status,
  };
};

export const productHandler = (payload) => {
  return {
    type: types.product_Success_status,
    payload,
  };
};

export const handleProductData = (params) => async (dispatch) => {
  dispatch(isLoadingHandler());
  try {
    const payload = await get_product_from_api(params);
    dispatch(productHandler(payload));
  } catch (error) {
    dispatch(isErrorHandler());
  }
};
