import { cookiesSetter, removeCookie } from '../../../utils/coockies';
import { login_admin } from './api';
import * as types from './types';

export const isLoadingHandler = () => {
  return {
    type: types.admin_auth_loading_status,
  };
};

export const isErrorHandler = () => {
  return {
    type: types.admin_auth_error_status,
  };
};

export const loginHandler = (payload) => {
  return {
    type: types.admin_auth_login_success_status,
    payload,
  };
};

export const logoutHandler = () => {
  return {
    type: types.admin_auth_logout_success_status,
  };
};

export const handleLoginFunction = (payload) => async (dispatch) => {
  dispatch(isLoadingHandler());
  try {
    let res = await login_admin(payload);
    if (res.token) {
      dispatch(loginHandler(res));
      cookiesSetter(res, `${process.env.REACT_APP_ADMIN_TOKEN}`);
      return true;
    } else {
      dispatch(isErrorHandler());
      return false;
    }
  } catch (error) {
    dispatch(isErrorHandler());
    return false;
  }
};

export const handleLogoutFunction = () => (dispatch) => {
  dispatch(isLoadingHandler());
  setTimeout(() => {
    dispatch(logoutHandler());
    removeCookie(`${process.env.REACT_APP_ADMIN_TOKEN}`);
  }, 1500);
  dispatch(isErrorHandler());
};
