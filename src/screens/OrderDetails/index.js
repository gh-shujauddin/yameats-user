import { Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import styles from "./styles";
import { useRoute } from "@react-navigation/native";
import { Dish, Restaurant } from "../../models";

import BasketDishItem from "../../components/BasketDishItem";
import { useOrderContext } from "../../contexts/OrderContext";
import { DataStore } from "aws-amplify/dist/esm/datastore";

const OrderDetailsHeader = ({ order }) => {
  const [restaurant, setRestaurant] = useState(null);
  console.log("order", order.restaurantID);
  useEffect(() => {
    DataStore.query(Restaurant, order.restaurantID).then(setRestaurant);
  }, []);

  if (!restaurant) {
    return <ActivityIndicator />;
  }
  console.log('restaurant: ', restaurant);
  return (
    <View>
      <View style={styles.page}>
        {restaurant && (
          <Image source={{ uri: restaurant.image }} style={styles.image} />
        )}
        <View style={styles.container}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>

          <Text style={styles.menuTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};

const OrderDetails = ({id}) => {
  const [order, setOrder] = useState(null);

  const { getOrderById } = useOrderContext();

  // const route = useRoute();
  // const id = route.params?.id;

  useEffect(() => {
    getOrderById(id).then(setOrder);
  }, []);

  if (!order) {
    return <ActivityIndicator size={"large"} color={"black"} />;
  }
  console.log("Order: ", order);
  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
};
export default OrderDetails;
