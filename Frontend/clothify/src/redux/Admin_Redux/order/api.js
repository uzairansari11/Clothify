import axios from 'axios';
import { cookiesGetter } from '../../../utils/coockies';

export const get_order_from_api = async () => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/order/admin`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
