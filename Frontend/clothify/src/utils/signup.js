import API from '../api/axiosInstance';

export const signupFunction = async (payload) => {
  try {
    const res = await API.post('/user/register', payload);
    if (res.data.success) {
      return true;
    }
  } catch (error) {
    return error.response?.data?.error || 'Signup failed';
  }
};

export const adminsignupFunction = async (payload) => {
  try {
    const res = await API.post('/admin/register', payload);
    if (res.data.success) {
      return true;
    }
  } catch (error) {
    return error.response?.data?.error || 'Signup failed';
  }
};
