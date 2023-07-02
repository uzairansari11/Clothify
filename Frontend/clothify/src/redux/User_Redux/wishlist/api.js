import axios from 'axios';
import { cookiesGetter } from '../../../utils/coockies';
export const get_wishlist_from_api = async () => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_USER_TOKEN}`);
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/wishlist`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const add_wishlist_to_api = async (payload) => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_USER_TOKEN}`);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/wishlist`,
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

export const delete_wishlist_to_api = async (id) => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_USER_TOKEN}`);
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_URL}/wishlist/${id}`,
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
