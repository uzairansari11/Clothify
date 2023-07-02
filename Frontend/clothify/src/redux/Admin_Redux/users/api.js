import axios from 'axios';

export const get_UserData_FromApi = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URL}/user`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const delete_UserData_FromApi = async (id) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_URL}/user/${id}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const update_UserData_FromApi = async (id, payload) => {
  try {
    const res = await axios.patch(
      `${process.env.REACT_APP_URL}/user/${id}`,
      payload,
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
