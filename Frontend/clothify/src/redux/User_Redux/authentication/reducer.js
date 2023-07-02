import { cookiesGetter } from '../../../utils/coockies';
import * as types from './types';
const userDetailsinCookies = cookiesGetter(
  `${process.env.REACT_APP_USER_TOKEN}`,
);
const initialState = {
  userDetails: userDetailsinCookies || null,
  isLoading: false,
  isError: false,
  isAuth: userDetailsinCookies ? true : false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.auth_loading_status: {
      return { ...state, isLoading: true };
    }

    case types.auth_error_status: {
      return { ...state, isError: true, isLoading: false };
    }
    case types.auth_login_success_status: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        userDetails: payload,
        isAuth: true,
      };
    }

    case types.auth_logout_success_status: {
      return {
        ...state,
        isError: false,
        isLoading: false,
        userDetails: null,
        isAuth: false,
      };
    }
    default:
      return state;
  }
};
