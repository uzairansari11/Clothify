import axios from 'axios';
import { cookiesGetter } from '../../../utils/cookies';


export const get_UserData_FromApi = async () => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);

  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/user`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_UserData_FromApi = async (id) => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);

  try {
    const res = await axios.delete(`${process.env.REACT_APP_URL}/user/${id}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_UserData_FromApi = async (id, payload) => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_URL}/user/${id}`,
      payload,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
