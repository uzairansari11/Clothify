import axios from 'axios';

export const get_product_from_api = async (params) => {
  try {
    let response = await axios.get(`${process.env.REACT_APP_URL}/product`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
