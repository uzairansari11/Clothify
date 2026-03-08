import API from '../../../api/axiosInstance';

export const get_product_from_api = async (params) => {
  try {
    const response = await API.get('/product', { params });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
