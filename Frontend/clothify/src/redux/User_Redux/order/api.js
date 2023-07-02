import axios from 'axios';
import { cookiesGetter } from '../../../utils/coockies';
const { token } = cookiesGetter('uzair_app_token');

export const get_order_from_api = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/order`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const add_order_to_api = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/order`,
      payload,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_order_to_api = async (id) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_URL}/order/${id}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_order_to_api = async (id, payload) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_URL}/order/${id}`,
      payload,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
