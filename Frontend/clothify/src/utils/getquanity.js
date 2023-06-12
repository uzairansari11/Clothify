export const getQuantity = (data) => {
    return data.reduce((quantity, ele) => quantity + ele.quantity, 0);
};
