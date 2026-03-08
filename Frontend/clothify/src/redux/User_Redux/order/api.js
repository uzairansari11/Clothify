import API from '../../../api/axiosInstance';
import { getUserAuthHeader } from '../../../api/authHelper';

export const get_order_from_api = async () => {
  try {
    const res = await API.get('/order', { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const add_order_to_api = async (payload) => {
  try {
    const res = await API.post('/order', payload, { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_order_to_api = async (id) => {
  try {
    const res = await API.delete(`/order/${id}`, { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_order_to_api = async (id, payload) => {
  try {
    const res = await API.patch(`/order/${id}`, payload, { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
