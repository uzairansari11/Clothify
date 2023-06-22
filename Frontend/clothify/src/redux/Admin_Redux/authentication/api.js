import axios from "axios";

export const login_admin = async (payload) => {
    try {
        const res = await axios.post("http://localhost:4500/admin/login", payload);
        return res.data;
    } catch (error) {
        return error.response.data.error;
    }
};
