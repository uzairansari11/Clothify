import axios from 'axios';

export const login_user = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/user/login`,
      payload,
    );
    return res.data;
  } catch (error) {
    return error.response.data.error;
  }
};
