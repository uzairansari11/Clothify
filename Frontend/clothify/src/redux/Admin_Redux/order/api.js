import axios from 'axios';
import { cookiesGetter } from '../../../utils/coockies';

export const get_order_from_api = async () => {
  const { token } = cookiesGetter('uzair_app_admin_login');
  try {
    const res = await axios.get('http://localhost:4500/order/admin', {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
