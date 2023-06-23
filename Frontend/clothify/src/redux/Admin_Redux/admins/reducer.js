import * as types from "./types";
const initialState = {
    isLoading: false,
    isError: false,
    admins: [],
};

export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.admin_Loading_status: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case types.admin_Error_status: {
            return {
                ...state,
                isError: true,
            };
        }

        case types.admin_Get_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                admins: action.payload,
            };
        }

        case types.admin_Delete_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                admins: [...state.admins.filter((ele) => ele._id !== action.payload._id)],
            };
        }

        case types.admin_Update_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                admins: [
                    ...state.admins.map((ele) =>
                        ele._id === action.payload._id ? ele = action.payload : ele
                    ),
                ],
            };
        }
        default:
            return state;
    }
};
