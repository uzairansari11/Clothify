export const getTotalRevenue = (orderData) => {
  return orderData?.reduce((accumulator, group) => {
    return (
      accumulator +
      group.orders.reduce((orderSum, order) => {
        return orderSum + order.grandTotal;
      }, 0)
    );
  }, 0);
};
