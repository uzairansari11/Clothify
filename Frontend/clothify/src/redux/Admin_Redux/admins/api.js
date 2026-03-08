import API from '../../../api/axiosInstance';
import { getAdminAuthHeader } from '../../../api/authHelper';

export const get_Admin_Data_FromApi = async () => {
  try {
    const res = await API.get('/admin', { headers: getAdminAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_Admin_Data_FromApi = async (id) => {
  try {
    const res = await API.delete(`/admin/${id}`, { headers: getAdminAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_Admin_Data_FromApi = async (id, payload) => {
  try {
    const res = await API.patch(`/admin/${id}`, payload, { headers: getAdminAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
