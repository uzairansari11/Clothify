import axios from 'axios';

export const login_admin = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/admin/login`,
      payload,
    );
    return res.data;
  } catch (error) {
    return error.response.data.error;
  }
};
