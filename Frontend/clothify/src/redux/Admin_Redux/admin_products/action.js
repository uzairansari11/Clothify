import { add_product_from_api, delete_product_from_api, get_product_from_api, update_product_from_api } from "./api";
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

export const productDeleteHandler = (payload) => {
    return {
        type: types.product_Delete_Success_status,
        payload,
    };
};

export const productUpdateHandler = (payload) => {
    return {
        type: types.product_Update_Success_status,
        payload,
    };
};

export const productAddHandler = (payload) => {
    return {
        type: types.product_Add_Success_status,
        payload,
    };
};

/* -------------------------------------------------------------------------- */
export const handleProductData = (params) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const payload = await get_product_from_api(params);
        dispatch(productHandler(payload));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};

export const handleDeleteProductData = (id) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const payload = await delete_product_from_api(id);
        dispatch(productDeleteHandler(payload));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};

export const handleUpdateProductData = (id, data) => async (dispatch) => {
    try {
        const payload = await update_product_from_api(id, data)
        dispatch(productUpdateHandler(payload))
    } catch (error) {
        dispatch(isErrorHandler());
    }
};


export const handleAddProductData = (data) => async (dispatch) => {
    try {
        const payload = await add_product_from_api(data)

        dispatch(productAddHandler(payload))
    } catch (error) {
        dispatch(isErrorHandler());
    }
};
