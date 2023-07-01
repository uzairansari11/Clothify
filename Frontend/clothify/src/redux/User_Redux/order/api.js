import axios from "axios";
import { cookiesGetter } from '../../../utils/coockies';


export const get_order_from_api = async () => {
    const { token } = cookiesGetter("uzair_app_token");
    try {
        const res = await axios.get("http://localhost:4500/order", {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const add_order_to_api = async (payload) => {
    const { token } = cookiesGetter("uzair_app_token");
    try {
        const res = await axios.post("http://localhost:4500/order", payload, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        console.log(res.data,"from add api order")
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const delete_order_to_api = async (id) => {
    const { token } = cookiesGetter("uzair_app_token");
    try {
        const res = await axios.delete(`http://localhost:4500/order/${id}`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const update_order_to_api = async (id, payload) => {
    const { token } = cookiesGetter("uzair_app_token");
    try {
        const res = await axios.patch(`http://localhost:4500/order/${id}`, payload, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
