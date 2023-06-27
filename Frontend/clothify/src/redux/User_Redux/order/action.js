
import { add_order_to_api, delete_order_to_api, get_order_from_api, update_order_to_api } from './api';
import * as types from "./types";
export const isLoadingHandler = () => {
    return {
        type: types.order_Loading_status
    };
};
export const isErrorHandler = () => {
    return {
        type: types.order_Error_status
    };
};

export const cartHandler = (payload) => {
    return {
        type: types.order_Get_Success_status,
        payload,
    };
};

export const cartAddHandler = (payload) => {
    return {
        type: types.order_Add_Success_status,
        payload,
    };
};

export const cartDeleteHandler = (payload) => {
    return {
        type: types.order_Delete_Success_status,
        payload,
    };
};

export const cartUpdateHandler = (payload) => {
    return {
        type: types.order_Update_Success_status,
        payload,
    };
};

export const handleGetCartData = () => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const payload = await get_order_from_api();
        dispatch(cartHandler(payload));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};

export const handleAddToCartData = (data) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const payload = await add_order_to_api(data);
        dispatch(cartAddHandler(payload));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};

export const handleDeleteToCartData = (id) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const payload = await delete_order_to_api(id);
        console.log(payload);
        dispatch(cartDeleteHandler(payload));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};

export const handleUpdateToCartData = (id, data) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const payload = await update_order_to_api(id, data);
        dispatch(cartUpdateHandler(payload));
        console.log(payload, "from upppp")
    } catch (error) {
        dispatch(isErrorHandler());
    }
};
