import API from '../../../api/axiosInstance';
import { getUserAuthHeader } from '../../../api/authHelper';

export const get_cart_from_api = async () => {
  try {
    const res = await API.get('/cart', { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const add_cart_to_api = async (payload) => {
  try {
    const res = await API.post('/cart', payload, { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_cart_to_api = async (id) => {
  try {
    const res = await API.delete(`/cart/${id}`, { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_all_cart_to_api = async () => {
  try {
    const res = await API.delete('/cart', { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_cart_to_api = async (id, payload) => {
  try {
    const res = await API.patch(`/cart/${id}`, payload, { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
