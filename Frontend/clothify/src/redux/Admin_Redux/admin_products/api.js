import axios from "axios";

export const get_product_from_api = async (params) => {
    try {
        let response = await axios.get(`http://localhost:4500/product`, { params });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const delete_product_from_api = async (id) => {
    try {
        let response = await axios.delete(`http://localhost:4500/product/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const update_product_from_api = async (id, payload) => {
    try {
        let response = await axios.patch(
            `http://localhost:4500/product/${id}`,
            payload
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const add_product_from_api = async (payload) => {

    try {
        let response = await axios.post(
            `http://localhost:4500/product`,
            payload
        );
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};