export const getQuantity = (data) => {
    return data?.length && data?.reduce((quantity, ele) => quantity + ele.quantity, 0);
};
