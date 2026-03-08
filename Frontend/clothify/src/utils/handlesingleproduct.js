import API from '../api/axiosInstance';

export const handlesingleproduct = async (id) => {
  try {
    const res = await API.get(`/product/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error.message);
  }
};
