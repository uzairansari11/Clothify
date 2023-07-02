import {
  add_cart_to_api,
  delete_all_cart_to_api,
  delete_cart_to_api,
  get_cart_from_api,
  update_cart_to_api,
} from './api';
import * as types from './types';
export const isLoadingHandler = () => {
  return {
    type: types.cart_Loading_status,
  };
};
export const isErrorHandler = () => {
  return {
    type: types.cart_Error_status,
  };
};

export const cartHandler = (payload) => {
  return {
    type: types.cart_Get_Success_status,
    payload,
  };
};

export const cartAddHandler = (payload) => {
  return {
    type: types.cart_Add_Success_status,
    payload,
  };
};

export const cartDeleteHandler = (payload) => {
  return {
    type: types.cart_Delete_Success_status,
    payload,
  };
};

export const cartDeleteAllHandler = (payload) => {
  return {
    type: types.cart_Delete_All_Success_status,
    payload,
  };
};

export const cartUpdateHandler = (payload) => {
  return {
    type: types.cart_Update_Success_status,
    payload,
  };
};

export const handleGetCartData = () => async (dispatch) => {
  dispatch(isLoadingHandler());
  try {
    const payload = await get_cart_from_api();
    dispatch(cartHandler(payload));
  } catch (error) {
    dispatch(isErrorHandler());
  }
};

export const handleAddToCartData = (data) => async (dispatch) => {
  dispatch(isLoadingHandler());
  try {
    const payload = await add_cart_to_api(data);
    dispatch(cartAddHandler(payload));
  } catch (error) {
    dispatch(isErrorHandler());
  }
};

export const handleDeleteToCartData = (id) => async (dispatch) => {
  dispatch(isLoadingHandler());
  try {
    const payload = await delete_cart_to_api(id);
    dispatch(cartDeleteHandler(payload));
  } catch (error) {
    dispatch(isErrorHandler());
  }
};

export const handleDeleteAllToCartData = () => async (dispatch) => {
  dispatch(isLoadingHandler());

  try {
    const payload = await delete_all_cart_to_api();
    dispatch(cartDeleteAllHandler(payload));
  } catch (error) {
    dispatch(isErrorHandler());
  }
};
export const handleUpdateToCartData = (id, data) => async (dispatch) => {
  dispatch(isLoadingHandler());
  try {
    const payload = await update_cart_to_api(id, data);
    dispatch(cartUpdateHandler(payload));
  } catch (error) {
    dispatch(isErrorHandler());
  }
};
