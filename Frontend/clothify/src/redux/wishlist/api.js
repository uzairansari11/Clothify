import axios from "axios";
import { cookiesGetter } from "../../utils/coockies";

export const get_wishlist_from_api = async () => {
  const { token } = cookiesGetter();
  try {
    const res = await axios.get("http://localhost:4500/wishlist", {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const add_wishlist_to_api = async (payload) => {
  const { token } = cookiesGetter();
  try {
    const res = await axios.post("http://localhost:4500/wishlist", payload, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_wishlist_to_api = async (id) => {
  const { token } = cookiesGetter();
  try {
    const res = await axios.delete(`http://localhost:4500/wishlist/${id}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    console.log(res.data,"from delete")
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
