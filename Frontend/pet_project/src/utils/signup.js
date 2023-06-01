import axios from "axios";

export const signupFunction = async (payload) => {
  try {
    const res = await axios.post(
      "http://localhost:4500/user/register",
      payload
    );

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
