import axios from 'axios';

export const signupFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/user/register`,
      payload,
    );

    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const adminsignupFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/admin/register`,
      payload,
    );

    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
