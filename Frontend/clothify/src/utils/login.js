import Cookies from "js-cookie";
import axios from "axios";

export const loginFunction = async (payload) => {
  try {
    const res = await axios.post("http://localhost:4500/user/login", payload);

    if (res.status === 200) {
      const userData = res.data;
      Cookies.set("uzair_app_token", JSON.stringify(userData), { expires: 7 });
      return true;
    }
  } catch (error) {
    console.log(error.response)
    return error.response.data.error;
  }
};
