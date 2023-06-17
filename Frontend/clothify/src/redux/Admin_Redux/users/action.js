import { delete_UserData_FromApi, get_UserData_FromApi, update_UserData_FromApi } from "./api";
import * as types from "./types";

export const isLoadingHandler = () => {
    return {
        type: types.user_Loading_status,
    };
};

export const isErrorHandler = () => {
    return {
        type: types.user_Error_status,
    };
};

export const userHandler = (payload) => {
    return {
        type: types.user_Get_Success_status,
        payload,
    };
};


export const deleteUserHanlder = (payload) => {
    return {
        type: types.user_Delete_Success_status,
        payload,
    }
}

export const updateUserHanlder = (payload) => {
    return {
        type: types.user_Update_Success_status,
        payload,
    }
}

export const handleGetUser = () => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const data = await get_UserData_FromApi();
        dispatch(userHandler(data));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};

export const handleDeleteUser = (id) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const data = await delete_UserData_FromApi(id);
        dispatch(deleteUserHanlder(data));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};


export const handleUpdateUser = (id, payload) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const data = await update_UserData_FromApi(id, payload)
        dispatch(updateUserHanlder(data))
    } catch (error) {
        dispatch(isErrorHandler());
    }
}