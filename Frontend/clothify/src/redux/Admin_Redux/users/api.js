import API from '../../../api/axiosInstance';
import { getAdminAuthHeader } from '../../../api/authHelper';

export const get_UserData_FromApi = async (params = {}) => {
  try {
    const res = await API.get('/user', { params, headers: getAdminAuthHeader() });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const delete_UserData_FromApi = async (id) => {
  try {
    const res = await API.delete(`/user/${id}`, { headers: getAdminAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_UserData_FromApi = async (id, payload) => {
  try {
    const res = await API.patch(`/user/${id}`, payload, { headers: getAdminAuthHeader() });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
