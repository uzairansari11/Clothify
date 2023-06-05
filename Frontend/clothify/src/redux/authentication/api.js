import axios from "axios";

export const login_user = async (payload) => {
  try {
    const res = await axios.post("http://localhost:4500/user/login", payload);
    return res.data;
  } catch (error) {
    return error.response.data.error;
  }
};
