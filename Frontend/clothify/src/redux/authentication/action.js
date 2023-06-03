import * as types from "./types";

export const isLoadingHandler = () => {
  return {
    type: types.auth_loading_status,
  };
};

export const isErrorHandler = () => {
  return {
    type: types.auth_error_status,
  };
};

export const loginHandler = (payload) => {
  return {
    type: types.auth_login_success_status,
    payload,
  };
};

export const logoutHandler = () => {
  return {
    type: types.auth_logout_success_status,
  };
};
