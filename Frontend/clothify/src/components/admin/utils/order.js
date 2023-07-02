export const getOrderQuantity = (orderData) => {
  return orderData?.reduce((accumulator, group) => {
    return (
      accumulator +
      group.orders.reduce((orderSum, order) => {
        return orderSum + order?.items?.length;
      }, 0)
    );
  }, 0);
};
