import axios from "axios";

export const get_UserData_FromApi = async () => {
    try {
        const res = await axios.get("http://localhost:4500/user");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const delete_UserData_FromApi = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:4500/user/${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};
