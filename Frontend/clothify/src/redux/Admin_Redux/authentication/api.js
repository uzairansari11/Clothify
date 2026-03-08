import API from '../../../api/axiosInstance';

export const login_admin = async (payload) => {
  try {
    const res = await API.post('/admin/login', payload);
    return res.data.data;
  } catch (error) {
    return error.response?.data?.error || 'Login failed';
  }
};
