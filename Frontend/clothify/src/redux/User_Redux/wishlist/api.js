import API from '../../../api/axiosInstance';
import { getUserAuthHeader } from '../../../api/authHelper';

export const get_wishlist_from_api = async () => {
  try {
    const res = await API.get('/wishlist', { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const add_wishlist_to_api = async (payload) => {
  try {
    const res = await API.post('/wishlist', payload, { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_wishlist_to_api = async (id) => {
  try {
    const res = await API.delete(`/wishlist/${id}`, { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_wishlist_to_api = async (id, payload) => {
  try {
    const res = await API.patch(`/wishlist/${id}`, payload, { headers: getUserAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
