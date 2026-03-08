import { cookiesGetter } from '../utils/cookies';

export const getUserAuthHeader = () => {
  const data = cookiesGetter(`${process.env.REACT_APP_USER_TOKEN}`);
  return data?.token ? { Authorization: `token ${data.token}` } : {};
};

export const getAdminAuthHeader = () => {
  const data = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);
  return data?.token ? { Authorization: `token ${data.token}` } : {};
};
