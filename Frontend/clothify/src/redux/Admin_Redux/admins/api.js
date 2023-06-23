import axios from "axios";

export const get_Admin_Data_FromApi = async () => {
    try {
        const res = await axios.get("http://localhost:4500/admin");
        console.log("res data", res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const delete_Admin_Data_FromApi = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:4500/admin/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const update_Admin_Data_FromApi = async (id, payload) => {
    try {
        const res = await axios.patch(`http://localhost:4500/admin/${id}`, payload);
        console.log(res, 'from updatw  api')
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};
