import { cookiesGetter } from '../../../utils/coockies';
import * as types from './types';
const adminDetailsinCookies = cookiesGetter(
  `${process.env.REACT_APP_ADMIN_TOKEN}`,
);
const initialState = {
  adminDetails: adminDetailsinCookies || null,
  isLoading: false,
  isError: false,
  isAuth: adminDetailsinCookies ? true : false,
};

export const adminAuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.admin_auth_loading_status: {
      return { ...state, isLoading: true };
    }

    case types.admin_auth_error_status: {
      return { ...state, isError: true, isLoading: false };
    }
    case types.admin_auth_login_success_status: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        adminDetails: payload,
        isAuth: true,
      };
    }

    case types.admin_auth_logout_success_status: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        adminDetails: null,
        isAuth: false,
      };
    }
    default:
      return state;
  }
};
