
import { add_wishlist_to_api, delete_wishlist_to_api, get_wishlist_from_api } from './api';
import * as types from "./type"
export const isLoadingHandler = () => {
    return {
        type: types.wishlist_Loading_status
    };
};
export const isErrorHandler = () => {
    return {
        type: types.wishlist_Error_status,
    };
};

export const wishlistHandler = (payload) => {
    return {
        type: types.wishlist_Get_Success_status,
        payload,
    };
};

export const wishlistAddHandler = (payload) => {
    return {
        type: types.wishlist_Add_Success_status,
        payload,
    };
};

export const wishlistDeleteHandler = (payload) => {
    return {
        type: types.wishlist_Delete_Success_status,
        payload,
    };
};


export const handleWishlistCartData = () => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const payload = await get_wishlist_from_api();
        dispatch(wishlistHandler(payload));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};


export const handleAddToWishlistData = (data) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const payload = await add_wishlist_to_api(data);
        dispatch(wishlistAddHandler(payload));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};



export const handleDeleteToWishlistData = (data) => async (dispatch) => {
    dispatch(isLoadingHandler());
    try {
        const payload = await delete_wishlist_to_api(data);
        dispatch(wishlistDeleteHandler(payload));
    } catch (error) {
        dispatch(isErrorHandler());
    }
};









