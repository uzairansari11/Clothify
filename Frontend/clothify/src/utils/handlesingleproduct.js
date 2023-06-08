import axios from "axios";

export const handlesingleproduct = async (id) => {
  try {
    const res = await axios.get(`http://localhost:4500/product/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
