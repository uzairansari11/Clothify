import * as types from "./types";
const initialState = {
    isLoading: false,
    isError: false,
    users: [],
    totalCount: 0,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.user_Loading_status: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case types.user_Error_status: {
            return {
                ...state,
                isError: true,
            };
        }

        case types.user_Get_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                users: action.payload.users || action.payload,
                totalCount: action.payload.totalCount ?? (action.payload.users || action.payload).length,
            };
        }

        case types.user_Delete_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                users: [...state.users.filter((ele) => ele._id !== action.payload._id)],
            };
        }

        case types.user_Update_Success_status: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                users: [
                    ...state.users.map((ele) =>
                        ele._id === action.payload._id ? ele = action.payload : ele
                    ),
                ],
            };
        }
        default:
            return state;
    }
};
