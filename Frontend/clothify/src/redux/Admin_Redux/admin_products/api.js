import axios from "axios";
import { cookiesGetter } from "../../../utils/cookies";

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
  const { token } = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);
  try {
    let response = await axios.delete(
      `${process.env.REACT_APP_URL}/product/${id}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_product_from_api = async (id, payload) => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);
  try {
    let response = await axios.patch(
      `${process.env.REACT_APP_URL}/product/${id}`,
      payload,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const add_product_from_api = async (payload) => {
  const { token } = cookiesGetter(`${process.env.REACT_APP_ADMIN_TOKEN}`);
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/product`,
      payload,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
