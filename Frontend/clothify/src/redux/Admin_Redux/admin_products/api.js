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

export const delete_product_from_api = async (id) => {
  try {
    let response = await axios.delete(
      `${process.env.REACT_APP_URL}/product/${id}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_product_from_api = async (id, payload) => {
  try {
    let response = await axios.patch(
      `${process.env.REACT_APP_URL}/product/${id}`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const add_product_from_api = async (payload) => {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/product`,
      payload,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
