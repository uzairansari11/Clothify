import { get_order_from_api } from './api';
import * as types from './types';
export const isLoadingHandler = () => {
  return {
    type: types.order_Loading_status,
  };
};
export const isErrorHandler = () => {
  return {
    type: types.order_Error_status,
  };
};

export const getOrderHandler = (payload) => {
  return {
    type: types.order_Get_Success_status,
    payload,
  };
};

export const handleGetOrderData = (params = {}) => async (dispatch) => {
  dispatch(isLoadingHandler());
  try {
    const payload = await get_order_from_api(params);
    dispatch(getOrderHandler(payload));
  } catch (error) {
    dispatch(isErrorHandler());
  }
};
