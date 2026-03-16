import { getCollection } from "../config/database";


export const getOrders = async () => {
  const orders = getCollection("orders");

  return orders.find({}).limit(20).toArray();
};

export const getOrderById = async (orderId: string) => {
  const orders = getCollection("orders");

  return orders.findOne({ orderId });
};