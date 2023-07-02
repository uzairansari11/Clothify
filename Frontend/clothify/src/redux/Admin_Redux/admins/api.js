import axios from 'axios';
import { cookiesGetter } from '../../../utils/coockies';

export const get_Admin_Data_FromApi = async () => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);

  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/admin`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_Admin_Data_FromApi = async (id) => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);

  try {
    const res = await axios.delete(`${process.env.REACT_APP_URL}/admin/${id}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_Admin_Data_FromApi = async (id, payload) => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);

  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_URL}/admin/${id}`,
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
