export const getOrderQuantity = (orderData) => {
  if (!Array.isArray(orderData)) return 0;
  return orderData.reduce((accumulator, group) => {
    return (
      accumulator +
      (group.orders ?? []).reduce((orderSum, order) => {
        return orderSum + (order?.items?.length ?? 0);
      }, 0)
    );
  }, 0);
};
