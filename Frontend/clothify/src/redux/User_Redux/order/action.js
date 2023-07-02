import {
  add_order_to_api,
  delete_order_to_api,
  get_order_from_api,
  update_order_to_api,
} from './api';
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

export const orderHandler = (payload) => {
  return {
    type: types.order_Get_Success_status,
    payload,
  };
};

export const orderAddHandler = (payload) => {
  return {
    type: types.order_Add_Success_status,
    payload,
  };
};

export const orderDeleteHandler = (payload) => {
  return {
    type: types.order_Delete_Success_status,
    payload,
  };
};


export const orderUpdateHandler = (payload) => {
  return {
    type: types.order_Update_Success_status,
    payload,
  };
};

export const handleGetOrderData = () => async (dispatch) => {
  dispatch(isLoadingHandler());
  try {
    const payload = await get_order_from_api();
    dispatch(orderHandler(payload));
  } catch (error) {
    dispatch(isErrorHandler());
  }
};

export const handleAddToOrderData = (data) => async (dispatch) => {
  dispatch(isLoadingHandler());
  try {
    const payload = await add_order_to_api(data);
    dispatch(orderAddHandler(payload));
    return true;
  } catch (error) {
    dispatch(isErrorHandler());
    return false;
  }
};

export const handleDeleteToOrderData = (id) => async (dispatch) => {
  dispatch(isLoadingHandler());

  try {
    const payload = await delete_order_to_api(id);
    dispatch(orderDeleteHandler(payload));
  } catch (error) {
    dispatch(isErrorHandler());
  }
};



export const handleUpdateToOrderData = (id, data) => async (dispatch) => {
  dispatch(isLoadingHandler());
  try {
    const payload = await update_order_to_api(id, data);
    dispatch(orderUpdateHandler(payload));
  } catch (error) {
    dispatch(isErrorHandler());
  }
};
