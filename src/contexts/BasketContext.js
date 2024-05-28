import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify/datastore";
import { BasketDish, Basket, Dish } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [restaurant, setRestaurant] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketDish, setBasketDish] = useState([]);
  const [priceTotal, setPriceTotal] = useState(0);

  const fetchDishPrice = async (dishId) => {
    let dish = await DataStore.query(Dish, dishId);
    return dish?.price;
  };

  const calculateTotalPrice = async () => {
    const price = basketDish.reduce(async (sumPromise, currBasketDish) => {
      const dishPrice = await fetchDishPrice(currBasketDish.dishID);
      sum = await sumPromise;
      return sum + dishPrice * currBasketDish.quantity;
    }, restaurant?.deliveryFee);
    return price;
  };

  useEffect(() => {
    const fetchAndSetTotalPrice = async () => {
      try {
        const calculatedTotalPrice = await calculateTotalPrice();
        setPriceTotal(calculatedTotalPrice);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    };
    fetchAndSetTotalPrice();
  }, [basketDish, restaurant]);

  useEffect(() => {
    if (!dbUser || !restaurant) return;
    try {
      DataStore.query(Basket, (b) =>
        b.and((c) => [c.restaurantID.eq(restaurant.id), c.userID.eq(dbUser.id)])
      ).then((baskets) => setBasket(baskets[0]));
    } catch (e) {
      console.log("Error querying restaurant and basket: ", e);
    }
  }, [restaurant]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketDish, (bd) => bd.basketID.eq(basket.id)).then(
        setBasketDish
      );
    }
  }, [basket]);

  const createNewBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, restaurantID: restaurant.id })
    );
    setBasket(newBasket);
  };

  const addDishToBasket = async (dish, quantity) => {
    //get existing basket or create new one
    let theBasket = basket ? basket : await createNewBasket();

    // create basketDish item and save it to datastore
    let newDish = await DataStore.save(
      new BasketDish({
        quantity: quantity,
        dishID: dish.id,
        basketID: theBasket.id,
      })
    );
    setBasketDish([...basketDish, newDish]);
  };

  return (
    <BasketContext.Provider
      value={{
        addDishToBasket,
        restaurant,
        setRestaurant,
        basket,
        basketDish,
        priceTotal,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
