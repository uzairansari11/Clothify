import API from '../../../api/axiosInstance';

export const login_user = async (payload) => {
  try {
    const res = await API.post('/user/login', payload);
    return res.data.data;
  } catch (error) {
    return error.response?.data?.error || 'Login failed';
  }
};
