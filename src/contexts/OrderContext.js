import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify/datastore";
import { Order, OrderDish, Basket, Dish } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();
  const { restaurant, priceTotal, basket, basketDish } = useBasketContext();

  const [orders, setOrders] = useState([]);

  const getDish = async (id) => {
    return DataStore.query(Dish, id);
  };

  const createOrder = async () => {
    try {
      //create the order
      const newOrder = await DataStore.save(
        new Order({
          userID: dbUser.id,
          restaurantID: restaurant.id,
          status: "NEW",
          total: priceTotal,
        })
      );
      //add all basketDishes to the order
      await Promise.all(
        basketDish.map(async (currBasketDish) => {
          const dish = await getDish(currBasketDish.basketDishDishId);
          console.log(dish);
          return DataStore.save(
            new OrderDish({
              quantity: currBasketDish.quantity,
              orderID: newOrder.id,
              dishID: dish[0].id,
            })
          );
        })
      );
      //delete the basket
      await DataStore.delete(basket);
      // console.log(orders);
      setOrders([...orders, newOrder]);
    } catch (e) {
      console.log("Error creating order: ", e);
    }
  };

  const getOrderById = async (id) => {
    const order = await DataStore.query(Order, id);
    const orderDishes = await DataStore.query(OrderDish, (od) =>
      od.orderID.eq(order.id)
    );
    return { ...order, dishes: orderDishes };
  };

  useEffect(() => {
    DataStore.query(Order, (o) => o.userID.eq(dbUser.id)).then(setOrders);
  }, []);

  return (
    <OrderContext.Provider value={{ createOrder, orders, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
