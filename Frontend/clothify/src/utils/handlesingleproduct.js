import axios from 'axios';

export const handlesingleproduct = async (id) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/product/${id}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
