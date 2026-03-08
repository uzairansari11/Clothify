import API from '../../../api/axiosInstance';
import { getAdminAuthHeader } from '../../../api/authHelper';

export const get_product_from_api = async (params) => {
  try {
    const response = await API.get('/product', { params });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_product_from_api = async (id) => {
  try {
    const res = await API.delete(`/product/${id}`, { headers: getAdminAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_product_from_api = async (id, payload) => {
  try {
    const res = await API.patch(`/product/${id}`, payload, { headers: getAdminAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const add_product_from_api = async (payload) => {
  try {
    const res = await API.post('/product', payload, { headers: getAdminAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
