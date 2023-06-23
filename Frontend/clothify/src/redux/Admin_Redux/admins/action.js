import {   delete_Admin_Data_FromApi, get_Admin_Data_FromApi, update_Admin_Data_FromApi,  } from "./api";
import * as types from "./types";

export const isLoadingHandler = () => {
    return {
        type: types.admin_Loading_status,
    };
};

export const isErrorHandler = () => {
    return {
        type: types.admin_Error_status,
    };
};

export const adminHandler = (payload) => {
    return {
        type: types.admin_Get_Success_status,
        payload,
    };
};


export const deleteAdminHanlder = (payload) => {
    return {
        type: types.admin_Delete_Success_status,
        payload,
    }
}

export const updateAdminHanlder = (payload) => {
    return {
        type: types.admin_Update_Success_status,
        payload,
    }
}

export const handleGetAdmin = () => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const data = await get_Admin_Data_FromApi();
        dispatch(adminHandler(data));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};

export const handleDeleteAdmin = (id) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const data = await delete_Admin_Data_FromApi(id);
        dispatch(deleteAdminHanlder(data));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};


export const handleUpdateAdmin = (id, payload) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const data = await update_Admin_Data_FromApi(id, payload)
        dispatch(updateAdminHanlder(data))
    } catch (error) {
        dispatch(isErrorHandler());
    }
}