import axios from "axios";
import { cookiesGetter } from '../../../utils/coockies';


export const get_cart_from_api = async () => {
  const { token } = cookiesGetter();
  try {
    const res = await axios.get("http://localhost:4500/cart", {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const add_cart_to_api = async (payload) => {
  const { token } = cookiesGetter();
  try {
    const res = await axios.post("http://localhost:4500/cart", payload, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    console.log(res.data,"addddddddd")
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_cart_to_api = async (id) => {
  const { token } = cookiesGetter();
  try {
    const res = await axios.delete(`http://localhost:4500/cart/${id}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_cart_to_api = async (id, payload) => {
  const { token } = cookiesGetter();
  try {
    const res = await axios.patch(`http://localhost:4500/cart/${id}`, payload, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
