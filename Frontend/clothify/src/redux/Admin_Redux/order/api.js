import API from '../../../api/axiosInstance';
import { getAdminAuthHeader } from '../../../api/authHelper';

export const get_order_from_api = async () => {
  try {
    const res = await API.get('/order/admin', { headers: getAdminAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
