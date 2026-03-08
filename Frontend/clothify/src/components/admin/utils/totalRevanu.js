export const getTotalRevenue = (orderData) => {
  if (!Array.isArray(orderData)) return 0;
  return orderData.reduce((accumulator, group) => {
    return (
      accumulator +
      (group.orders ?? []).reduce((orderSum, order) => {
        return orderSum + (order?.grandTotal ?? 0);
      }, 0)
    );
  }, 0);
};
